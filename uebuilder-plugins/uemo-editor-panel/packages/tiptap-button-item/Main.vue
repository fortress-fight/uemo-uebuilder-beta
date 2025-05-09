<!--
 * @Description: Tiptap 按钮编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 11:15:03
-->
<template>
    <UeElEditorPanel :class="$style['tiptap-button-item']" :title="t('UNIT_BUTTON')">
        <UeElTabCard v-bind="tabCardParam">
            <template v-slot:content>
                <UeElSettingGroup :title="t('UNIT_TEXT')">
                    <template #body>
                        <UeElControlGroup>
                            <UeElTextInput :value="text" @confirm="text = $event" />
                        </UeElControlGroup>
                    </template>
                </UeElSettingGroup>
                <UeElLinkSettingGroup />
                <UeElButtonIconSettingGroup :title="t('UNIT_BEFORE_POSITION') + t('UNIT_ICON')" />
                <UeElButtonIconSettingGroup :title="t('UNIT_AFTER_POSITION') + t('UNIT_ICON')" />
            </template>
            <template v-slot:design>
                <UeElSettingGroup>
                    <template #body>
                        <UeElResourceSetting type="button" />
                    </template>
                </UeElSettingGroup>
                <UeElSettingGroup :title="t('PADDING_SETTING_TITLE')">
                    <template #body>
                        <UeElPaddingSetting v-model:value="padding" />
                    </template>
                </UeElSettingGroup>
                <UeElSettingGroup :title="t('UNIT_BUTTON') + t('UNIT_STYLE')">
                    <template #body>
                        <UeElButtonStyleSetting v-model:value="buttonStyle" />
                    </template>
                </UeElSettingGroup>
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElButtonStyleSettingPanelValue } from "@stone/uemo-editor-element/packages/button-style-setting-panel";

import type { UeEditorPanelTiptapButtonItemBaseProps } from "./index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

defineOptions({ name: "UeEditorPanelTiptapButtonItem" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapButtonItemBaseProps>(), {});
const valueModel = defineModel<UE_TIPTAP_EXTENSION.ButtonItem["attrs"]>("value", { required: true });

const { t } = useI18n();

const tabCardParam = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "content",
        cards: [
            { title: t("UNIT_CONTENT"), name: "content" },
            { title: t("UNIT_DESIGN"), name: "design" },
        ],
    };
});

// #region text

const text = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.text || "",
    set: (value, modelValue) => {
        modelValue.text = value;
        return modelValue;
    },
});

// #endregion

// #region padding

const padding = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.padding || "",
    set: (value, modelValue) => {
        modelValue.padding = value;
        return modelValue;
    },
});

// #endregion

// #region buttonStyle

function parseBorder(
    attr: Partial<{ borderStyle: string; borderWidth: string; borderColor: string }>
): UE_EL_UTIL.BorderValue | undefined {
    let result = undefined;
    if (attr.borderWidth) {
        const isNotEmpty = attr.borderWidth.split(" ").some((item) => {
            return parseInt(item) !== 0;
        });
        if (isNotEmpty) {
            result = {
                style: attr.borderStyle || "",
                width: attr.borderWidth || "",
                color: attr.borderColor || "",
            };
        }
    }

    return result;
}

const buttonStyle = useDefineObjectModel<
    UE_TIPTAP_EXTENSION.ButtonItem["attrs"],
    { normal: UeElButtonStyleSettingPanelValue; hover: UeElButtonStyleSettingPanelValue }
>(
    valueModel,
    {
        get: (modelValue) => {
            return {
                normal: {
                    color: modelValue.color,
                    background: modelValue.background,
                    radius: modelValue.radius,
                    shadow: modelValue.shadow,
                    border: parseBorder(modelValue),
                },
                hover: {
                    color: modelValue.hoverColor,
                    background: modelValue.hoverBackground,
                    animation: modelValue.animation,
                    radius: modelValue.hoverRadius,
                    shadow: modelValue.hoverShadow,
                    border: parseBorder({
                        borderStyle: modelValue.hoverBorderStyle,
                        borderWidth: modelValue.hoverBorderWidth,
                        borderColor: modelValue.hoverBorderColor,
                    }),
                },
            };
        },
        set: (value, modelValue) => {
            const normalStyleValue = value.normal || {};
            modelValue.color = normalStyleValue.color;
            modelValue.radius = normalStyleValue.radius;
            modelValue.shadow = normalStyleValue.shadow;
            modelValue.background = normalStyleValue.background;
            modelValue.borderColor = normalStyleValue.border?.color;
            modelValue.borderWidth = normalStyleValue.border?.width;
            modelValue.borderStyle = normalStyleValue.border?.style;

            const hoverStyleVal = value.hover || {};
            modelValue.hoverColor = hoverStyleVal.color;
            modelValue.hoverRadius = hoverStyleVal.radius;
            modelValue.hoverShadow = hoverStyleVal.shadow;
            modelValue.hoverBackground = hoverStyleVal.background;
            modelValue.hoverBorderColor = hoverStyleVal.border?.color;
            modelValue.hoverBorderWidth = hoverStyleVal.border?.width;
            modelValue.hoverBorderStyle = hoverStyleVal.border?.style;
            modelValue.animation = hoverStyleVal.animation;

            return modelValue;
        },
    },
    { deep: true }
);

// #endregion
</script>
<style lang="scss" module>
.tiptap-button-item {
    //
}
</style>
