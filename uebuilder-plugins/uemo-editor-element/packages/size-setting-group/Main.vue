<!--
 * @Description: 尺寸调节组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 18:19:07
-->
<template>
    <UeElSettingGroup :class="$style['size-setting-group']" v-bind="settingGroup" @trigger="handleTrigger">
        <template #body v-if="valueRef">
            <UeElControlGroup :col-count="2">
                <UeElSelect v-bind="sizeModeOptions" v-model:value="sizeMode" />
                <UeElNumberInput v-bind="widthInputProps" :title="{ text: t('UNIT_WIDTH') }" v-model:value="width" />
            </UeElControlGroup>
            <UeElControlGroup v-if="sizeMode === 'ratio'">
                <UeElSelect v-bind="ratioOptions" v-model:value="ratio" />
            </UeElControlGroup>
            <UeElControlGroup v-if="sizeMode === 'height'">
                <UeElNumberInput v-bind="heightInputProps" v-model:value="height" />
            </UeElControlGroup>
            <UeElControlGroup v-if="sizeMode === 'customRatio'" :col-count="2">
                <UeElNumberInput v-bind="customRatioInputParam" v-model:value="wRatio" :title="{ text: t('UNIT_X') }" />
                <UeElNumberInput v-bind="customRatioInputParam" v-model:value="hRatio" :title="{ text: t('UNIT_Y') }" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElSizeSettingGroupBaseProps, UeElSizeSettingGroupValue } from "./index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeElSizeSettingGroup" });
const _props = withDefaults(defineProps<UeElSizeSettingGroupBaseProps>(), {
    widthInputProps: () => ({
        limit: { px: [20, Infinity], "%": [5, 100] },
        units: [
            { value: "px", text: "px", default: 200 },
            { value: "%", text: "%", default: 100 },
        ],
    }),
});

const valueRef = defineModel<UeElSizeSettingGroupValue>("value", {
    required: false,
});

const { t } = useI18n();

// #region size

const settingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("UNIT_SIZE"),
        oper: !valueRef.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const sizeModeOptions = computed<UE_EL_COMPONENT.UeElSelectProps>(() => {
    return {
        title: t("UNIT_MODE"),
        options: [
            { value: "auto", text: t("UNIT_DEFAULT") },
            { value: "ratio", text: t("UNIT_FIXED_RATIO") },
            { value: "customRatio", text: t("UNIT_CUSTOM_RATIO") },
            { value: "height", text: t("UNIT_CUSTOM_HEIGHT") },
        ],
    };
});

const sizeMode = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue?.mode || (ratio.value ? "ratio" : "auto"),
    set: (value, modelValue) => {
        switch (value) {
            case "auto":
                modelValue = { mode: value, height: undefined, ratio: undefined };
                break;
            case "ratio":
                modelValue = { mode: value, height: undefined, ratio: "1-1" };
                break;
            case "height":
                modelValue = { mode: value, height: "200px", ratio: undefined };
                break;
            case "customRatio":
                modelValue = { mode: value, height: undefined, ratio: "1-1" };
                break;

            default:
                break;
        }

        return modelValue;
    },
});

// #endregion

// #region width

const width = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue?.width || "100%",
    set: (value, modelValue) => {
        modelValue.width = value;
        return modelValue;
    },
});

// #endregion

// #region ratio

const ratioOptions = computed<UE_EL_COMPONENT.UeElSelectProps>(() => {
    return {
        title: t("UNIT_RATIO"),
        options: [
            { value: "1-1", text: "1:1" },
            { value: "3-4", text: "3:4" },
            { value: "4-3", text: "4:3" },
            { value: "9-16", text: "9:16" },
            { value: "16-9", text: "16:9" },
        ],
    };
});

const ratio = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue?.ratio || "auto",
    set: (value, modelValue) => {
        modelValue.ratio = value;
        return modelValue;
    },
});

// #endregion

// #region height

const heightInputProps: UE_EL_COMPONENT.UeElNumberInputProps = {
    limit: { px: [20, Infinity], vh: [5, 100] },
    units: [
        { value: "px", text: "px", default: 200 },
        { value: "vh", text: "vh", default: 20 },
    ],
    title: { text: t("UNIT_HEIGHT") },
};

const height = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue?.height || "200px",
    set: (value, modelValue) => {
        modelValue.height = value;
        return modelValue;
    },
});

// #endregion

// #region customRatio

const customRatioInputParam: UE_EL_COMPONENT.UeElNumberInputProps = {
    limit: [1, 20],
    step: 1,
};

const wRatio = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue?.ratio?.split("-")[0] ?? ["1", "1"][0],
    set: (value, modelValue) => {
        modelValue.ratio = `${value}-${hRatio.value}`;
        return modelValue;
    },
});

const hRatio = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue?.ratio?.split("-")[1] ?? ["1", "1"][1],
    set: (value, modelValue) => {
        modelValue.ratio = `${wRatio.value}-${value}`;
        return modelValue;
    },
});

// #endregion

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            valueRef.value = { width: "100%", mode: "auto", height: undefined };
            break;

        case "remove":
            valueRef.value = undefined;
            break;

        default:
            break;
    }
};
</script>
<style lang="scss" module>
.size-setting-group {
    //
}
</style>
