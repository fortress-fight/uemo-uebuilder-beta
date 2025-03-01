<!--
 * @Description: 颜色选择器面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 01:54:31
-->
<template>
    <UeElEditorPanel title="颜色面板" :class="$style['color-picker-panel']" :with-dragger="true" :with-close="false">
        <UeElColorPicker v-model:value="useColor" :class="$style['color-picker']" :disable-opacity="disableOpacity" />
        <ColorGroup v-if="usedColors.length" :colors="usedColors" @submit="updateColor($event)" />
        <ColorGroup :colors="defaultColors" @submit="updateColor($event)" />
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElColorPickerPanelBaseProps } from "./index";

import Color, { isColor } from "@stone/uemo-editor-utils/lib/color";
import ColorGroup from "./sub-components/ColorGroup.vue";
import { getLocalColorLib, addLocalColorLib } from "./utils/helper";

defineOptions({ name: "UeElColorPickerPanel" });

const prop = withDefaults(defineProps<UeElColorPickerPanelBaseProps>(), {
    defaultValue: "#000000",
    disableOpacity: false,
});
const valueRef = defineModel<string>("value", { required: true });

const useColor = computed({
    get() {
        return isColor(valueRef.value) ? valueRef.value : prop.defaultValue;
    },
    set(value) {
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

// 基础颜色组
const defaultColors = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#b5b5b5",
    "#cccccc",
    "#dddddd",
    "#f6f6f6",
    "#ffffff",
    "#df116d",
    "#bb11df",
    "#1163df",
    "#11b6df",
    "#11df37",
    "#85ec16",
    "#f6f04c",
    "#ff6000",
    "#e30e0e",
];

// 常用颜色管理组
let originColor = "";
const usedColors = ref<string[]>([]);
onMounted(() => {
    originColor = valueRef.value;
    usedColors.value = getLocalColorLib();
});
onBeforeUnmount(() => {
    if (originColor !== valueRef.value) {
        addLocalColorLib(valueRef.value);
    }
});
</script>
<style lang="scss" module>
.color-picker-panel {
    .color-picker {
        padding-top: 0;
        padding-bottom: 0;
    }
}
</style>
