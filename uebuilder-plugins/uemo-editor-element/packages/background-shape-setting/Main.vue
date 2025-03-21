<!--
 * @Description: 背景图形控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 12:37:14
-->
<template>
    <UeElEditorPanel
        :class="$style['background-shape-setting']"
        :title="t('BACKGROUND_SPLINE_SETTING_TITLE', { type: t('UNIT_SHAPE') })"
        ref="rootComponent"
    >
        <!-- 图形资源设置 -->
        <UeElEditorGroup is-first>
            <UeElResourceSetting type="shape" :removable="false" v-model:value="valueRef.name" />
        </UeElEditorGroup>
        <UeElEditorGroup>
            <UeElControlGroup :title="t('UNIT_MAIN_COLOR')">
                <UeElColorSetting v-model:value="color" />
            </UeElControlGroup>
        </UeElEditorGroup>

        <!-- 位置设置 -->
        <UeElEditorGroup>
            <UeElControlGroup :title="t('UNIT_POSITION')">
                <UeElSelect v-model:value="position" :options="positionOptions" />
            </UeElControlGroup>
        </UeElEditorGroup>

        <!-- 高度设置 -->
        <UeElEditorGroup>
            <UeElControlGroup :title="t('UNIT_HEIGHT')">
                <UeElNumberInput v-model:value="valueRef.height" v-bind="heightNumInputParam" />
            </UeElControlGroup>
        </UeElEditorGroup>

        <!-- 翻转设置 -->
        <UeElEditorGroup is-last>
            <UeElControlGroup :title="t('UNIT_OTHER')">
                <UeElCheckBox v-model:value="valueRef.mirroring" :text="t('SHAPE_MIRRORING')" />
            </UeElControlGroup>
        </UeElEditorGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElBackgroundShapeSettingBaseProps, UeElBackgroundShapeSettingValue } from "./index";

import UeElEditorPanel from "../editor-panel";

const { t } = useI18n();
defineOptions({ name: "UeElBackgroundShapeSetting" });
const _props = withDefaults(defineProps<UeElBackgroundShapeSettingBaseProps>(), {});

/**
 * 组件数据模型
 * @description 使用 defineModel 定义双向绑定的数据
 */
const valueRef = defineModel<UeElBackgroundShapeSettingValue>("value", { required: true });

/**
 * 位置设置
 */
const positionOptions = computed(() => [
    { value: "top", text: t("UNIT_TOP") },
    { value: "bottom", text: t("UNIT_BOTTOM") },
]);
const position = computed({
    get() {
        return valueRef.value.pos || "bottom";
    },
    set(value) {
        valueRef.value.pos = value;
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
const color = computed({
    get() {
        return valueRef.value.color || "#999999";
    },
    set(value) {
        valueRef.value.color = value;
    },
});
</script>
<style lang="scss" module>
.background-shape-setting {
    //
}
</style>
