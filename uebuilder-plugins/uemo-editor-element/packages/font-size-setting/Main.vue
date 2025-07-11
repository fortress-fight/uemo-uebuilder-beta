<!--
 * @Description: 字号控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-07-11 10:24:15
-->
<template>
    <UeElControlGroup :class="$style['font-size-setting']" class="w-full" :col-count="selectedValue === '' ? 2 : 1">
        <UeElSelect v-model:value="selectedValue" :title="t('UNIT_SIZE')" :options="options" valueAlign="right" />
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
        if (!valueRef.value || valueRef.value.endsWith("vw")) {
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
    ...Object.entries(fontSizePreset).map(([key, value]) => ({
        value: key,
        text: `${value.desktop} - ${value.mobile}`,
    })),
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
