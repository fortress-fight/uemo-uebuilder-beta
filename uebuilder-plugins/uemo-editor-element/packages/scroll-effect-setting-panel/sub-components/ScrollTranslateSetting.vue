<template>
    <ScrollSetting v-model:value="valueRef">
        <UeElSettingGroup :title="t('SCROLL_TRANSLATE_SETTING_X')">
            <template #body>
                <UeElControlGroup :col-count="2">
                    <UeElNumberInput v-bind="inputParam" v-model:value="xStart" :title="{ text: t('UNIT_START') }" />
                    <UeElNumberInput v-bind="inputParam" v-model:value="xEnd" :title="{ text: t('UNIT_END') }" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
        <UeElSettingGroup :title="t('SCROLL_TRANSLATE_SETTING_Y')">
            <template #body>
                <UeElControlGroup :col-count="2">
                    <UeElNumberInput v-bind="inputParam" v-model:value="yStart" :title="{ text: t('UNIT_START') }" />
                    <UeElNumberInput v-bind="inputParam" v-model:value="yEnd" :title="{ text: t('UNIT_END') }" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
    </ScrollSetting>
</template>
<script lang="ts" setup>
import type { ScrollTranslateOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import ScrollSetting from "./ScrollSetting.vue";

import { defaultScrollOptions } from "../utils/helper";

const { t } = useI18n();
const valueRef = defineModel<ScrollTranslateOptions>("value", { required: true });

const inputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    step: 1,
    limit: { px: [-500, 500], vw: [-20, 20], "%": [-100, 100] },
    units: [
        { value: "px", text: "px", default: 0 },
        { value: "vw", text: "vw", default: 0 },
        { value: "%", text: "%", default: 0 },
    ],
    required: true,
});

const xStart = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.xStart ?? defaultScrollOptions.translate.xStart,
    set(v, modelValue) {
        modelValue.xStart = v;
        return modelValue;
    },
});

const xEnd = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.xEnd ?? defaultScrollOptions.translate.xEnd,
    set(v, modelValue) {
        modelValue.xEnd = v;
        return modelValue;
    },
});

const yStart = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.yStart ?? defaultScrollOptions.translate.yStart,
    set(v, modelValue) {
        modelValue.yStart = v;
        return modelValue;
    },
});

const yEnd = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.yEnd ?? defaultScrollOptions.translate.yEnd,
    set(v, modelValue) {
        modelValue.yEnd = v;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.scroll-translate-setting {
    // init
}
</style>
