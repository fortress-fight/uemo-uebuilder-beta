<!--
 * @Description: 数字输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 23:28:03
-->
<template>
    <UeElTextInput
        ref="textInput"
        :class="$style['num-input']"
        :value="showValue"
        :placeholder="placeholder"
        :disable="disable"
        :rules="inputRules"
        :label="label"
        :padding-size="paddingSize"
        @keydown="inputKeyDown"
        @confirm="inputConfirm"
    >
        <template #before>
            <UeElNumberInputDragger :title="title" @start="onDraggerStart" @change="onDraggerChange">
                <template #default>
                    <slot name="dragger" />
                </template>
            </UeElNumberInputDragger>
        </template>
        <template v-if="showUnitSelect" #after>
            <UeElSelect :class="$style['unit-select']" v-model:value="unitValue" :options="props.units || []">
                <template #info="selectValue">
                    <div :class="$style['select-bar']" class="flex-auto flex items-center">
                        <div :class="$style['text-box']" class="flex flex-auto justify-center">
                            {{ selectValue.infoText }}
                        </div>
                        <div :class="$style['icon-box']" class="flex items-center justify-center">
                            <UeElIcon name="icon-xiajiantou" :size="15" />
                        </div>
                    </div>
                </template>
            </UeElSelect>
        </template>
    </UeElTextInput>
</template>

<script lang="ts" setup>
import type { UeElNumberInputBaseProps } from "./index";
import { numDiv, numClamp, numAddWithStep } from "@stone/uemo-editor-utils/lib/number";
import UeElNumberInputDragger from "./sub-components/Dragger.vue";
import { computed, ref } from "vue";

// 组件名称定义
defineOptions({ name: "UeElNumberInput" });

// Props 定义与默认值
const props = withDefaults(defineProps<UeElNumberInputBaseProps>(), {
    step: 1,
    hideUnit: false,
    placeholder: "",
    default: () => ({}),
    unitOptions: () => [],
});

// v-model 绑定
const valueRef = defineModel<string | number>("value", { required: false });

// 常量定义
const UNIT_REGEX = /([-+]?\d*\.?\d+)(px|fr|%|em|rem|vh|vw|vmin|vmax|ex|ch|cm|mm|in|pt|pc|deg)?/;
const ARROW_KEYS = ["ArrowUp", "ArrowDown"] as const;

/**
 * 解析数值字符串
 * @param value 数值字符串或数字
 * @returns 解析结果
 */
const parseValueString = (value: string | number | null | undefined): { num: number | undefined; unit: string } => {
    const result = value != null ? UNIT_REGEX.exec(value.toString()) : null;
    const { num: defaultNum, unit: defaultUnit } = props.default || {};

    const num = Number(result?.[1] ?? defaultNum);
    const parsedNum = isNaN(num) ? undefined : num;

    let unit = result?.[2] ?? "";
    if (props.units?.every((item) => item.value !== unit)) {
        unit = defaultUnit ?? props.units?.[0]?.value ?? "";
    }

    return { num: parsedNum, unit };
};

// 状态管理
const startValue = ref(0);

// 计算属性
const parsedValue = computed(() => {
    const { num, unit } = parseValueString(valueRef.value);
    const limit = Array.isArray(props.limit) ? props.limit : props.limit?.[unit];
    return { num, unit, limit };
});

const showValue = computed(() => {
    const inputValue = parsedValue.value.num?.toString() ?? "";
    return props.show?.input?.(parsedValue.value) ?? inputValue;
});

const unitValue = computed({
    get: () => parsedValue.value.unit,
    set: (value) => changeUnit(value ?? ""),
});

const showUnitSelect = computed(() => props.units?.length && !props.hideUnit);

// 输入规则
const inputRules: UE_EL_UTIL.InputRule[] = [
    (inputValue) => {
        const formatted = props.show?.output?.(inputValue || "") ?? inputValue;
        if (formatted === "" && !props.required) return true;
        return !isNaN(parseFloat(formatted));
    },
];

// 数值处理函数
const getStepForUnit = (unit: string): number => {
    return props.units?.find((item) => item.value === unit)?.step ?? props.step;
};

/**
 * 更新数值：根据限制范围更新并设置 valueRef
 * @param num 原始数值
 * @param unit 单位
 * @param limit 数值范围 [min, max]
 */
const updateValue = (num: number, unit: string, limit?: number[]): void => {
    const newNum = limit ? numClamp(num, limit[0], limit[1]) : num;
    valueRef.value = `${newNum}${unit}`;
};

// 事件处理函数
const onDraggerStart = (): void => {
    startValue.value = parsedValue.value.num ?? 0;
};

/**
 * 拖拽变更：根据拖拽值变化更新数值
 * @param delta 拖动量
 */
const onDraggerChange = (delta: number): void => {
    if (typeof delta !== "number") return;

    const step = getStepForUnit(parsedValue.value.unit);

    changeNumber(numAddWithStep(startValue.value, numDiv(delta, 10), step));
};

/**
 * 键盘事件：处理上下箭头按键实现数值增减
 * @param ev 键盘事件对象
 */
const inputKeyDown = (ev: KeyboardEvent): void => {
    if (!ARROW_KEYS.includes(ev.key as any)) return;
    const times = ev.key === "ArrowUp" ? (ev.shiftKey ? 10 : 1) : ev.shiftKey ? -10 : -1;
    const step = getStepForUnit(parsedValue.value.unit);

    changeNumber(numAddWithStep(parsedValue.value.num ?? 0, times, step));
};

/**
 * 输入确认：校验并更新数值
 * @param inputValue 输入框内容
 */
const inputConfirm = (inputValue: string): void => {
    const formatted = props.show?.output?.(inputValue || "") ?? inputValue;
    if (formatted === "" && !props.required) {
        valueRef.value = "";
        return;
    }
    changeNumber(parseFloat(formatted));
};

/**
 * 修改数值：解析、校验并更新数值
 * @param value 新的数值或字符串表示
 */
const changeNumber = (value: string | number): void => {
    const nValue = parseFloat(value.toString());
    if (isNaN(nValue)) return;
    const { unit, limit, num } = parsedValue.value;
    if (nValue === num) return;
    updateValue(nValue, unit, limit);
};

/**
 * 修改单位：根据传入单位更新数值或应用默认设置
 * @param unit 新单位
 */
const changeUnit = (unit: string): void => {
    const unitOption = props.units?.find((item) => item.value === unit);
    const limit = parsedValue.value.limit;

    if (unitOption?.default !== undefined) {
        updateValue(unitOption.default, unit, limit);
        return;
    }

    const currentNum = parsedValue.value.num;
    if (typeof currentNum !== "number" || isNaN(currentNum)) return;
    updateValue(currentNum, unit, limit);
};
</script>

<style lang="scss" module>
.num-input {
    --text-border-color: #{color(var(--ue-border-color), 0)};
    &:hover {
        .icon-box {
            opacity: 1;
        }
        .text-box {
            opacity: 0;
        }
    }
}
.select-bar {
    font-size: 12px;
    line-height: 26px;

    position: relative;

    padding: 0 4px;

    cursor: pointer;
    .text-box {
        min-width: 18px;
    }
    .icon-box {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;

        width: 26px;

        opacity: 0;
        color: color(var(--ue-font-color));
    }
}
</style>
