<!--
 * @Description: 编辑面板主组件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 17:01:58
-->
<template>
    <UeElPopPanel v-model:open="openRef" @onHide="onHide" v-bind="popPanelParams">
        <component
            v-bind="$attrs"
            :is="componentName"
            :value="valueRef"
            @update:value="updateValue"
            @preview="preview"
        />
    </UeElPopPanel>
</template>

<script lang="ts" setup generic="T extends keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap">
import type { UeTiptapEditorPanelBaseProps } from "./index";

import mitt from "@stone/uemo-editor-utils/lib/mitt";

import { usePopPanelParam } from "./utils/mixin-pop-panel";

defineOptions({ name: "UeTiptapEditorPanel" });

const _props = withDefaults(defineProps<UeTiptapEditorPanelBaseProps>(), {});

/**
 * 组件状态
 */
const typeRef = ref<keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap>();
const openRef = ref<boolean>(false);
const valueRef = ref<UE_TIPTAP_EXTENSION.AttrEditorPanelMap[T]>({});
const rectRef = ref<UE_TIPTAP_UNIT.PositionRect>();

/**
 * 事件总线
 */
const eventBus = mitt<{
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
const popPanelParams = usePopPanelParam(typeRef, rectRef);

/**
 * 预览事件处理
 */
function preview() {
    eventBus.emit("preview");
}

/**
 * 更新值事件处理
 * @param value - 新的属性值
 */
function updateValue(value: UE_TIPTAP_EXTENSION.AttrEditorPanelMap[T]) {
    if (typeRef.value === "textDecoration" && !value.svgName) {
        openRef.value = false;
    }
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

    eventBus.on("close", () => {
        param.focus();
    });
};

// 组件卸载时清理事件监听
onUnmounted(() => {
    cleanupEventListeners();
});

defineExpose({
    openAttrEditorPanel,
});
</script>

<style lang="scss" module>
.editor-panel {
    // 样式定义
}
</style>
