<template>
    <UeElEditorPanel
        :title="t('UNIT_TEXT_STYLE')"
        :class="$style['letter-spacing-panel']"
        actionMode="confirm"
        :confirm="{ text: t('LETTER_SPACING_USE_DEFAULT') }"
        isOperationEnabled
        @confirm="handleConfirm"
    >
        <UeElSettingGroup :title="t('UNIT_LETTER_SPACING')">
            <template #body>
                <UeElNumberInput v-bind="inputParam" v-model:value="letterSpacingRef" />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
const { t } = useI18n();

const valueRef = defineModel<UE_TIPTAP_EXTENSION.AttrEditorPanelMap["letterSpacing"]>("value", { required: true });

const inputParam = computed<Partial<UE_EL_COMPONENT.UeElNumberInputProps>>(() => ({
    limit: { em: [-10, 10], px: [-200, 200] },
    units: [
        { value: "em", text: "em", default: 0.5, step: 0.1 },
        { value: "px", text: "px", default: 1 },
    ],
    show: {
        input(current) {
            if (typeof current.num === "number") {
                return undefined;
            }
            return t("UNIT_DEFAULT");
        },
    },
}));

const letterSpacingRef = computed({
    get() {
        return valueRef.value?.letterSpacing || "";
    },
    set(value) {
        valueRef.value = { letterSpacing: String(value) };
    },
});

function handleConfirm() {
    valueRef.value = { letterSpacing: "" };
}
</script>
<style lang="scss" module>
.letter-spacing-panel {
    // init
}
</style>
