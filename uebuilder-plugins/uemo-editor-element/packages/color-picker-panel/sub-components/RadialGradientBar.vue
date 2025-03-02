<template>
    <UeElEditorGroup>
        <ColorPointBar
            type="radial"
            ref="colorPointBar"
            :points="currentColorPoints"
            :editor-point-id="editorColorPointId"
            @update:points="currentColorPoints = $event"
            @update-editor-point-id="editorColorPointId = $event"
        />
        <UeElControlGroup oper-type="remove" oper-type-tip="移除当前点" :col-count="1" @remove="removeCurrentPoint">
            <UeElNumberInput v-bind="positionParam" v-model:value="editorColorPointPosition" :hide-unit="true" />
        </UeElControlGroup>
    </UeElEditorGroup>
    <UeElColorPicker
        ref="colorPicker"
        v-model:value="editorColorPointColor"
        :class="$style['color-picker']"
        :disable-opacity="disableOpacity"
    />
    <UeElEditorGroup>
        <UeElControlGroup oper-type="none" :hideOper="true" :col-count="2">
            <UeElNumberInput v-bind="xPosParam" v-model:value="currentXPos" />
            <UeElNumberInput v-bind="yPosParam" v-model:value="currentYPos" />
            <UeElNumberInput v-bind="widthParam" v-model:value="currentWidth" />
            <UeElNumberInput v-bind="heightParam" v-model:value="currentHeight" />
        </UeElControlGroup>
    </UeElEditorGroup>
</template>
<script lang="ts" setup>
import type { GradientPoint } from "../index";

import { guid } from "@stone/uemo-editor-utils/lib/guid";
import { parseRadialGradient } from "@stone/uemo-editor-utils/lib/css-gradient-parser";

import ColorPointBar from "./ColorPointBar.vue";

const prop = withDefaults(defineProps<{ defaultValue: string; disableOpacity: boolean }>(), {});
const valueRef = defineModel<string>("value", { required: true });

const colorPicker = useTemplateRef("colorPicker");
const colorPointBar = useTemplateRef("colorPointBar");

const editorColorPointId = ref<string>();
const currentColorPoints = ref<GradientPoint[]>([]);
const currentXPos = ref<string>();
const currentYPos = ref<string>();
const currentWidth = ref<string>();
const currentHeight = ref<string>();

const positionParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    required: true,
    title: { text: "位置" },
    step: 1,
    limit: [0, 100],
    show: { input: (value) => value.num + "%" },
});
const xPosParam = ref<Omit<UE_EL_COMPONENT.UeElNumberInputProps, "value">>({
    required: true,
    title: { text: "横向" },
    step: 1,
    limit: { "%": [-Infinity, Infinity] },
    units: [{ text: "%", value: "%", default: 50 }],
});
const yPosParam = ref<Omit<UE_EL_COMPONENT.UeElNumberInputProps, "value">>({
    required: true,
    title: { text: "纵向" },
    step: 1,
    limit: { "%": [-110, 110] },
    units: [{ text: "%", value: "%", default: 50 }],
});
const widthParam = ref<Omit<UE_EL_COMPONENT.UeElNumberInputProps, "value">>({
    required: true,
    title: { text: "宽度" },
    step: 1,
    limit: { px: [0, Infinity], "%": [0, Infinity] },
    units: [
        { text: "px", value: "px", default: 500 },
        { text: "%", value: "%", default: 100 },
    ],
});
const heightParam = ref<Omit<UE_EL_COMPONENT.UeElNumberInputProps, "value">>({
    required: true,
    title: { text: "高度" },
    step: 1,
    limit: { px: [0, Infinity], "%": [0, Infinity] },
    units: [
        { text: "px", value: "px", default: 500 },
        { text: "%", value: "%", default: 100 },
    ],
});
const lastValue = ref<string>("");
const useValue = computed({
    get() {
        try {
            if (!valueRef.value?.includes("radial-gradient")) throw new Error("暂不支持非径向渐变");
            return valueRef.value;
        } catch (error) {
            console.error(error instanceof Error ? error : new Error(String(error)));
            return prop.defaultValue;
        }
    },
    set(value) {
        lastValue.value = value;
        valueRef.value = value;
    },
});
watch(
    () => {
        return `radial-gradient(${currentWidth.value} ${currentHeight.value} ellipse at ${currentXPos.value} ${
            currentYPos.value
        }, ${colorPointBar.value?.calcPointerStyle(currentColorPoints.value)})`;
    },
    (value) => {
        useValue.value = value;
    }
);
watch(useValue, (value) => {
    if (value === lastValue.value) return;
    updateGradientColorInfo(value);
});

const editorColorPointPosition = computed({
    get() {
        if (!useValue.value) return "0";
        const selectPointer = currentColorPoints.value.find((item) => {
            return item.id === editorColorPointId.value;
        });
        return selectPointer?.position || "0";
    },
    set(value: string) {
        colorPointBar.value?.changePosition(value);
    },
});

/**
 * @description: 移除当前点
 */
function removeCurrentPoint() {
    colorPointBar.value?.removePoint();
}

/**
 * @description: 更新渐变颜色信息
 */
function updateGradientColorInfo(value: string) {
    if (!value.includes("radial-gradient")) {
        return;
    }

    const gradientParam = parseRadialGradient(value);
    const colorPoints: { color: string; position: string; id: string }[] = [];

    gradientParam.stops.map((item) => {
        let position = "";
        if (item.offset) {
            position = item.offset.value + item.offset.unit;
        }

        colorPoints.push({ id: guid(5), color: item.color, position });
    });

    editorColorPointId.value = colorPoints[0].id;

    const xParam = gradientParam.position.x;
    const yParam = gradientParam.position.y;

    if (xParam.type === "length") {
        currentXPos.value = xParam.value.value + xParam.value.unit;
    } else {
        currentXPos.value = xParam.value;
    }

    if (yParam.type === "length") {
        currentYPos.value = yParam.value.value + yParam.value.unit;
    } else {
        currentYPos.value = yParam.value;
    }

    const widthParam = gradientParam.size[0];
    const heightParam = gradientParam.size[1];

    if (widthParam.type === "length") {
        currentWidth.value = widthParam.value.value + widthParam.value.unit;
    } else {
        currentWidth.value = "100%";
    }

    if (heightParam?.type === "length") {
        currentHeight.value = heightParam.value.value + heightParam.value.unit;
    } else {
        currentHeight.value = "100%";
    }

    currentColorPoints.value = colorPoints;
}

const editorColorPointColor = computed({
    get() {
        if (!useValue.value) return "#000000";
        const selectPointer = currentColorPoints.value.find((item) => {
            return item.id === editorColorPointId.value;
        });
        return selectPointer?.color || "#000000";
    },
    set(value: string) {
        changeColor(value);
    },
});

watch(
    () => editorColorPointId.value,
    () => {
        const point = currentColorPoints.value.find((item) => {
            return item.id === editorColorPointId.value;
        });
        if (point?.color) {
            colorPicker.value?.changeOldColor(point.color);
        }
    }
);

function changeColor(color: string | number) {
    currentColorPoints.value.some((item) => {
        if (item.id !== editorColorPointId.value) return false;
        item.color = color.toString();
        return true;
    });
}

onBeforeMount(() => {
    updateGradientColorInfo(useValue.value);
});
</script>
<style lang="scss" module>
//
</style>
