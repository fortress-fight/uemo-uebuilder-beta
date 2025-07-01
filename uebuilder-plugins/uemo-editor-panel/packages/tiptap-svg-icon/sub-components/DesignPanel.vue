<template>
    <UeElColorSettingGroup :title="t('UNIT_BACKGROUND')" v-model:value="background" type="mixin" />
    <UeElRadiusSettingGroup v-model:value="radius" />
    <UeElBorderSettingGroup v-model:value="border" />
    <UeElBoxShadowSettingGroup v-model:value="shadow" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.SvgIcon["attrs"]>("value", { required: true });

const { t } = useI18n();

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
