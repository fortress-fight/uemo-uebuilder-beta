<!--
 * @Description: Spline背景设置控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 01:05:31
-->
<template>
    <UeElEditorPanel
        :class="$style['background-spline-setting-panel']"
        :title="t('BACKGROUND_SPLINE_SETTING_TITLE', { type: 'Spline' })"
    >
        <!-- Spline资源设置 -->
        <UeElSettingGroup is-first>
            <template #body>
                <UeElResourceSetting type="spline" :removable="false" v-model:value="splineSource" />
            </template>
        </UeElSettingGroup>

        <!-- 滚动效果设置 -->
        <UeElSettingGroup :title="t('SCROLL_EFFECT_TITLE')">
            <template #body>
                <UeElSelect v-model:value="scrollEffect" v-bind="effectOptions" />
            </template>
        </UeElSettingGroup>

        <!-- 提示信息 -->
        <UeElSettingGroup :title="t('UNIT_TIP')" is-last>
            <template #body>
                <UeElTipGroup v-bind="tipMessage" />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>

<script lang="ts" setup>
import type { UeElBackgroundSplinePanelSettingBaseProps, UeElBackgroundSplinePanelSettingPanelValue } from "./index";

import UeElEditorPanel from "../editor-panel";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeElBackgroundSplinePanelSetting" });

/**
 * 组件属性和事件定义
 */
const { t } = useI18n();
const _props = withDefaults(defineProps<UeElBackgroundSplinePanelSettingBaseProps>(), {});

/**
 * 组件数据模型
 * @description 使用 defineModel 定义双向绑定的数据
 */
const valueRef = defineModel<UeElBackgroundSplinePanelSettingPanelValue>("value", { required: true });

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
const scrollEffect = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.effect || "normal";
    },
    set(value, modelValue) {
        modelValue.effect = value;
        return modelValue;
    },
});

/**
 * Spline 资源配置
 * @description 控制 Spline 资源的 URL
 */
const splineSource = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.url;
    },
    set(value, modelValue) {
        modelValue.url = value;
        return modelValue;
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
</script>

<style lang="scss" module>
.background-spline-setting-panel {
    // 预留样式空间，方便后续扩展
}
</style>
