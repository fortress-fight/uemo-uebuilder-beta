<template>
    <UeElSettingGroup title="吸附边距">
        <template #body>
            <UeElPaddingSetting v-bind="paddingInputParam" v-model:value="padding" />
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
    tips: [`吸附元素触发的偏移值可以通过吸附边距调节`],
}));
</script>
<style lang="scss" module>
//
</style>
