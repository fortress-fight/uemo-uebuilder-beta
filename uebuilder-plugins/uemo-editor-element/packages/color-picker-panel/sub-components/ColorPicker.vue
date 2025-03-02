<template>
    <UeElColorPicker v-model:value="useColor" :class="$style['color-picker']" :disable-opacity="disableOpacity" />
    <ColorGroup v-if="usedColors.length" :colors="usedColors" @submit="updateColor($event)" />
    <ColorGroup :colors="DEFAULT_COLORS" @submit="updateColor($event)" />
</template>
<script lang="ts" setup>
import Color, { isColor } from "@stone/uemo-editor-utils/lib/color";

import { getLocalColorLib, DEFAULT_COLORS } from "../utils/helper";
import ColorGroup from "./ColorGroup.vue";

defineOptions({ inheritAttrs: false });
const prop = defineProps<{
    defaultValue: string;
    disableOpacity: boolean;
}>();
const valueRef = defineModel<string>("value", { required: true });

const useColor = computed({
    get() {
        return isColor(valueRef.value) ? valueRef.value : prop.defaultValue;
    },
    set(value) {
        if (value.includes("linear-gradient") || value.includes("radial-gradient")) return;
        valueRef.value = value;
    },
});

function updateColor(color: string) {
    if (prop.disableOpacity) {
        useColor.value = Color(color).alpha(1).rgb().toString();
    } else {
        useColor.value = color;
    }
}

const usedColors = getLocalColorLib();
</script>
<style lang="scss" module>
.color-picker {
    padding-top: 0;
    padding-bottom: 0;
}
</style>
