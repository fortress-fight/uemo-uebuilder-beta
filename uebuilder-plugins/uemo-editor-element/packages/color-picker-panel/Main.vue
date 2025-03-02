<!--
 * @Description: 颜色选择器面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 18:53:21
-->
<template>
    <UeElEditorPanel :title="panelTitle" :class="$style['color-picker-panel']" :with-dragger="true" :with-close="false">
        <template #title v-if="type === 'mixin'">
            <ModeSelect v-bind="modeSelectParam" :mode="colorMode" @change-color="useValue = $event" />
        </template>
        <template v-if="colorMode === 'color'">
            <ColorPicker v-model:value="useValue" :disable-opacity="disableOpacity" :default-value="defaultValue" />
        </template>
        <template v-if="colorMode === 'linearGradient'">
            <LinearGradientColor
                v-model:value="useValue"
                :disable-opacity="disableOpacity"
                :default-value="defaultGradientColor"
            />
        </template>
        <template v-if="colorMode === 'radialGradient'">
            <RadialGradientColor
                v-model:value="useValue"
                :disable-opacity="disableOpacity"
                :default-value="defaultRadialGradientColor"
            />
        </template>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElColorPickerPanelBaseProps } from "./index";

import ColorPicker from "./sub-components/ColorPicker.vue";
import LinearGradientColor from "./sub-components/LinearGradientColor.vue";
import RadialGradientColor from "./sub-components/RadialGradientColor.vue";
import { addLocalColorLib, addLocalGradientColorLib, addLocalRadialGradientColorLib } from "./utils/helper";

import ModeSelect from "./sub-components/ModeSelect.vue";

const { t } = useI18n();

defineOptions({ name: "UeElColorPickerPanel" });

const prop = withDefaults(defineProps<UeElColorPickerPanelBaseProps>(), {
    disableOpacity: false,
    defaultValue: "#000000",
    defaultGradientColor: "linear-gradient(90deg, #000 0%, rgba(0,0,0,0) 100%)",
    defaultRadialGradientColor: "radial-gradient(ellipse at 50% 50%, #e66465 50%, rgba(0,0,0,0) 100%)",
});
const valueRef = defineModel<string>("value", { required: true });
const useValue = computed({
    get() {
        return valueRef.value;
    },
    set(value) {
        if (!checkValueType(value)) return;
        valueRef.value = value;
    },
});

function checkValueType(value: string) {
    if (prop.type === "mixin" || typeof prop.type === "undefined") return true;
    if (value.includes("linear-gradient")) {
        if (prop.type === "linearGradient") return true;
        return false;
    }
    if (value.includes("radial-gradient")) {
        if (prop.type === "radialGradient") return true;
        return false;
    }
    return true;
}

const panelTitle = computed(() => {
    if (colorMode.value === "linearGradient") {
        return t("COLOR_PICKER_GRADIENT_TITLE");
    } else if (colorMode.value === "radialGradient") {
        return t("COLOR_PICKER_RADIAL_GRADIENT_TITLE");
    } else {
        return t("COLOR_PICKER_PANEL_TITLE");
    }
});

const modeSelectParam = computed(() => ({
    color: valueRef.value,
    defaultValue: prop.defaultValue,
    defaultGradientColor: prop.defaultGradientColor,
    defaultRadialGradientColor: prop.defaultRadialGradientColor,
}));

const colorMode = computed(() => {
    if (!prop.type || prop.type === "mixin") {
        if (valueRef.value.includes("linear-gradient")) {
            return "linearGradient";
        } else if (valueRef.value.includes("radial-gradient")) {
            return "radialGradient";
        } else {
            return "color";
        }
    } else {
        return prop.type;
    }
});

let originColor = "";
onMounted(() => {
    originColor = valueRef.value;
});
onBeforeUnmount(() => {
    const color = valueRef.value;

    if (originColor === color) return;

    if (color.includes("linear-gradient")) {
        addLocalGradientColorLib(color);
    } else if (color.includes("radial-gradient")) {
        addLocalRadialGradientColorLib(color);
    } else {
        addLocalColorLib(color);
    }
});
</script>
<style lang="scss" module>
.color-picker-panel {
    //
}
</style>
