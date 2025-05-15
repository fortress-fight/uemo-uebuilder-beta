<template>
    <ScrollSetting v-model:value="valueRef">
        <UeElSettingGroup :title="t('SCROLL_SCALE_SETTING_TITLE')">
            <UeElControlGroup :col-count="2">
                <UeElNumberInput v-bind="inputParam" v-model:value="startScale" :title="{ text: t('UNIT_START') }" />
                <UeElNumberInput v-bind="inputParam" v-model:value="endScale" :title="{ text: t('UNIT_END') }" />
                <UeElCheckBox
                    v-if="isImage"
                    :class="$style['scale-overflow']"
                    v-model:value="overflow"
                    :text="t('SCROLL_SCALE_SETTING_SCALE_OVERFLOW')"
                />
            </UeElControlGroup>
        </UeElSettingGroup>
    </ScrollSetting>
</template>
<script lang="ts" setup>
import type { ScrollScaleOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import ScrollSetting from "./ScrollSetting.vue";

import { defaultScrollOptions } from "../utils/helper";

const { t } = useI18n();

const _props = defineProps<{ isImage?: boolean }>();
const valueRef = defineModel<ScrollScaleOptions>("value", { required: true });

const inputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    step: 0.1,
    limit: [0, 3],
    required: true,
    hideUnit: true,
});

const startScale = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.start ?? defaultScrollOptions.scale.start,
    set(v, modelValue) {
        modelValue.start = v;
        return modelValue;
    },
});

const endScale = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.end ?? defaultScrollOptions.scale.end,
    set(v, modelValue) {
        modelValue.end = v;
        return modelValue;
    },
});

const overflow = useDefineObjectModel(valueRef, {
    get: (modelValue) => !!modelValue.overflow,
    set(v, modelValue) {
        modelValue.overflow = v;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.scroll-translate-setting {
    // init
}
.scale-overflow {
    grid-column: 1 / -1;
}
</style>
