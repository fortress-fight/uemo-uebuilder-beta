<template>
    <UeElSettingGroup :title="t('UNIT_SIZE')" :isFirst="true">
        <template #body>
            <UeElControlGroup>
                <UeElNumberInput v-bind="sizeInputProps" v-model:value="size" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const { t } = useI18n();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.DividerBlock["attrs"]>("value", { required: true });

const size = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.size,
    set: (value, modelValue) => {
        modelValue.size = value;
        return modelValue;
    },
});

const sizeInputProps = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_HEIGHT") },
    limit: { px: [10, Infinity], "%": [5, Infinity] },
    units: [
        { text: "px", value: "px", default: 30 },
        { text: "%", value: "%", default: 10 },
    ],
}));
</script>
<style lang="scss" module>
.layout-panel {
    // init
}
</style>
