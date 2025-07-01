<template>
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElResourceSetting type="svg" v-model:value="url" :removable="false" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElAlignSetting v-model:value="align" type="x" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('UNIT_COLOR')">
        <template #body>
            <UeElColorSetting v-model:value="color" type="color" />
        </template>
    </UeElSettingGroup>
    <UeElWidthSettingGroup v-bind="widthInputProps" v-model:value="width" />
    <UeElPaddingSettingGroup v-model:value="padding" v-bind="paddingInputProps" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.SvgView["attrs"]>("value", { required: true });

const { t } = useI18n();

// #region content

const url = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        return { source: modelValue.url || "" };
    },
    set: (value, modelValue) => {
        modelValue.url = value.source;
        return modelValue;
    },
});

const align = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.align || "left",
    set: (value, modelValue) => {
        modelValue.align = value;
        return modelValue;
    },
});

const color = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.color || "#000",
    set: (value, modelValue) => {
        modelValue.color = value;
        return modelValue;
    },
});

// #region width

const width = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.width,
    set: (value, modelValue) => {
        modelValue.width = value;
        return modelValue;
    },
});

const widthInputProps = computed<UE_EL_COMPONENT.UeElWidthSettingGroupProps>(() => ({
    numberInputProps: {
        limit: { px: [20, Infinity], "%": [5, 100] },
        units: [
            { value: "px", text: "px", default: 200 },
            { value: "%", text: "%", default: 100 },
        ],
    },
}));
// #endregion

// #region padding

const padding = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.padding || "",
    set: (value, modelValue) => {
        modelValue.padding = value;
        return modelValue;
    },
});

const paddingInputProps = computed<UE_EL_COMPONENT.UeElPaddingSettingGroupProps>(() => ({
    paddingSettingProps: {
        units: [
            { text: "px", value: "px", default: 0 },
            { text: "em", value: "em", default: 0 },
        ],
        limit: { px: [0, 500], em: [0, 10] },
    },
}));

// #endregion
</script>
<style lang="scss" module>
.tiptap-svg-view-content-panel {
    // init
}
</style>
