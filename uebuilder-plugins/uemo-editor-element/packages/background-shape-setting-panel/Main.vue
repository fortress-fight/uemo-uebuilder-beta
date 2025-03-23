<!--
 * @Description: 背景图形控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 01:05:03
-->
<template>
    <UeElEditorPanel
        :class="$style['background-shape-setting-panel']"
        :title="t('BACKGROUND_SPLINE_SETTING_TITLE', { type: t('UNIT_SHAPE') })"
        ref="rootComponent"
    >
        <!-- 图形资源设置 -->
        <UeElSettingGroup is-first>
            <template #body>
                <UeElResourceSetting type="shape" :removable="false" v-model:value="valueRef.name" />
            </template>
        </UeElSettingGroup>

        <!-- 颜色设置 -->
        <UeElColorSettingGroup v-model:value="color" :title="t('UNIT_MAIN_COLOR')" :enableOper="false" />

        <!-- 位置设置 -->
        <UeElSettingGroup :title="t('UNIT_POSITION')">
            <template #body>
                <UeElSelect v-model:value="position" :options="positionOptions" />
            </template>
        </UeElSettingGroup>

        <!-- 高度设置 -->
        <UeElSettingGroup :title="t('UNIT_HEIGHT')">
            <template #body>
                <UeElNumberInput v-model:value="valueRef.height" v-bind="heightNumInputParam" />
            </template>
        </UeElSettingGroup>

        <!-- 翻转设置 -->
        <UeElSettingGroup is-last :title="t('UNIT_OTHER')">
            <template #body>
                <UeElCheckBox v-model:value="valueRef.mirroring" :text="t('SHAPE_MIRRORING')" />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElBackgroundShapeSettingPanelBaseProps, UeElBackgroundShapeSettingPanelValue } from "./index";

import UeElEditorPanel from "../editor-panel";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const { t } = useI18n();
defineOptions({ name: "UeElBackgroundShapeSettingPanel" });
const _props = withDefaults(defineProps<UeElBackgroundShapeSettingPanelBaseProps>(), {});

/**
 * 组件数据模型
 * @description 使用 defineModel 定义双向绑定的数据
 */
const valueRef = defineModel<UeElBackgroundShapeSettingPanelValue>("value", { required: true });

/**
 * 位置设置
 */
const positionOptions = computed(() => [
    { value: "top", text: t("UNIT_TOP") },
    { value: "bottom", text: t("UNIT_BOTTOM") },
]);
const position = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.pos || "bottom";
    },
    set(value, modelValue) {
        modelValue.pos = value;
        return modelValue;
    },
});

/**
 * 高度输入框组件参数
 */
const heightNumInputParam: UE_EL_COMPONENT.UeElNumberInputProps = {
    limit: { "%": [5, 100], px: [20, Infinity] },
    default: { num: 200, unit: "px" },
    units: [
        { text: "px", value: "px", default: 200 },
        { text: "%", value: "%", default: 20 },
    ],
};

/**
 * 颜色设置
 */
const color = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.color || "#999999";
    },
    set(value, modelValue) {
        modelValue.color = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.background-shape-setting-panel {
    //
}
</style>
