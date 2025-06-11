<template>
    <UeElScrollEffectSettingGroup
        v-model:value="scrollEffect"
        :enable-type="['opacity', 'rotate', 'image-parallax', 'scale', 'translate']"
    />
    <UeElSettingGroup :title="t('UNIT_TIP')">
        <template #body>
            <UeElTipGroup v-bind="tip" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelValue } from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.SvgView["attrs"]>("value", { required: true });

const { t } = useI18n();

const tip = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => {
    return {
        tips: [`1. ${t("IMAGE_EFFECT_TIP")}`],
    };
});

// #region effect

const scrollEffect = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        const value = (modelValue.scrollEffect as UeElScrollEffectSettingPanelValue) || undefined;

        if (value?.type.startsWith("parallax")) {
            value.type = "image-parallax";
        }
        return value;
    },
    set: (value, modelValue) => {
        if (!value) {
            modelValue.scrollEffect = undefined;
            return modelValue;
        }

        (modelValue.scrollEffect as any) = {
            ...value,
            type: value?.type === "image-parallax" ? "parallax" : value?.type,
        };
        return modelValue;
    },
});

// #endregion
</script>
<style lang="scss" module>
//
</style>
