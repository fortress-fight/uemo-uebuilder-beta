<template>
    <!-- 属性组 -->
    <UeElSettingGroup :title="t('UNIT_ATTR')">
        <template #body>
            <UeElControlGroup>
                <UeElSelect v-model:value="dir" :title="t('UNIT_LAYOUT')" :options="dirOptions" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElGapSettingGroup v-model:value="gap" v-bind="gapSettingGroupProps" />
    <UeElWidthSettingGroup v-model:value="width" v-bind="widthSettingGroupProps" />
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElAlignSetting v-model:value="align" type="x" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('UNIT_OVERFLOW')">
        <template #body>
            <UeElControlGroup>
                <UeElCheckBox v-model:value="fill" :text="t('FILL_MODE_TIP')" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const { t } = useI18n();

const valueRef = defineModel<UE_TIPTAP_EXTENSION.CounterNumber["attrs"]>("value", { required: true });

const dirOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { value: "row", text: t("UNIT_X") },
    { value: "column", text: t("UNIT_Y") },
]);
const dir = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.dir || "row",
    set: (value, modelValue) => {
        modelValue.dir = value;
        return modelValue;
    },
});

const widthSettingGroupProps = computed<UE_EL_COMPONENT.UeElWidthSettingGroupProps>(() => ({
    numberInputProps: {
        limit: { "%": [5, 100], px: [20, 500] },
        units: [
            { value: "%", text: "%", default: 10 },
            { value: "px", text: "px", default: 20 },
        ],
    },
}));

const width = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.width,
    set: (value, modelValue) => {
        modelValue.width = value;
        return modelValue;
    },
});

const gapSettingGroupProps = computed<UE_EL_COMPONENT.UeElGapSettingGroupProps>(() => ({
    gapSettingProps: {
        xLimit: { px: [0, 500], em: [0, 10] },
        yLimit: { px: [0, 500], em: [0, 10] },
        xUnits: [
            { value: "px", text: "px", default: 20 },
            { value: "em", text: "em", default: 1 },
        ],
        yUnits: [
            { value: "px", text: "px", default: 20 },
            { value: "em", text: "em", default: 1 },
        ],
    },
}));

const gap = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.gap,
    set: (value, modelValue) => {
        modelValue.gap = value;
        return modelValue;
    },
});

const align = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.align,
    set: (value, modelValue) => {
        modelValue.align = value;
        return modelValue;
    },
});

const fill = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.fill,
    set: (value, modelValue) => {
        modelValue.fill = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.tiptap-counter-number-content {
    // init
}
</style>
