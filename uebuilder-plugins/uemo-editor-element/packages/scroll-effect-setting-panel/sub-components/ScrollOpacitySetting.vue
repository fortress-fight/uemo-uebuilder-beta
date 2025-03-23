<template>
    <ScrollSetting v-model:value="valueRef">
        <template #opacity>
            <UeElSettingGroup :title="t('SCROLL_EFFECT_SETTING_OPTION_TITLE')">
                <template #body>
                    <UeElControlGroup :col-count="2">
                        <UeElNumberInput
                            v-bind="inputParam"
                            v-model:value="startOpacity"
                            :title="{ text: t('UNIT_START') }"
                        />
                        <UeElNumberInput
                            v-bind="inputParam"
                            v-model:value="endOpacity"
                            :title="{ text: t('UNIT_END') }"
                        />
                    </UeElControlGroup>
                </template>
            </UeElSettingGroup>
        </template>
    </ScrollSetting>
</template>
<script lang="ts" setup>
import type { ScrollOpacityOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import ScrollSetting from "./ScrollSetting.vue";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ name: "ScrollOpacitySetting" });

const { t } = useI18n();

const _props = defineProps<{ isImage?: boolean }>();
const valueRef = defineModel<ScrollOpacityOptions>("value", { required: true });

const inputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    limit: [0, 1],
    step: 0.01,
    required: true,
    hideUnit: true,
});

const startOpacity = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.start ?? defaultScrollOptions.opacity.start,
    set(v, modelValue) {
        modelValue.start = v;
        return modelValue;
    },
});

const endOpacity = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.end ?? defaultScrollOptions.opacity.end,
    set(v, modelValue) {
        modelValue.end = v;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.scroll-rotate-control {
    // init
}
</style>
