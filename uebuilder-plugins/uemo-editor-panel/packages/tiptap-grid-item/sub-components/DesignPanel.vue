<template>
    <UeElBackgroundSettingGroup
        :title="t('UNIT_BACKGROUND')"
        v-model:value="background"
        v-bind="backgroundSettingGroupParam"
        type="mixin"
    />
    <UeElRadiusSettingGroup v-model:value="radius" />
    <UeElBorderSettingGroup v-model:value="border" />
    <UeElBoxShadowSettingGroup v-model:value="shadow" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.GridItem["attrs"]>("value", { required: true });

const { t } = useI18n();

const backgroundSettingGroupParam: UE_EL_COMPONENT.UeElBackgroundSettingGroupProps = {
    enableType: ["color", "image", "video", "blur", "svg"] as const,
};

// #region design

const background = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        return modelValue.background || undefined;
    },
    set: (value, modelValue) => {
        modelValue.background = value;
        return modelValue;
    },
});

const radius = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.radius || undefined,
    set: (value, modelValue) => {
        modelValue.radius = value;
        return modelValue;
    },
});

const border = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.border || undefined,
    set: (value, modelValue) => {
        modelValue.border = value;
        return modelValue;
    },
});

const shadow = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.shadow || undefined,
    set: (value, modelValue) => {
        modelValue.shadow = value;
        return modelValue;
    },
});

// #endregion
</script>
<style lang="scss" module>
//
</style>
