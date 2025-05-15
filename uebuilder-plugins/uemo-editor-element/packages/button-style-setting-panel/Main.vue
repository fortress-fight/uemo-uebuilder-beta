<!--
 * @Description: 按钮样式属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 14:52:18
-->
<template>
    <UeElEditorPanel :class="$style['button-style-setting-panel']" :title="title || t('UNIT_BUTTON') + t('UNIT_STYLE')">
        <UeElButtonHoverEffectSetting is-first v-if="mode === 'hover'" v-model:value="animation" />
        <template v-if="isRotateTheme || isOutlineTheme">
            <UeElColorSettingGroup
                :is-first="mode !== 'hover'"
                v-model:value="background"
                :title="t('UNIT_MAIN_COLOR')"
            />
            <UeElColorSettingGroup v-model:value="color" :title="t('UNIT_SECONDARY_COLOR')" />
            <UeElBoxShadowSettingGroup is-last v-if="isRotateTheme" v-model:value="shadow" />
        </template>
        <template v-else>
            <UeElColorSettingGroup
                :is-first="mode !== 'hover'"
                v-model:value="background"
                :title="t('UNIT_BACKGROUND_COLOR')"
                type="mixin"
            />
            <UeElColorSettingGroup v-model:value="color" :title="t('UNIT_FONT_COLOR')" />
            <UeElRadiusSettingGroup v-model:value="radius" />
            <UeElBorderSettingGroup v-model:value="border" />
            <UeElBoxShadowSettingGroup is-last v-model:value="shadow" />
        </template>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElButtonStyleSettingPanelBaseProps, UeElButtonStyleSettingPanelValue } from "./index";

import { useDefineObjectModel } from "../../utils/model-mixin";

defineOptions({ name: "UeElButtonStyleSettingPanel" });

const { t } = useI18n();
const props = withDefaults(defineProps<UeElButtonStyleSettingPanelBaseProps>(), {
    mode: "normal",
    theme: "normal",
});
const valueRef = defineModel<UeElButtonStyleSettingPanelValue>("value", { required: true });

const isRotateTheme = computed(() => props.theme.startsWith("rotate"));
const isOutlineTheme = computed(() => props.theme.startsWith("outline"));

const animation = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.animation,
    set: (value, modelValue) => {
        modelValue.animation = value;
        return modelValue;
    },
});

const background = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.background,
    set: (value, modelValue) => {
        modelValue.background = value;
        return modelValue;
    },
});

const color = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.color,
    set: (value, modelValue) => {
        modelValue.color = value;
        return modelValue;
    },
});

const radius = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.radius,
    set: (value, modelValue) => {
        modelValue.radius = value;
        return modelValue;
    },
});

const border = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.border,
    set: (value, modelValue) => {
        modelValue.border = value;
        return modelValue;
    },
});

const shadow = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.shadow,
    set: (value, modelValue) => {
        modelValue.shadow = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.button-style-setting-panel {
    //
}
</style>
