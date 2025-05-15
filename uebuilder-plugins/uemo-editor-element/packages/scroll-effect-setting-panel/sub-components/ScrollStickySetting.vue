<template>
    <UeElSettingGroup :title="t('SCROLL_STICKY_SETTING_PADDING')">
        <UeElPaddingSetting v-bind="paddingInputParam" v-model:value="padding" />
    </UeElSettingGroup>
    <!-- 提示信息 -->
    <UeElSettingGroup :title="t('UNIT_TIP')" is-last>
        <UeElTipGroup v-bind="tipMessage" />
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { ScrollStickyOptions } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

import { defaultScrollOptions } from "../utils/helper";

defineOptions({ name: "ScrollStickySetting", inheritAttrs: false });

const { t } = useI18n();
const valueRef = defineModel<ScrollStickyOptions>("value", { required: true });

const paddingInputParam = ref<UE_EL_COMPONENT.UeElPaddingSettingProps>({
    type: "y",
    units: [
        { value: "px", text: "px", default: 0 },
        { value: "vh", text: "vh", default: 0 },
    ],
    limit: { px: [0, 500], vh: [0, 20] },
});

const padding = useDefineObjectModel(valueRef, {
    get: (modelValue) => modelValue.padding || defaultScrollOptions.sticky.padding,
    set(value, modelValue) {
        modelValue.padding = value;
        return modelValue;
    },
});

/**
 * 提示信息配置
 */
const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => ({
    tips: [t("SCROLL_STICKY_TIP_1")],
}));
</script>
<style lang="scss" module>
//
</style>
