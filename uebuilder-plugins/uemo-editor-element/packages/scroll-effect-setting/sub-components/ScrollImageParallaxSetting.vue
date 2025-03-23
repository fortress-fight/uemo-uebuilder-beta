<template>
    <UeElSettingGroup title="高度差模式">
        <template #body>
            <UeElSelect v-model:value="scrollHeightType" :options="options" />
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
import type { ScrollImageParallaxOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ name: "ScrollImageParallaxSetting", inheritAttrs: false });

const { t } = useI18n();
const valueRef = defineModel<ScrollImageParallaxOptions>("value", { required: true });

const options = [
    { text: "常规", value: "parallax-normal" },
    { text: "缩小容器", value: "parallax" },
    { text: "放大图片", value: "parallax-image" },
];

const scrollHeightType = useDefineObjectModel(valueRef, {
    get() {
        return valueRef.value.mode || defaultScrollOptions["image-parallax"].mode;
    },
    set(v, modelValue) {
        modelValue.mode = v;
        return modelValue;
    },
});
/**
 * 提示信息配置
 */
const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => ({
    tips: [
        "1. 由于视差特性需要图片与其外层容器的存在高度差，所以请选择 “放大图片” 或 “缩小容器” 来创造高度差。",
        "2. 使用常规模式配合图片比例，需要图片高于显示区域，才能创建高度差。不然图片会被动放大。",
    ],
}));
</script>
<style lang="scss" module>
//
</style>
