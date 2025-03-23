<!--
 * @Description: 按钮样式属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 16:57:05
-->
<template>
    <UeElEditorPanel :class="$style['button-style-setting-panel']" :title="title || t('UNIT_BUTTON')">
        <UeElButtonHoverEffectSetting is-first v-if="mode === 'hover'" v-model:value="valueRef.animation" />
        <template v-if="isRotateTheme || isOutlineTheme">
            <UeElColorSettingGroup
                :is-first="mode !== 'hover'"
                v-model:value="valueRef.background"
                :title="t('UNIT_MAIN_COLOR')"
            />
            <UeElColorSettingGroup v-model:value="valueRef.color" :title="t('UNIT_SECONDARY_COLOR')" />
            <UeElBoxShadowSettingGroup is-last v-if="isRotateTheme" v-model:value="valueRef.shadow" />
        </template>
        <template v-else>
            <UeElColorSettingGroup
                :is-first="mode !== 'hover'"
                v-model:value="valueRef.background"
                :title="t('UNIT_BACKGROUND_COLOR')"
            />
            <UeElColorSettingGroup v-model:value="valueRef.color" :title="t('UNIT_FONT_COLOR')" />
            <UeElRadiusSettingGroup v-model:value="valueRef.radius" />
            <UeElBorderSettingGroup v-model:value="valueRef.border" />
            <UeElBoxShadowSettingGroup is-last v-model:value="valueRef.shadow" />
        </template>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElButtonStyleSettingPanelPanelBaseProps, UeElButtonStyleSettingPanelPanelValue } from "./index";

defineOptions({ name: "UeElButtonStyleSettingPanel" });

const { t } = useI18n();
const props = withDefaults(defineProps<UeElButtonStyleSettingPanelPanelBaseProps>(), {
    mode: "normal",
    theme: "normal",
});
const valueRef = defineModel<UeElButtonStyleSettingPanelPanelValue>("value", { required: true });

const isRotateTheme = computed(() => props.theme.startsWith("rotate"));
const isOutlineTheme = computed(() => props.theme.startsWith("outline"));
</script>
<style lang="scss" module>
.button-style-setting-panel {
    //
}
</style>
