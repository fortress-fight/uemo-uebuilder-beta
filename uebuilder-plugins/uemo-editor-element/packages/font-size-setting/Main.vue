<!--
 * @Description: 字号控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-17 11:45:50
-->
<template>
    <UeElControlGroup
        :title="t('UNIT_FONT_SIZE')"
        :class="$style['font-size-setting']"
        class="w-full"
        :col-count="selectedValue === '' ? 2 : 1"
    >
        <UeElSelect v-model:value="selectedValue" :title="t('UNIT_FONT_SIZE')" :options="options" valueAlign="right" />
        <UeElNumberInput v-if="selectedValue === ''" v-bind="inputParam" v-model:value="valueRef" />
    </UeElControlGroup>
</template>
<script lang="ts" setup>
import type { UeElFontSizeSettingBaseProps } from "./index";

defineOptions({ name: "UeElFontSizeSetting" });

const { t } = useI18n();

const _props = withDefaults(defineProps<UeElFontSizeSettingBaseProps>(), {});

const valueRef = defineModel<string>("value", { required: true });
const selectedValue = computed({
    get() {
        if (valueRef.value.endsWith("vw")) {
            return "";
        }
        return valueRef.value;
    },
    set(value) {
        valueRef.value = value;
    },
});

const options = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { value: "", text: t("UNIT_CUSTOM") },
    { value: "12px", text: "12px" },
    { value: "14px", text: "14px" },
    { value: "16px", text: "16px" },
    { value: "18px", text: "18px" },
    { value: "20px", text: "20px" },
    { value: "22px", text: "22px" },
    { value: "24px", text: "24px" },
    { value: "26px", text: "26px" },
    { value: "28px", text: "28px" },
    { value: "30px", text: "30px" },
    { value: "32px", text: "32px" },
    { value: "34px", text: "34px" },
    { value: "36px", text: "36px" },
    { value: "38px", text: "38px" },
    { value: "40px", text: "40px" },
    { value: "48px", text: "48px" },
    { value: "60px", text: "60px" },
    { value: "72px", text: "72px" },
    { value: "84px", text: "84px" },
    { value: "94px", text: "94px" },
    { value: "128px", text: "128px" },
]);

const inputParam = computed<Partial<UE_EL_COMPONENT.UeElNumberInputProps>>(() => ({
    limit: [0.6, 20],
    units: [{ value: "vw", text: "vw", default: 10, step: 0.1 }],
    show: {
        input(current) {
            return !current.num ? t("UNIT_DEFAULT") : undefined;
        },
    },
}));
</script>
<style lang="scss" module>
.font-size-setting {
    //
}
</style>
