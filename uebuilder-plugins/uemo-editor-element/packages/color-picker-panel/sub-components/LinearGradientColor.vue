<template>
    <LinearGradientBar
        v-if="isLinearGradient"
        v-model:value="valueRef"
        :defaultValue="defaultValue"
        :disable-opacity="disableOpacity"
    />
    <ColorGroup v-if="usedColors.length" :colors="usedColors" @submit="useColor = $event" />
    <ColorGroup :colors="DEFAULT_GRADIENT_COLORS" @submit="useColor = $event" />
</template>
<script lang="ts" setup>
import { getLocalGradientColorLib, DEFAULT_GRADIENT_COLORS } from "../utils/helper";
import ColorGroup from "./ColorGroup.vue";
import LinearGradientBar from "./LinearGradientBar.vue";

defineOptions({ inheritAttrs: false });

const _prop = defineProps<{ defaultValue: string; disableOpacity: boolean }>();
const valueRef = defineModel<string>("value", { required: true });

const useColor = computed({
    get() {
        return valueRef.value;
    },
    set(value) {
        if (!value.includes("linear-gradient")) return;
        valueRef.value = value;
    },
});

const isLinearGradient = computed(() => {
    return valueRef.value.includes("linear-gradient");
});

const usedColors = getLocalGradientColorLib();
</script>
<style lang="scss" module>
.color-picker {
    padding-top: 0;
    padding-bottom: 0;
}
</style>
