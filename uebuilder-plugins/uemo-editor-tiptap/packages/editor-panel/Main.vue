<!--
 * @Description: 编辑面板主组件
 * @Author: F-Stone
 * @LastEditTime: 2025-06-09 00:21:55
-->
<template>
    <UeElPopPanel v-model:open="openRef" v-bind="popPanelParams" :id="popId" @onHide="onHide">
        <UeElLinkSettingPanel
            v-if="checkValueType('link', typeRef, valueRef)"
            ref="linkPanel"
            :value="valueRef"
            @closePopPanel="openRef = false"
            @update:value="updateLinkValue"
            @cancel="handleCancel"
            @confirm="handleConfirm"
        />
        <component
            v-else
            v-bind="{ ...$attrs, ...injectPropsRef }"
            :is="componentName"
            :value="valueRef"
            @closePopPanel="closePopPanel"
            @update:value="updateValue"
            @fire="triggerCommand"
        />
    </UeElPopPanel>
</template>

<script lang="ts" setup generic="T extends keyof UE_TIPTAP_EXTENSION.EditorPanel['panelAttrsMap']">
import type { UeElLinkSettingPanelInstance } from "@stone/uemo-editor-element/packages/link-setting-panel";
import type { UeTiptapEditorPanelBaseProps } from "./index";
import type { ValuesOf } from "@tiptap/core";

import mitt from "@stone/uemo-editor-utils/lib/mitt";
import TiptapButtonRow from "@stone/uemo-editor-panel/packages/tiptap-button-row/Main.vue";
import TiptapButtonItem from "@stone/uemo-editor-panel/packages/tiptap-button-item/Main.vue";
import TiptapImage from "@stone/uemo-editor-panel/packages/tiptap-image/Main.vue";
import TiptapSvgIcon from "@stone/uemo-editor-panel/packages/tiptap-svg-icon/Main.vue";
import TiptapFrame from "@stone/uemo-editor-panel/packages/tiptap-frame/Main.vue";

import { usePopPanelParam } from "./utils/mixin-pop-panel";
import FontSizePanel from "./sub-component/FontSizePanel.vue";
import FontFamilyPanel from "./sub-component/FontFamilyPanel.vue";
import TextColorPanel from "./sub-component/TextColorPanel.vue";
import TextAlignPanel from "./sub-component/TextAlignPanel.vue";
import LineHeightPanel from "./sub-component/LineHeightPanel.vue";
import LetterSpacingPanel from "./sub-component/LetterSpacingPanel.vue";
import EditorAIPanel from "./sub-component/EditorAIPanel.vue";
import MoreOperPanel from "./sub-component/MoreOperPanel.vue";

type EditorPanelAttrsMap = UE_TIPTAP_EXTENSION.EditorPanel["panelAttrsMap"];

defineOptions({
    name: "UeTiptapEditorPanel",
    components: {
        FontSizePanel,
        FontFamilyPanel,
        TextColorPanel,
        TextAlignPanel,
        LineHeightPanel,
        LetterSpacingPanel,
        MoreOperPanel,
        EditorAIPanel,
        TiptapButtonRow,
        TiptapButtonItem,
        TiptapImage,
        TiptapSvgIcon,
        TiptapFrame,
    },
});

const { t } = useI18n();
const _props = withDefaults(defineProps<UeTiptapEditorPanelBaseProps>(), {});

/**
 * 组件状态
 */
const typeRef = ref<keyof EditorPanelAttrsMap>();
const openRef = ref<boolean>(false);
const valueRef = ref<EditorPanelAttrsMap[T]>();
const injectPropsRef = ref<Record<string, any>>({});
const rectRef = ref<UE_TIPTAP_UNIT.PositionRect>();

const linkPanelRef = useTemplateRef<UeElLinkSettingPanelInstance>("linkPanel");

/**
 * 事件总线
 */
const eventBus = mitt<{
    focus: undefined;
    show: undefined;
    close: undefined;
    fire: { type: string; param?: any };
    update: EditorPanelAttrsMap[T];
}>();

