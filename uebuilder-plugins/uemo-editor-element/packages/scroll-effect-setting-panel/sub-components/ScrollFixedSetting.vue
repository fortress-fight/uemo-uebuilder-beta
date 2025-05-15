<template>
    <UeElSettingGroup :title="t('SCROLL_FIXED_Y_OFFSET')">
        <template #body>
            <UeElNumberInput v-bind="moveYInputParam" v-model:value="moveY" />
        </template>
    </UeElSettingGroup>
    <!-- 提示信息 -->
    <UeElSettingGroup :title="t('UNIT_TIP')" is-last>
        <template #body>
            <UeElTipGroup v-bind="tipMessage" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { ScrollFixedOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ name: "ScrollFixedSetting", inheritAttrs: false });

const { t } = useI18n();
const valueRef = defineModel<ScrollFixedOptions>("value", { required: true });

const moveYInputParam = computed<UE_EL_COMPONENT.UeElNumberInputProps>(() => ({
    title: { text: t("SCROLL_FIXED_Y_OFFSET") },
    limit: [-500, 500],
}));

const moveY = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.moveY || defaultScrollOptions.fixed.moveY,
    set(value, modelValue) {
        modelValue.moveY = value;
        return modelValue;
    },
});
/**
 * 提示信息配置
 */
const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => ({
    tips: [t("SCROLL_FIXED_TIP_1"), t("SCROLL_FIXED_TIP_2")],
}));
</script>
<style lang="scss" module>
//
</style>
