<template>
    <ScrollSetting v-model:value="valueRef">
        <UeElSettingGroup :title="t('SCROLL_ROTATE_ATTRS')">
            <template #body>
                <UeElSelect
                    v-model:value="axis"
                    :title="t('SCROLL_ROTATE_AXIS')"
                    :options="rotateAxisOptions"
                    :show-value-icon="true"
                    value-align="right"
                />
                <UeElSelect v-model:value="axisPos" :title="t('SCROLL_ROTATE_AXIS_POS')" v-bind="axisPosSelectParam" />
            </template>
        </UeElSettingGroup>
        <UeElSettingGroup :title="t('SCROLL_ROTATE_ANGLE')">
            <template #body>
                <UeElControlGroup v-if="value" :col-count="2">
                    <UeElNumberInput
                        v-bind="inputParam"
                        v-model:value="startAngle"
                        :title="{ text: t('UNIT_START') }"
                    />
                    <UeElNumberInput v-bind="inputParam" v-model:value="endAngle" :title="{ text: t('UNIT_END') }" />
                </UeElControlGroup>
            </template>
        </UeElSettingGroup>
    </ScrollSetting>
</template>
<script lang="ts" setup>
import type { ScrollRotateOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import ScrollSetting from "./ScrollSetting.vue";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ name: "ScrollRotateControl" });

const { t } = useI18n();

const _props = defineProps<{ isImage?: boolean }>();
const valueRef = defineModel<ScrollRotateOptions>("value", { required: true });

const rotateAxis = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.axis ?? defaultScrollOptions.rotate.axis;
    },
    set(v, modelValue) {
        modelValue.axis = v;
        return modelValue;
    },
});

const axis = computed({
    get: () => rotateAxis.value.split("-")[0],
    set(value) {
        if (value === axis.value) return;
        switch (value) {
            case "x":
                rotateAxis.value = value + "-t";
                break;
            case "y":
                rotateAxis.value = value + "-l";
                break;
            case "z":
                rotateAxis.value = value + "-cc";
                break;

            default:
                break;
        }
    },
});

const rotateAxisOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { text: t("SCROLL_ROTATE_AXIS_X"), value: "x", icon: "icon-app-rotate-x" },
    { text: t("SCROLL_ROTATE_AXIS_Y"), value: "y", icon: "icon-app-rotate-y" },
    { text: t("SCROLL_ROTATE_AXIS_Z"), value: "z", icon: "icon-app-rotate-z" },
]);

const axisPos = computed({
    get: () => rotateAxis.value.split("-")[1],
    set(value) {
        rotateAxis.value = axis.value + "-" + value;
    },
});

const axisPosSelectParam = computed<UE_EL_COMPONENT.UeElSelectProps>(() => {
    let options: UE_EL_COMPONENT.UeElSelectProps["options"] = [];

    switch (axis.value) {
        case "x":
            options = [
                { text: t("UNIT_TOP"), value: "t", icon: "icon-app-axis-t" },
                { text: t("UNIT_BOTTOM"), value: "b", icon: "icon-app-axis-b" },
            ];
            break;
        case "y":
            options = [
                { text: t("UNIT_LEFT"), value: "l", icon: "icon-app-axis-l" },
                { text: t("UNIT_RIGHT"), value: "r", icon: "icon-app-axis-r" },
            ];
            break;
        case "z":
            options = [
                { text: t("UNIT_TOP_LEFT"), value: "tl", icon: "icon-app-axis-t-l" },
                { text: t("UNIT_TOP_CENTER"), value: "tc", icon: "icon-app-axis-t-c" },
                { text: t("UNIT_TOP_RIGHT"), value: "tr", icon: "icon-app-axis-t-r" },
                { text: t("UNIT_CENTER_LEFT"), value: "cl", icon: "icon-app-axis-c-l" },
                { text: t("UNIT_CENTER_CENTER"), value: "cc", icon: "icon-app-axis-c-c" },
                { text: t("UNIT_CENTER_RIGHT"), value: "cr", icon: "icon-app-axis-c-r" },
                { text: t("UNIT_BOTTOM_LEFT"), value: "bl", icon: "icon-app-axis-b-l" },
                { text: t("UNIT_BOTTOM_CENTER"), value: "bc", icon: "icon-app-axis-b-c" },
                { text: t("UNIT_BOTTOM_RIGHT"), value: "br", icon: "icon-app-axis-b-r" },
            ];
            break;

        default:
            break;
    }

    return {
        options,
        disable: options.length === 0,
        showIcon: true,
        valueAlign: "right",
    };
});

const inputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    limit: { deg: [-360, 360] },
    units: [{ value: "deg", text: "deg" }],
    required: true,
    hideUnit: true,
    show: {
        input(value) {
            return value.num + "deg";
        },
    },
});

const startAngle = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.start || defaultScrollOptions.rotate.start;
    },
    set(v, modelValue) {
        modelValue.start = v;
        return modelValue;
    },
});

const endAngle = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.end || defaultScrollOptions.rotate.end;
    },
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
