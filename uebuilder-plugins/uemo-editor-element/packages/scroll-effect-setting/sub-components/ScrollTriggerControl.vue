<template>
    <UeElSettingGroup :class="$style['scroll-trigger-mode']" title="运动模式">
        <template #body>
            <UeElControlGroup :col-count="showFiled.length > 2 && isAutoPlay ? 2 : 1">
                <UeElSelect
                    v-model:value="triggerMode"
                    :disable="testFiledDisable('mode')"
                    title="效果"
                    :options="modeOption"
                />
                <template v-if="isAutoPlay">
                    <UeElNumberInput
                        v-if="showFiled.includes('delay')"
                        v-bind="timeInputParam"
                        v-model:value="delay"
                        :disable="testFiledDisable('delay')"
                        :title="{ text: '延时' }"
                    />
                    <UeElNumberInput
                        v-if="showFiled.includes('duration')"
                        v-bind="timeInputParam"
                        v-model:value="duration"
                        :disable="testFiledDisable('duration')"
                        :title="{ text: '时间' }"
                    />
                    <UeElSelect
                        v-if="showFiled.includes('ease') && false"
                        v-model:value="ease"
                        title="运动"
                        :class="$style['ease-control']"
                        :disable="testFiledDisable('ease')"
                        :options="easeOptions"
                    />
                </template>
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

type TypeTriggerFiled = "mode" | "delay" | "duration" | "ease";

const props = defineProps<{
    value: UeElScrollEffectSettingOptions;
    disable?: boolean;
    hideField?: TypeTriggerFiled[];
    disableField?: TypeTriggerFiled[];
}>();
const valueRef = defineModel<UeElScrollEffectSettingOptions>("value", { required: true });

const fields: TypeTriggerFiled[] = ["mode", "delay", "duration", "ease"];

const modeOption = [
    { text: "线性执行", value: "" },
    { text: "自动执行", value: "enter-leaver" },
];

/**
 * 显示的字段
 */
const showFiled = computed(() => {
    return fields.filter((field) => !props.hideField?.includes(field));
});

/**
 * 是否允许是自动执行
 */
const isAutoPlay = computed(() => {
    return valueRef.value.triggerMode === "enter-leaver";
});

const triggerMode = useDefineObjectModel(valueRef, {
    get: (modeValue) => modeValue.triggerMode || "",
    set: (value, modeValue) => {
        if (value === "enter-leaver") {
            modeValue.triggerMode = value;
            return modeValue;
        }
        return { triggerMode: value, triggerDelay: undefined, triggerDuration: undefined, triggerEase: undefined };
    },
});

const timeInputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    limit: [0, 20],
    step: 0.1,
    required: true,
    default: { num: 0 },
    show: { input: (v) => v.num + "s" },
});

const easeOptions = [
    { text: "Linear", value: "none" },
    { text: "Power1.EaseIn", value: "power1.in" },
    { text: "Power1.EaseOut", value: "power1.out" },
    { text: "Power1.EaseInOut", value: "power1.inOut" },
    { text: "Power2.EaseIn", value: "power2.in" },
    { text: "Power2.EaseOut", value: "power2.out" },
    { text: "Power2.EaseInOut", value: "power2.inOut" },
    { text: "Power3.EaseIn", value: "power3.in" },
    { text: "Power3.EaseOut", value: "power3.out" },
    { text: "Power3.EaseInOut", value: "power3.inOut" },
];

const ease = useDefineObjectModel(valueRef, {
    get: (modeValue) => modeValue.triggerEase || "power3.out",
    set: (value, modeValue) => {
        modeValue.triggerEase = value;
        return modeValue;
    },
});

const delay = useDefineObjectModel(valueRef, {
    get: (modeValue) => modeValue.triggerDelay || "0",
    set: (value, modeValue) => {
        modeValue.triggerDelay = value;
        return modeValue;
    },
});

const duration = useDefineObjectModel(valueRef, {
    get: (modeValue) => modeValue.triggerDuration || "1",
    set: (value, modeValue) => {
        modeValue.triggerDuration = value;
        return modeValue;
    },
});

/**
 * 测试字段是否可用
 */
const testFiledDisable = (field: TypeTriggerFiled) => {
    return props.disable || !!props.disableField?.includes(field);
};
</script>
<style lang="scss" module>
.scroll-trigger-mode {
    .ease-control {
        grid-column: 1 / -1;
    }
}
</style>
