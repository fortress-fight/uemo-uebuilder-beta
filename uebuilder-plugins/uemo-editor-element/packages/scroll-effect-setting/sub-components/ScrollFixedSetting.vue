<template>
    <UeElSettingGroup title="纵向偏移">
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

const moveYInputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    title: { text: "纵向偏移" },
    placeholder: "请输入纵向偏移值",
    limit: [-500, 500],
});

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
    tips: [
        "1. 锁定的元素会定位在屏幕中间，可以通过偏移值调节相对位置",
        "2. 为了更好的展示，建议开启布局或板块的裁切功能。",
    ],
}));
</script>
<style lang="scss" module>
//
</style>
