<template>
    <UeElSettingGroup v-bind="hoverSettingGroup" @trigger="handleTrigger">
        <template v-if="hoverEffect" #body>
            <UeElSelect v-model:value="hoverEffect" v-bind="hoverOptions" />
        </template>
    </UeElSettingGroup>
    <UeElScrollEffectSettingGroup
        v-model:value="scrollEffect"
        :enable-type="['opacity', 'rotate', 'image-parallax', 'scale', 'translate']"
    />
    <UeElSettingGroup :title="t('IMAGE_GALLERY_TITLE')">
        <template #body>
            <UeElCheckBox v-model:value="enableImageGallery" :text="t('IMAGE_GALLERY_TIP')" />
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('UNIT_TIP')">
        <template #body>
            <UeElTipGroup v-bind="tip" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelValue } from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.Image["attrs"]>("value", { required: true });

const { t } = useI18n();

const tip = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => {
    return {
        tips: [`1. ${t("IMAGE_EFFECT_TIP")}`],
    };
});

// #region effect

const hoverSettingGroup = computed<UE_EL_COMPONENT.UeElSettingGroupProps>(() => {
    return {
        title: t("IMAGE_HOVER_TITLE"),
        oper: !hoverEffect.value ? [{ id: "add", type: "add" }] : [{ id: "remove", type: "remove" }],
    };
});

const handleTrigger = (id: string) => {
    switch (id) {
        case "add":
            hoverEffect.value = "hoverZoomOut";
            break;

        case "remove":
            hoverEffect.value = undefined;
            break;

        default:
            break;
    }
};
const hoverOptions = computed<UE_EL_COMPONENT.UeElSelectProps>(() => {
    return {
        title: t("UNIT_EFFECT"),
        options: [
            { text: t("IMAGE_HOVER_ZOOM_OUT"), value: "hoverZoomOut" },
            { text: t("IMAGE_HOVER_ZOOM_IN"), value: "hoverZoomIn" },
            { text: t("IMAGE_HOVER_IMAGE_SCALE"), value: "hoverImageScale" },
        ],
    };
});

const hoverEffect = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.animate || undefined,
    set: (value, modelValue) => {
        modelValue.animate = value;
        return modelValue;
    },
});

const scrollEffect = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        const value = (modelValue.imageEffect as UeElScrollEffectSettingPanelValue) || undefined;

        if (value?.type.startsWith("parallax")) {
            value.type = "image-parallax";
        }
        return value;
    },
    set: (value, modelValue) => {
        if (!value) {
            modelValue.imageEffect = undefined;
            return modelValue;
        }

        (modelValue.imageEffect as any) = {
            ...value,
            type: value?.type === "image-parallax" ? "parallax" : value?.type,
        };
        return modelValue;
    },
});

const enableImageGallery = useDefineObjectModel(valueModel, {
    get: (modelValue) => !modelValue.forbidImageGallery,
    set: (value, modelValue) => {
        modelValue.forbidImageGallery = !value;
        return modelValue;
    },
});

// #endregion
</script>
<style lang="scss" module>
//
</style>
