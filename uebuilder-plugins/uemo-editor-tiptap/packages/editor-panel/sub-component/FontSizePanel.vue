<template>
    <UeElEditorPanel
        :title="t('UNIT_TEXT_STYLE')"
        :class="$style['background-image-setting-panel']"
        ref="rootComponent"
        actionMode="confirm"
        :confirm="{ text: t('FONT_SIZE_USE_DEFAULT') }"
        isOperationEnabled
        @confirm="handleConfirm"
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

const _props = withDefaults(defineProps<{ device: UE_TIPTAP_UNIT.Device }>(), {
    device: "desktop",
});
const emit = defineEmits<{ (e: "closePopPanel"): void }>();

const valueRef = defineModel<UE_TIPTAP_EXTENSION.EditorPanel["panelAttrsMap"]["fontSize"]>("value", {
    required: true,
});

const fontSizeRef = computed({
    get() {
        return valueRef.value?.fontSize || "";
    },
    set(value) {
        valueRef.value = { fontSize: value };
    },
});

function handleConfirm() {
    valueRef.value = { fontSize: "" };
    emit("closePopPanel");
}
</script>
<style lang="scss" module>
.font-size-panel {
    // init
}
</style>
