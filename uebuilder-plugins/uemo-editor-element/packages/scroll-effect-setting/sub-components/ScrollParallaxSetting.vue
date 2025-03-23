<template>
    <UeElSettingGroup title="速度差">
        <template #body>
            <UeElNumberInput v-bind="speedInputParam" v-model:value="speed" />
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
import type { ScrollParallaxOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ name: "ScrollParallaxSetting", inheritAttrs: false });

const { t } = useI18n();
const valueRef = defineModel<ScrollParallaxOptions>("value", { required: true });

const speedInputParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    title: { text: "速度差" },
    placeholder: "请输入速度差",
    limit: [-100, 100],
});

const speed = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.speed || defaultScrollOptions.parallax.speed,
    set(value, modelValue) {
        modelValue.speed = value;
        return modelValue;
    },
});

/**
 * 提示信息配置
 */
const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => ({
    tips: ["速度差大于0为加速，小于0为减速"],
}));
</script>
<style lang="scss" module>
//
</style>
