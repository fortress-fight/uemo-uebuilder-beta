<template>
    <UeElColorSettingGroup v-model:value="color" type="color" />
    <UeElColorSettingGroup :title="t('UNIT_BACKGROUND')" v-model:value="background" type="color" />
    <UeElRadiusSettingGroup v-model:value="radius" />
    <UeElBorderSettingGroup v-model:value="border" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.ShareItem["attrs"]>("value", { required: true });

const { t } = useI18n();

// #region design

const color = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.color || undefined,
    set: (value, modelValue) => {
        modelValue.color = value;
        return modelValue;
    },
});

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

// #endregion
</script>
<style lang="scss" module>
//
</style>
