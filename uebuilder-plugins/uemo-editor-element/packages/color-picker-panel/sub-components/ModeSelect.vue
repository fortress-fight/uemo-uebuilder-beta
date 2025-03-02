<template>
    <UeElSelect
        :value="mode"
        :class="$style['panel-head']"
        :options="modeOptions"
        data-dragger-disable
        @update:value="changeMode"
    >
        <template #info="{ infoText }">
            <div :class="$style['panel-title']" class="grid grid-flow-col-dense gap-2 items-center">
                <div :class="$style['text']">{{ infoText }}</div>
                <UeElIcon name="icon-xiajiantou" :size="12" />
            </div>
        </template>
    </UeElSelect>
</template>
<script lang="ts" setup>
import { parseLinearGradient, parseRadialGradient } from "@stone/uemo-editor-utils/lib/css-gradient-parser";
import { isColor } from "@stone/uemo-editor-utils/lib/color";

const { t } = useI18n();

const prop = defineProps<{
    mode: UE_EL_UTIL.ColorType;
    color: string;
    defaultValue: string;
    defaultGradientColor: string;
    defaultRadialGradientColor: string;
}>();
const emit = defineEmits<{ (ev: "changeColor", color: string): void }>();

const modeOptions = computed(() => [
    { value: "color", text: t("COLOR_PICKER_PANEL_TITLE") },
    { value: "linearGradient", text: t("COLOR_PICKER_GRADIENT_TITLE") },
    { value: "radialGradient", text: t("COLOR_PICKER_RADIAL_GRADIENT_TITLE") },
]);

function getCurrentFirstColor(value: string) {
    if (!value) return "#000000";

    if (value.includes("linear-gradient")) {
        return parseLinearGradient(value).stops[0].color;
    } else if (value.includes("radial-gradient")) {
        return parseRadialGradient(value).stops[0].color;
    } else {
        if (isColor(value)) {
            return value;
        }
        return "#000000";
    }
}

function changeMode(type: UE_EL_UTIL.SelectValue) {
    const firstColor = getCurrentFirstColor(prop.color);

    if (type === "color") {
        emit("changeColor", firstColor);
        return;
    }

    if (type === "linearGradient") {
        if (!prop.color) {
            emit("changeColor", prop.defaultGradientColor);
        } else {
            emit("changeColor", `linear-gradient(90deg, ${firstColor} 0%, rgba(0,0,0,0) 100%)`);
        }
        return;
    }

    if (type === "radialGradient") {
        if (!prop.color) {
            emit("changeColor", prop.defaultRadialGradientColor);
        } else {
            emit("changeColor", `radial-gradient(ellipse at 50% 50%, ${firstColor} 50%, rgba(0,0,0,0) 100%)`);
        }
    }
}
</script>
<style lang="scss" module>
.panel-title {
    padding-left: 14px;
}
</style>
