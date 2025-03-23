<template>
    <ScrollTriggerControl v-model:value="triggerModeParam" />
    <ScrollAreaControl v-model:value="areaParam" :trigger-mode="triggerModeParam.triggerMode" />
    <ScrollAreaDistanceControl v-model:value="scrollDisValue" :trigger-mode="triggerModeParam.triggerMode" />
    <slot />
    <slot name="opacity">
        <ScrollOpacityControl v-model:value="opacityValue" />
    </slot>
</template>
<script lang="ts" setup>
import type { ScrollBaseOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import ScrollAreaControl from "./ScrollAreaControl.vue";
import ScrollTriggerControl from "./ScrollTriggerControl.vue";
import ScrollAreaDistanceControl from "./ScrollAreaDistanceControl.vue";
import ScrollOpacityControl from "./ScrollOpacityControl.vue";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ inheritAttrs: false });

const valueRef = defineModel<ScrollBaseOptions>("value", { required: true });

const triggerModeParam = useDefineObjectModel(valueRef, {
    get: (modeValue) => {
        return {
            triggerMode: modeValue.triggerMode || "",
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

const opacityValue = useDefineObjectModel(valueRef, {
    get(modelValue) {
        const { opacityStart, opacityEnd } = modelValue;
        if (typeof opacityStart === "undefined" || typeof opacityEnd === "undefined") {
            return {};
        }
        return { opacityStart, opacityEnd };
    },
    set(value, modelValue) {
        if (value) {
            modelValue.opacityStart = value.opacityStart;
            modelValue.opacityEnd = value.opacityEnd;
        } else {
            modelValue.opacityStart = undefined;
            modelValue.opacityEnd = undefined;
        }
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.scroll-setting {
    // init
}
</style>
