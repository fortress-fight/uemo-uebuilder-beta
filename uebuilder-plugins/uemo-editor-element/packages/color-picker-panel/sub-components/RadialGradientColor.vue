<template>
    <RadialGradientBar
        v-if="isRadialGradient"
        v-model:value="valueRef"
        :defaultValue="defaultValue"
        :disable-opacity="disableOpacity"
    />
    <ColorGroup v-if="usedColors.length" :colors="usedColors" @submit="useColor = $event" />
    <ColorGroup :colors="DEFAULT_RADIAL_GRADIENT_COLORS" @submit="useColor = $event" />
</template>
<script lang="ts" setup>
import { getLocalRadialGradientColorLib, DEFAULT_RADIAL_GRADIENT_COLORS } from "../utils/helper";
import ColorGroup from "./ColorGroup.vue";
import RadialGradientBar from "./RadialGradientBar.vue";

defineOptions({ inheritAttrs: false });

const _prop = defineProps<{ defaultValue: string; disableOpacity: boolean }>();
const valueRef = defineModel<string>("value", { required: true });

const useColor = computed({
    get() {
        return valueRef.value;
    },
    set(value) {
        if (!value.includes("radial-gradient")) return;
        valueRef.value = value;
    },
});

const isRadialGradient = computed(() => {
    return valueRef.value.includes("radial-gradient");
});

const usedColors = getLocalRadialGradientColorLib();
</script>
<style lang="scss" module>
//
</style>
