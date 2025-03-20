<!--
 * @Description: Spline背景设置控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 02:41:02
-->
<template>
    <UeElEditorPanel
        :class="$style['background-spline-setting']"
        :title="t('BACKGROUND_SPLINE_SETTING_TITLE', { type: 'Spline' })"
        ref="rootComponent"
    >
        <!-- Spline资源设置 -->
        <UeElEditorGroup is-first>
            <UeElResourceSetting
                type="spline"
                :removable="false"
                v-model:value="splineSource"
                :pop-panel-props="popPanelProps"
            />
        </UeElEditorGroup>

        <!-- 滚动效果设置 -->
        <UeElEditorGroup>
            <UeElControlGroup :title="t('SCROLL_EFFECT_TITLE')">
                <UeElSelect v-model:value="scrollEffect" v-bind="effectOptions" />
            </UeElControlGroup>
        </UeElEditorGroup>

        <!-- 提示信息 -->
        <UeElEditorGroup is-last>
            <UeElControlGroup :title="t('UNIT_TIP')">
                <UeElTipGroup v-bind="tipMessage" />
            </UeElControlGroup>
        </UeElEditorGroup>
    </UeElEditorPanel>
</template>

<script lang="ts" setup>
import type { UeElBackgroundSplineSettingBaseProps, UeElBackgroundSplineSettingValue } from "./index";

import { getPopPanelParams } from "../pop-panel/utils/helper";
import UeElEditorPanel from "../editor-panel";

defineOptions({ name: "UeElBackgroundSplineSetting" });

/**
 * 组件属性和事件定义
 */
const { t } = useI18n();
const _props = withDefaults(defineProps<UeElBackgroundSplineSettingBaseProps>(), {});

/**
 * 组件数据模型
 * @description 使用 defineModel 定义双向绑定的数据
 */
const valueRef = defineModel<UeElBackgroundSplineSettingValue>("value", {
    default: () => ({}),
});

/**
 * 组件引用
 */
const rootComponentRef = useTemplateRef<InstanceType<typeof UeElEditorPanel>>("rootComponent");

/**
 * 提示信息配置
 * @description 包含 Spline 使用的注意事项
 */
const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => ({
    tips: [`1. ${t("BACKGROUND_SPLINE_SETTING_TIP_1")}`, `2. ${t("BACKGROUND_SPLINE_SETTING_TIP_2")}`],
}));

/**
 * 滚动效果配置
 * @description 控制 Spline 背景的滚动行为
 */
const scrollEffect = computed({
    get() {
        return valueRef.value.effect || "normal";
    },
    set(value) {
        updateValue({ effect: value });
    },
});

/**
 * Spline 资源配置
 * @description 控制 Spline 资源的 URL
 */
const splineSource = computed<string>({
    get() {
        return valueRef.value.url;
    },
    set(value) {
        updateValue({ url: value });
    },
});

/**
 * 效果选项配置
 * @description 定义滚动效果的可选项
 */
const effectOptions = computed<UE_EL_COMPONENT.UeElSelectProps>(() => ({
    title: t("UNIT_MODE"),
    defaultValue: "normal",
    options: [
        { value: "normal", text: t("UNIT_NORMAL") },
        { value: "parallax", text: t("UNIT_PARALLAX") },
        { value: "sticky", text: t("UNIT_STICKY") },
    ] as const,
}));

/**
 * 弹窗面板配置
 * @description 配置资源选择弹窗的位置和行为
 */
const popPanelProps = computed<UE_EL_COMPONENT.UeElPopPanelProps>(() => {
    return getPopPanelParams("editorPanel", rootComponentRef.value?.$el);
});

/**
 * 更新组件值
 * @description 使用不可变更新方式更新组件状态
 */
function updateValue(value: Partial<UeElBackgroundSplineSettingValue>) {
    valueRef.value = {
        ...valueRef.value,
        ...value,
    };
}
</script>

<style lang="scss" module>
.background-spline-setting {
    // 预留样式空间，方便后续扩展
}
</style>
