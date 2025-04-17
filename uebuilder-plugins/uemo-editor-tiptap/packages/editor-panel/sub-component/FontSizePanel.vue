<template>
    <UeElEditorPanel
        :title="t('UNIT_TEXT_STYLE')"
        :class="$style['background-image-setting-panel']"
        ref="rootComponent"
    >
        <UeElSettingGroup :title="t('UNIT_FONT_SIZE')">
            <template #body>
                <UeElFontSizeSetting v-model:value="fontSizeRef" />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
const { t } = useI18n();

const valueRef = defineModel<{ fontSize: string }>("value", { required: true });

const fontSizeRef = computed({
    get() {
        return valueRef.value?.fontSize || "";
    },
    set(value) {
        valueRef.value = { fontSize: value };
    },
});
</script>
<style lang="scss" module>
.font-size-panel {
    // init
}
</style>
