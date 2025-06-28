<template>
    <UeElPaddingSettingGroup v-model:value="padding" v-bind="paddingInputProps" />
    <UeElOverflowSetting v-model:value="overflow" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.GridItem["attrs"]>("value", { required: true });

const paddingInputProps = computed<UE_EL_COMPONENT.UeElPaddingSettingGroupProps>(() => ({
    paddingSettingProps: {
        units: [
            { text: "px", value: "px", default: 0 },
            { text: "%", value: "%", default: 0 },
        ],
        limit: { "%": [0, 100], px: [0, 500] },
    },
}));

const padding = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.padding,
    set: (value, modelValue) => {
        modelValue.padding = value;
        return modelValue;
    },
});

const overflow = useDefineObjectModel(valueModel, {
    get: (modelValue) => !!modelValue.overflow,
    set: (value, modelValue) => {
        if (value) {
            modelValue.overflow = "hidden";
        } else {
            modelValue.overflow = undefined;
        }
        return modelValue;
    },
});
</script>
<style lang="scss" module>
//
</style>
