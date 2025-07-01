<template>
    <UeElSettingGroup :title="t('UNIT_STYLE')">
        <template #body>
            <UeElControlGroup>
                <UeElSelect v-model:value="lineType" :title="t('UNIT_LINE')" :options="lineTypeOptions" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('UNIT_SIZE')">
        <template #body>
            <UeElControlGroup>
                <UeElNumberInput v-bind="heightInputProps" v-model:value="height" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('UNIT_COLOR')">
        <template #body>
            <UeElColorSetting v-model:value="color" type="color" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const { t } = useI18n();
const valueModel = defineModel<UE_TIPTAP_EXTENSION.HrRule["attrs"]>("value", { required: true });

const lineTypeOptions: UE_EL_COMPONENT.UeElSelectProps["options"] = [
    { value: "solid", text: "实线" },
    { value: "dotted", text: "虚线" },
    { value: "dashed", text: "点划线" },
];
const lineType = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.lineType || "solid",
    set: (value, modelValue) => {
        modelValue.lineType = value;
        return modelValue;
    },
});

const height = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.height,
    set: (value, modelValue) => {
        modelValue.height = value;
        return modelValue;
    },
});

const heightInputProps = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("UNIT_HEIGHT") },
    limit: { "%": [5, Infinity], px: [30, Infinity] },
    units: [
        { text: "px", value: "px", default: 30 },
        { text: "%", value: "%", default: 10 },
    ],
}));

const color = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.color || "rgba(211, 211, 211, 0.4)",
    set: (value, modelValue) => {
        modelValue.color = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.layout-panel {
    // init
}
</style>
