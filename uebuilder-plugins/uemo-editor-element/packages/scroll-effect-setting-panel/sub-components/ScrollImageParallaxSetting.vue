<template>
    <UeElSettingGroup :title="t('SCROLL_IMAGE_PARALLAX_SETTING_MODE')">
        <UeElSelect
            v-model:value="scrollHeightType"
            :options="options"
            :title="t('SCROLL_IMAGE_PARALLAX_SETTING_MODE')"
        />
    </UeElSettingGroup>
    <!-- 提示信息 -->
    <UeElSettingGroup :title="t('UNIT_TIP')" is-last>
        <UeElTipGroup v-bind="tipMessage" />
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { ScrollImageParallaxOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ name: "ScrollImageParallaxSetting", inheritAttrs: false });

const { t } = useI18n();
const valueRef = defineModel<ScrollImageParallaxOptions>("value", { required: true });

const options = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => [
    { text: t("SCROLL_IMAGE_PARALLAX_MODE_IMAGE"), value: "image" },
    { text: t("SCROLL_IMAGE_PARALLAX_MODE_CONTAINER"), value: "container" },
]);

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
    tips: [t("SCROLL_IMAGE_PARALLAX_TIP_1"), t("SCROLL_IMAGE_PARALLAX_TIP_2")],
}));
</script>
<style lang="scss" module>
//
</style>
