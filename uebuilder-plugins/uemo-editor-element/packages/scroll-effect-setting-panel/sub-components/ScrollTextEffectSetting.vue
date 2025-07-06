<template>
    <UeElSettingGroup :class="$style['scroll-area']" :title="t('SCROLL_EFFECT_TYPE')">
        <template #body>
            <UeElControlGroup :col-count="1">
                <UeElSelect v-model:value="effectType" :title="t('UNIT_EFFECT')" :options="effectTypeOption" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <ScrollTriggerControl v-model:value="triggerModeParam" :disable="true" />
    <ScrollAreaControl v-model:value="areaParam" :trigger-mode="triggerModeParam.triggerMode" />
    <ScrollAreaDistanceControl v-model:value="scrollDisValue" :trigger-mode="triggerModeParam.triggerMode" />
</template>
<script lang="ts" setup>
import type { ScrollTextEffectOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

import ScrollAreaControl from "./ScrollAreaControl.vue";
import ScrollTriggerControl from "./ScrollTriggerControl.vue";
import ScrollAreaDistanceControl from "./ScrollAreaDistanceControl.vue";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ inheritAttrs: false });

const { t } = useI18n();
const valueRef = defineModel<ScrollTextEffectOptions>("value", { required: true });

const effectType = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.effectType || "",
    set(value, modelValue) {
        modelValue.effectType = value;
        return modelValue;
    },
});

const effectTypeOption = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => {
    return [
        { text: "模式一", value: "effect-1" },
        { text: "模式二", value: "effect-2" },
        { text: "模式三", value: "effect-3" },
        { text: "模式四", value: "effect-4" },
    ];
});

const triggerModeParam = useDefineObjectModel(valueRef, {
    get: (modeValue) => {
        return {
            triggerMode: modeValue.triggerMode || defaultScrollOptions["text-effect"].triggerMode,
            triggerDelay: modeValue.triggerDelay,
            triggerEase: modeValue.triggerEase,
            triggerDuration: modeValue.triggerDuration,
        };
    },
    set(value, modeValue) {
        modeValue.triggerMode = value.triggerMode;
        modeValue.triggerDelay = value.triggerDelay;
        modeValue.triggerEase = value.triggerEase;
        modeValue.triggerDuration = value.triggerDuration;
        return modeValue;
    },
});

const areaParam = useDefineObjectModel(valueRef, {
    get: (modelValue) => {
        return {
            startPos: modelValue.startPos || defaultScrollOptions.rotate.startPos,
            endPos: modelValue.endPos || defaultScrollOptions.rotate.endPos,
        };
    },
    set(value, modelValue) {
        modelValue.startPos = value.startPos;
        modelValue.endPos = value.endPos;
        return modelValue;
    },
});

const scrollDisValue = useDefineObjectModel(valueRef, {
    get: (modelValue) => {
        return {
            startPosDis: modelValue.startPosDis,
            endPosDis: modelValue.endPosDis,
        };
    },
    set(value, modelValue) {
        modelValue.startPosDis = value.startPosDis;
        modelValue.endPosDis = value.endPosDis;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.scroll-translate-setting {
    // init
}
</style>
