<template>
    <ScrollSetting v-model:value="valueRef">
        <UeElSettingGroup title="旋转参数">
            <template #body>
                <UeElSelect
                    v-model:value="axis"
                    title="旋转轴"
                    :options="rotateAxisOptions"
                    :show-value-icon="true"
                    value-align="right"
                />
                <UeElSelect v-model:value="axisPos" title="旋转位置" v-bind="axisPosSelectParam" />
            </template>
        </UeElSettingGroup>
        <UeElSettingGroup title="旋转角度">
            <template #body>
                <UeElControlGroup v-if="value" :col-count="2">
                    <UeElNumberInput v-bind="inputParam" v-model:value="startAngle" :title="{ text: '起始' }" />
                    <UeElNumberInput v-bind="inputParam" v-model:value="endAngle" :title="{ text: '结束' }" />
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

const rotateAxisOptions = [
    { text: "X 轴", value: "x", icon: "icon-app-rotate-x" },
    { text: "Y 轴", value: "y", icon: "icon-app-rotate-y" },
    { text: "Z 轴", value: "z", icon: "icon-app-rotate-z" },
];

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
                { text: "顶部", value: "t", icon: "icon-app-axis-t" },
                { text: "底部", value: "b", icon: "icon-app-axis-b" },
            ];
            break;
        case "y":
            options = [
                { text: "左边", value: "l", icon: "icon-app-axis-l" },
                { text: "右边", value: "r", icon: "icon-app-axis-r" },
            ];
            break;
        case "z":
            options = [
                { text: "上左", value: "tl", icon: "icon-app-axis-t-l" },
                { text: "上中", value: "tc", icon: "icon-app-axis-t-c" },
                { text: "上右", value: "tr", icon: "icon-app-axis-t-r" },
                { text: "中左", value: "cl", icon: "icon-app-axis-c-l" },
                { text: "中心", value: "cc", icon: "icon-app-axis-c-c" },
                { text: "中右", value: "cr", icon: "icon-app-axis-c-r" },
                { text: "下左", value: "bl", icon: "icon-app-axis-b-l" },
                { text: "下中", value: "bc", icon: "icon-app-axis-b-c" },
                { text: "下右", value: "br", icon: "icon-app-axis-b-r" },
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
