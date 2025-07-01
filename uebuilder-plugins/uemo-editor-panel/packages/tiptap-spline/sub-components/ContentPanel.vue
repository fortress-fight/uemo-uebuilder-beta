<template>
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElResourceSetting type="spline" v-model:value="svgIcon" :removable="false" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElAlignSetting v-model:value="align" type="x" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElWidthSettingGroup v-bind="widthInputProps" v-model:value="width" />
    <UeElRatioSettingGroup v-model:value="ratio" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.Spline["attrs"]>("value", { required: true });

// #region content

const svgIcon = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        if (!modelValue.url) return undefined;

        return modelValue.url;
    },
    set: (value, modelValue) => {
        if (!value) return modelValue;

        modelValue.url = value;

        return modelValue;
    },
});

const align = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.align || "left",
    set: (value, modelValue) => {
        modelValue.align = value;
        return modelValue;
    },
});

// #region width

const width = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.width,
    set: (value, modelValue) => {
        modelValue.width = value;
        return modelValue;
    },
});

const widthInputProps = computed<UE_EL_COMPONENT.UeElWidthSettingGroupProps>(() => ({
    numberInputProps: {
        limit: { px: [20, Infinity], "%": [5, 100] },
        units: [
            { value: "px", text: "px", default: 200 },
            { value: "%", text: "%", default: 100 },
        ],
    },
}));

// #endregion

const ratio = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.ratio,
    set: (value, modelValue) => {
        modelValue.ratio = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
//
</style>
