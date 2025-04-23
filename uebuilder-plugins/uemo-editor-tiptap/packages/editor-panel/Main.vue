<!--
 * @Description: 编辑面板主组件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-23 12:35:44
-->
<template>
    <UeElPopPanel v-model:open="openRef" @onHide="onHide" v-bind="popPanelParams">
        <UeElLinkSettingPanel
            v-if="checkValueType('link', typeRef, valueRef)"
            ref="linkPanel"
            :value="valueRef"
            @update:value="updateValue"
            @cancel="handleCancel"
            @confirm="handleConfirm"
        />
        <component
            v-else
            v-bind="$attrs"
            :is="componentName"
            :value="valueRef"
            @closePopPanel="closePopPanel"
            @update:value="updateValue"
            @preview="preview"
        />
    </UeElPopPanel>
</template>

<script lang="ts" setup generic="T extends keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap">
import type { UeElLinkSettingPanelInstance } from "@stone/uemo-editor-element/packages/link-setting-panel";
import type { UeTiptapEditorPanelBaseProps } from "./index";
import type { ValuesOf } from "@tiptap/core";

import mitt from "@stone/uemo-editor-utils/lib/mitt";

import { usePopPanelParam } from "./utils/mixin-pop-panel";
import FontSizePanel from "./sub-component/FontSizePanel.vue";
import FontFamilyPanel from "./sub-component/FontFamilyPanel.vue";
import TextColorPanel from "./sub-component/TextColorPanel.vue";
import TextAlignPanel from "./sub-component/TextAlignPanel.vue";
import LineHeightPanel from "./sub-component/LineHeightPanel.vue";
import LetterSpacingPanel from "./sub-component/LetterSpacingPanel.vue";

defineOptions({
    name: "UeTiptapEditorPanel",
    components: { FontSizePanel, FontFamilyPanel, TextColorPanel, TextAlignPanel, LineHeightPanel, LetterSpacingPanel },
});

const { t } = useI18n();
const _props = withDefaults(defineProps<UeTiptapEditorPanelBaseProps>(), {});

/**
 * 组件状态
 */
const typeRef = ref<keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap>();
const openRef = ref<boolean>(false);
const valueRef = ref<UE_TIPTAP_EXTENSION.AttrEditorPanelMap[T]>();
const rectRef = ref<UE_TIPTAP_UNIT.PositionRect>();

const linkPanelRef = useTemplateRef<UeElLinkSettingPanelInstance>("linkPanel");

/**
 * 事件总线
 */
const eventBus = mitt<{
    focus: undefined;
    show: undefined;
    close: undefined;
    preview: undefined;
    update: UE_TIPTAP_EXTENSION.AttrEditorPanelMap[T];
}>();

/**
 * 组件映射表
 */
const componentMap: Record<keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap, string> = {
    textDecoration: "UeElTextDecorationSettingPanel",
    link: "UeElLinkSettingPanel",
    fontSize: "FontSizePanel",
    fontFamily: "FontFamilyPanel",
    textColor: "TextColorPanel",
    textAlign: "TextAlignPanel",
    lineHeight: "LineHeightPanel",
    letterSpacing: "LetterSpacingPanel",
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
function preview() {
    eventBus.emit("preview");
}

function checkValueType<T extends keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap>(
    type: T,
    name?: keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap,
    value?: ValuesOf<UE_TIPTAP_EXTENSION.AttrEditorPanelMap>
): value is UE_TIPTAP_EXTENSION.AttrEditorPanelMap[T] {
    return type === name;
}

/**
 * 更新值事件处理
 * @param value - 新的属性值
 */
function updateValue(value: UE_TIPTAP_EXTENSION.AttrEditorPanelMap[T]) {
    // 如果类型为 textDecoration 且没有 svgName 则关闭弹窗
    if (typeRef.value && checkValueType("textDecoration", typeRef.value, value)) {
        if (!value.svgName) {
            openRef.value = false;
        }
    }

    // 触发更新事件
    eventBus.emit("update", value);
}

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
const openAttrEditorPanel: UE_TIPTAP_EXTENSION.openAttrEditorPanel<T> = (type, attr, param) => {
    // 清理之前的事件监听
    cleanupEventListeners();

    // 设置组件状态
    typeRef.value = type;
    valueRef.value = attr;
    openRef.value = true;
    rectRef.value = param.rect;

    // 设置事件监听
    eventBus.on("update", (value) => {
        valueRef.value = value;
        param.setData(value);
    });

    eventBus.on("preview", () => {
        param.preview?.();
    });

    eventBus.on("focus", () => {
        param.focus();
    });

    eventBus.on("close", () => {
        //
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
        openRef.value = false;
    },
});
</script>

<style lang="scss" module>
.editor-panel {
    // 样式定义
}
</style>
