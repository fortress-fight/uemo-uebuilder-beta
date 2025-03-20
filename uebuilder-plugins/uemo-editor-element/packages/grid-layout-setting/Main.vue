<!--
 * @Description: 网格布局属性控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-20 14:31:40
-->
<template>
    <UeElEditorGroup :class="$style['grid-layout-setting']" ref="rootComponent">
        <PreviewBox
            :data="valueRef"
            :mode="previewBoxMode"
            :z-index="zIndexData"
            @change="handleChange"
            @changeZIndex="handleChangeZIndex"
            @swap="handleSwap"
        />
        <!-- 底部控制按钮组 -->
        <UeElControlGroup :col-count="enableZIndexMode ? 2 : 1">
            <UeElButton v-bind="layoutButtonParam" @trigger="openGridLibraryPanel" />
            <UeElButton v-if="enableZIndexMode" v-bind="zIndexButtonParam" @trigger="toggleZIndexMode" />
        </UeElControlGroup>
        <!-- 布局库弹窗面板 -->
        <UeElPopPanel v-model:open="popPanelOpen" :panel="popPanelParams" :draggable="true">
            <UeElGridLayoutLibraryPanel v-model:select="valueRef" />
        </UeElPopPanel>
    </UeElEditorGroup>
</template>

<script lang="ts" setup>
import type { UeElGridLayoutSettingBaseProps } from "./index";

import { getPopPanelParams } from "../pop-panel/utils/helper";
import UeElEditorGroup from "../editor-group";
import PreviewBox from "./sub-components/PreviewLayoutBox.vue";

defineOptions({ name: "UeElGridLayoutSetting" });

/**
 * 组件接口定义
 */
interface EmitEvents {
    (e: "input", value: string): void;
    (e: "swap", value: { origin: number; target: number }): void;
    (
        e: "change",
        value: {
            grid: string;
            reset: boolean;
            lengthChange: boolean;
            removeIndexList?: number[];
        }
    ): void;
}

/**
 * 组件属性和事件定义
 */
const { t } = useI18n();
const props = withDefaults(defineProps<UeElGridLayoutSettingBaseProps>(), {});
const emit = defineEmits<EmitEvents>();

/**
 * 组件数据模型
 */
const valueRef = defineModel<string>("value", { required: true });
const zIndexData = defineModel<string>("zIndex", { required: false });

/**
 * 组件引用
 */
const rootComponentRef = useTemplateRef<InstanceType<typeof UeElEditorGroup>>("rootComponent");

/**
 * 组件状态管理
 * @description 控制Z轴层级模式和弹窗面板的显示状态
 */
const isZIndexMode = ref(false);
const popPanelOpen = ref(false);

/**
 * 布局按钮参数计算属性
 * @returns {UeElButtonProps} 按钮配置对象
 */
const layoutButtonParam = computed<UE_EL_COMPONENT.UeElButtonProps>(() => ({
    theme: "strokeText",
    text: t("GRID_LAYOUT_SETTING_REPLACE"),
    disable: isZIndexMode.value,
}));

/**
 * Z轴层级按钮参数计算属性
 * @returns {UeElButtonProps} 按钮配置对象
 */
const zIndexButtonParam = computed<UE_EL_COMPONENT.UeElButtonProps>(() => ({
    theme: isZIndexMode.value ? "fillText" : "strokeText",
    text: isZIndexMode.value ? t("GRID_LAYOUT_SETTING_COMPLETE") : t("GRID_LAYOUT_SETTING_ADJUST_Z_INDEX"),
}));

/**
 * 预览框模式计算属性
 * @returns {"zIndex" | "replace" | "normal"} 预览框模式
 */
const previewBoxMode = computed(() => {
    if (isZIndexMode.value) return "zIndex";
    if (props.withReplace) return "replace";
    return "normal";
});

/**
 * 弹窗位置配置计算属性
 * @returns {UeElPopPanelProps["panel"]} 弹窗配置对象
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => {
    const dom = rootComponentRef.value?.$el;
    if (!dom) return;
    return getPopPanelParams("editorPanel", dom);
});

/**
 * 事件处理函数
 */
const handleChange = (value: string) => {
    valueRef.value = value;
};

const handleChangeZIndex = (value: string) => {
    zIndexData.value = value;
};

const handleSwap = (value: { origin: number; target: number }) => {
    emit("swap", value);
};

/**
 * 面板操作函数
 */
const openGridLibraryPanel = () => {
    popPanelOpen.value = true;
};

const toggleZIndexMode = () => {
    isZIndexMode.value = !isZIndexMode.value;
};
</script>

<style lang="scss" module>
.grid-layout-setting {
    border-bottom: 0 !important;

    padding-block: 0 !important;
}
</style>