/**
 * 组件映射表
 */
const componentMap: Record<keyof EditorPanelAttrsMap, string> = {
    textDecoration: "UeElTextDecorationSettingPanel",
    link: "UeElLinkSettingPanel",
    fontSize: "FontSizePanel",
    fontFamily: "FontFamilyPanel",
    textColor: "TextColorPanel",
    textAlign: "TextAlignPanel",
    lineHeight: "LineHeightPanel",
    letterSpacing: "LetterSpacingPanel",
    editorAI: "EditorAIPanel",
    buttonRow: "TiptapButtonRow",
    buttonItem: "TiptapButtonItem",
    image: "TiptapImage",
    svgIcon: "TiptapSvgIcon",
    moreOper: "MoreOperPanel",
    frame: "TiptapFrame",
};

/**
 * 计算当前需要渲染的组件名称
 */
const componentName = computed(() => {
    if (!typeRef.value) return "";
    return componentMap[typeRef.value];
});

/**
 * 弹窗参数
 */
const popPanelParams = usePopPanelParam(typeRef, rectRef, {
    checkAllowClose: () => {
        if (typeRef.value === "link") {
            const hasChange = linkPanelRef.value?.checkHasUnsyncedChanges();

            if (hasChange) {
                return t("LINK_SETTING_UNSAVED_TIP");
            } else {
                return true;
            }
        }
        return true;
    },
});

/**
 * 预览事件处理
 */
function triggerCommand(data: { type: string; param?: any }) {
    eventBus.emit("fire", data);
}

function checkValueType<T extends keyof EditorPanelAttrsMap>(
    type: T,
    name?: keyof EditorPanelAttrsMap,
    value?: ValuesOf<EditorPanelAttrsMap>
): value is EditorPanelAttrsMap[T] {
    return type === name;
}

/**
 * 更新值事件处理
 * @param value - 新的属性值
 */
function updateValue(value: EditorPanelAttrsMap[T]) {
    // 如果类型为 textDecoration 且没有 svgName 则关闭弹窗
    if (typeRef.value && checkValueType("textDecoration", typeRef.value, value)) {
        if (!value.svgName) {
            openRef.value = false;
        }
    }

    // 触发更新事件
    eventBus.emit("update", value);
}

const updateLinkValue = updateValue as (value: EditorPanelAttrsMap["link"]) => void;

/**
 * 隐藏事件处理
 */
function onHide() {
    eventBus.emit("close");
}

/**
 * 清理事件监听
 */
function cleanupEventListeners() {
    eventBus.all.clear();
}

/**
 * 打开属性编辑器面板
 */
const popId = ref<string | undefined>();
const openAttrEditorPanel: UE_TIPTAP_EXTENSION.EditorPanel<T>["openEditorPanelHandler"] = (type, attr, param) => {
    popId.value = param.popId;

    // 清理之前的事件监听
    cleanupEventListeners();

    // 设置组件状态
    typeRef.value = type;
    valueRef.value = attr;
    openRef.value = true;
    rectRef.value = param.rect;
    if (param.props) {
        injectPropsRef.value = param.props;
    }
    // 设置事件监听
    eventBus.on("update", (value) => {
        valueRef.value = value;
        param.updateAttrs(value);
    });

    eventBus.on("fire", (data) => {
        param.fire?.(data.type, data.param);
    });

    eventBus.on("focus", () => {
        param.focus?.();
    });

    eventBus.on("close", () => {
        param.close?.();
    });
};

function handleConfirm() {
    openRef.value = false;
}

function handleCancel() {
    openRef.value = false;
}

function closePopPanel() {
    eventBus.emit("focus");
    openRef.value = false;
}

// 组件卸载时清理事件监听
onUnmounted(() => {
    cleanupEventListeners();
});

defineExpose({
    openAttrEditorPanel,
    closeAttrEditorPanel: () => {
        closePopPanel();
    },
});
</script>

<style lang="scss" module>
.editor-panel {
    // 样式定义
}
</style>
