<template>
    <UeElEditorGroup>
        <ColorPointBar
            type="linear"
            ref="colorPointBar"
            :points="currentColorPoints"
            :editor-point-id="editorColorPointId"
            @update:points="currentColorPoints = $event"
            @update-editor-point-id="editorColorPointId = $event"
        />
        <UeElControlGroup
            oper-type="remove"
            :oper-type-tip="t('COLOR_PICKER_REMOVE_POINT')"
            :col-count="2"
            @remove="removeCurrentPoint"
        >
            <UeElNumberInput
                v-bind="positionParam"
                v-model:value="editorColorPointPosition"
                :class="$style['position-input']"
                :hide-unit="true"
            />
            <UeElNumberInput
                v-bind="angleInputParam"
                v-model:value="currentAngle"
                :class="$style['position-input']"
                :hide-unit="true"
            />
        </UeElControlGroup>
    </UeElEditorGroup>
    <UeElColorPicker
        ref="colorPicker"
        v-model:value="editorColorPointColor"
        :class="$style['color-picker']"
        :disable-opacity="disableOpacity"
    />
</template>
<script lang="ts" setup>
import type { GradientPoint } from "../index";

import { guid } from "@stone/uemo-editor-utils/lib/guid";
import { parseLinearGradient } from "@stone/uemo-editor-utils/lib/css-gradient-parser";

import ColorPointBar from "./ColorPointBar.vue";

const { t } = useI18n();
const prop = withDefaults(defineProps<{ defaultValue: string; disableOpacity: boolean }>(), {});
const valueRef = defineModel<string>("value", { required: true });

const colorPicker = useTemplateRef("colorPicker");
const colorPointBar = useTemplateRef("colorPointBar");

const editorColorPointId = ref<string>();
const currentColorPoints = ref<GradientPoint[]>([]);
const currentAngle = ref<string>("");

const positionParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    required: true,
    title: { text: t("COLOR_PICKER_POINT_POS") },
    step: 1,
    limit: [0, 100],
    show: { input: (value) => value.num + "%" },
}));

const angleInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    required: true,
    title: { text: t("UNIT_ANGLE") },
    step: 1,
    limit: [0, 365],
    show: { input: (value) => value.num + "°" },
}));

const lastValue = ref<string>("");
const useValue = computed({
    get() {
        try {
            if (!valueRef.value?.includes("linear-gradient")) {
                throw new Error(t("COLOR_PICKER_TIP_NOT_SUPPORTED"));
            }
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
        return `linear-gradient(${currentAngle.value}, ${colorPointBar.value?.calcPointerStyle(
            currentColorPoints.value
        )})`;
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
    if (!value.includes("linear-gradient")) {
        return;
    }

    const parseValue = parseLinearGradient(value);

    let angle = "180deg";

    if (useValue.value.includes("linear-gradient") && parseValue.orientation?.type === "angular") {
        angle = parseValue.orientation.value.value + "deg";
    }

    const colorPoints: GradientPoint[] = [];

    parseValue.stops.map((item) => {
        let position = "";
        if (item.offset) {
            position = item.offset.value + item.offset.unit;
        }

        colorPoints.push({ id: guid(5), color: item.color, position });
    });

    editorColorPointId.value = colorPoints[0].id;

    currentAngle.value = angle;
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
