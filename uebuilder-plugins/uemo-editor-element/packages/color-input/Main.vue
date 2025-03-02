<!--
 * @Description: 颜色输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 18:56:32
-->
<template>
    <UeElTextInput
        v-if="colorType === 'color'"
        :class="$style['color-input']"
        :value="hex"
        :rules="hexRules"
        :disable="disable"
        padding-size="level2"
        ref="colorRootRef"
        @confirm="hex = $event"
    >
        <template #before>
            <div
                :class="$style['color-box']"
                class="flex items-center justify-center cursor-pointer"
                @click="triggerColorInput"
            >
                <div :class="$style['inner-box']" :style="{ '--background': useColor }"></div>
            </div>
        </template>
        <template #after v-if="!disableOpacity">
            <UeElNumberInput
                v-bind="opacityParam"
                v-model:value="opacity"
                :class="$style['opacity-input']"
                :hide-unit="true"
            />
        </template>
    </UeElTextInput>
    <div
        v-else-if="colorType === 'linearGradient' || colorType === 'radialGradient'"
        ref="gradientRootRef"
        :title="t('UNIT_LINEAR_GRADIENT')"
        :class="$style['gradient-color-input']"
        @click="triggerColorInput"
    >
        <div :class="$style['setting-bar']" class="flex cursor-pointer items-center">
            <div
                :class="$style['color-box']"
                class="flex items-center justify-center cursor-pointer"
                :style="{ opacity: independentOpacityRef }"
            >
                <div :class="$style['inner-box']" :style="{ '--background': useColor }"></div>
            </div>
            <div :class="$style['title']">{{ t("UNIT_LINEAR_GRADIENT") }}</div>
        </div>
        <UeElNumberInput
            v-if="independentOpacityControlEnabled"
            v-bind="opacityParam"
            v-model:value="independentOpacityRef"
            :class="$style['opacity-input']"
            :hide-unit="true"
        />
    </div>
</template>
<script lang="ts" setup>
import type { UeElColorInputBaseProps } from "./index";

import { numDiv, numTimes } from "@stone/uemo-editor-utils/lib/number";
import Color, { isColor } from "@stone/uemo-editor-utils/lib/color";

defineOptions({ name: "UeElColorInput" });

const { t } = useI18n();
const prop = withDefaults(defineProps<UeElColorInputBaseProps>(), {
    type: "color",
    disableOpacity: false,
});
const emit = defineEmits<{ (ev: "trigger", value: string): void }>();

const valueRef = defineModel<string>("value", { required: false });
const independentOpacityRef = defineModel<number | string>("opacity", { required: false });
const independentOpacityControlEnabled = computed(() => {
    return !prop.disableOpacity && typeof independentOpacityRef.value !== "undefined";
});

const colorRootRef = useTemplateRef("colorRootRef");
const gradientRootRef = useTemplateRef("gradientRootRef");
const rootDomRef = computed(() => {
    return colorRootRef.value?.$el || gradientRootRef.value;
});

const useColor = computed({
    get() {
        return valueRef.value || prop.defaultValue || "#000000";
    },
    set(value) {
        if (prop.disableOpacity) {
            valueRef.value = Color(value).alpha(1).rgb().toString();
        } else {
            valueRef.value = value;
        }
    },
});

// 使用常量定义颜色类型,提高代码可维护性
const COLOR_TYPES = {
    COLOR: "color",
    LINEAR_GRADIENT: "linearGradient",
    RADIAL_GRADIENT: "radialGradient",
} as const;

// 优化颜色类型判断逻辑
const colorType = computed(() => {
    const colorType = prop.type;

    // 非mixin类型直接返回
    if (colorType !== "mixin") {
        return colorType || COLOR_TYPES.COLOR;
    }

    // mixin类型需要解析color值
    const colorValue = useColor.value;
    if (colorValue.includes("linear-gradient")) {
        return COLOR_TYPES.LINEAR_GRADIENT;
    }
    if (colorValue.includes("radial-gradient")) {
        return COLOR_TYPES.RADIAL_GRADIENT;
    }
    return COLOR_TYPES.COLOR;
});

const hexRules = [
    (value: string) => {
        if (!isColor("#" + value)) {
            return t("COLOR_INPUT_TIP_NOT_CORRECT");
        }
        return true;
    },
];
const hex = computed<string>({
    get() {
        return Color(useColor.value.trim()).hex().slice(1);
    },
    set(value) {
        let newColor = "";
        newColor = Color("#" + value)
            .alpha(opacity.value)
            .rgb()
            .toString();
        useColor.value = newColor;
    },
});

const opacityParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    required: true,
    step: 0.01,
    limit: [0, 1],
    show: {
        input(value) {
            return numTimes(value.num ?? 1, 100) + "%";
        },
        output(value) {
            const num = parseFloat(value);
            if (!isNaN(num)) {
                return numDiv(num, 100).toString();
            }
            return undefined;
        },
    },
});

const opacity = computed<number>({
    get() {
        return Color(useColor.value.trim()).alpha();
    },
    set(value) {
        const newVal = Color("#" + hex.value)
            .alpha(value)
            .rgb();

        useColor.value = newVal.toString();
    },
});

function triggerColorInput() {
    emit("trigger", useColor.value);
}

defineExpose({ rootDomRef });
</script>
<style lang="scss" module>
.color-input {
    grid-template-columns: auto 1fr auto;
    &:hover,
    &:focus-within {
        .opacity-input {
            border-color: color(var(--ue-border-color));
        }
    }
    .opacity-input {
        --text-border-color: transparent !important;
        width: 50px;

        border-width: 0;
        border-left: 1px solid transparent;
        border-radius: 0;
    }
}
.color-box {
    min-width: 0;
    height: 100%;
    padding: 0 var(--ue-editor-row-space--lv1);
    .inner-box {
        @include square(16px);
        position: relative;

        overflow: hidden;

        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
        background-color: #fff;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
        background-size: 6px 6px;
        &::after {
            @include ab-cover;
            content: "";

            background: var(--background);
        }
    }
}
.gradient-color-input {
    --text-border-color: transparent;
    --text-input-padding: 0 var(--ue-editor-row-space--lv1) 0 2px;
    position: relative;
    z-index: 10;

    display: grid;
    overflow: hidden;

    border: 1px solid var(--text-border-color);
    border-radius: var(--ue-border-radius--lv1);

    grid-template-columns: auto minmax(0, 1fr) auto;
    .setting-bar {
        font-size: 12px;
        line-height: 26px;

        width: auto;
        min-width: 0;
        padding: var(--text-input-padding);

        cursor: default;

        color: color(var(--ue-font-color--deeper));
        border-width: 0;
    }
    &:hover,
    &:focus-within {
        --text-border-color: #{color(var(--ue-border-color))};
        .opacity-input {
            border-color: color(var(--ue-border-color));
        }
    }
    .opacity-input {
        --text-border-color: transparent !important;
        width: 50px;

        border-width: 0;
        border-left: 1px solid transparent;
        border-radius: 0;
    }
}
</style>
