<template>
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElResourceSetting type="lottie" v-model:value="svgIcon" :removable="false" />
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
    <UeElColorSettingGroup v-model:value="color" type="color" />
    <UeElWidthSettingGroup v-bind="widthInputProps" v-model:value="width" />
    <UeElPaddingSettingGroup v-model:value="padding" />
    <UeElSettingGroup :title="t('UNIT_ANIMATION')">
        <template #body>
            <UeElControlGroup :col-count="2">
                <UeElSelect v-model:value="trigger" :title="t('UNIT_TRIGGER')" :options="triggerMethodOptions" />
                <UeElSelect
                    v-if="trigger === 'hover'"
                    :title="t('UNIT_TRIGGER_AREA')"
                    :options="triggerAreaOptions"
                    v-model:value="triggerArea"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.Lottie["attrs"]>("value", { required: true });

const { t } = useI18n();

// #region content

const svgIcon = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        if (!modelValue.url) return undefined;

        return modelValue.url;
    },
    set: (value, modelValue) => {
        if (!value) return modelValue;

        modelValue.url = value;

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
    get: (modelValue) => modelValue.color,
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
    defaultValue: "300px",
    numberInputProps: {
        limit: { px: [20, Infinity], em: [0.5, Infinity] },
        units: [
            { value: "px", text: "px", default: 200 },
            { text: "em", value: "em", default: 10 },
        ],
    },
}));

// #endregion

const padding = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.padding,
    set: (value, modelValue) => {
        modelValue.padding = value;
        return modelValue;
    },
});

// #region animation

const triggerMethodOptions = [
    { value: "hover", text: t("UNIT_HOVER") },
    { value: "click", text: t("UNIT_CLICK") },
    { value: "autoplay", text: t("UNIT_AUTO_PLAY") },
    { value: "scrollIn", text: t("UNIT_SCROLL_IN") },
    { value: "scroll", text: t("UNIT_SCROLL") },
];

const trigger = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        const trigger = modelValue.trigger;

        if (typeof trigger === "object" && trigger.value) return trigger.value;

        if (typeof trigger === "string") return trigger || "hover";

        return "hover";
    },
    set: (value, modelValue) => {
        const trigger = modelValue.trigger;
        if (typeof trigger === "object" && value === trigger.value) return;
        modelValue.trigger = value;
        return modelValue;
    },
});

const triggerAreaOptions = [
    { value: "", text: t("UNIT_TRIGGER_AREA_CURRENT") },
    { value: "areaBlockModule", text: t("UNIT_TRIGGER_AREA_MODULE") },
    { value: "areaColModule", text: t("UNIT_TRIGGER_AREA_BLOCK") },
    { value: "areaRowModule", text: t("UNIT_TRIGGER_AREA_ROW") },
    { value: "areaGroupModule", text: t("UNIT_TRIGGER_AREA_GROUP") },
];

const triggerOption = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        if (typeof modelValue.trigger === "object") {
            return modelValue.trigger.options;
        } else {
            return {};
        }
    },
    set: (value, modelValue) => {
        modelValue.trigger = {
            value: trigger.value,
            options: value,
        };
        return modelValue;
    },
});

const triggerArea = computed({
    get: () => {
        return triggerOption.value.triggerArea || "";
    },
    set: (value) => {
        const options = triggerOption.value;
        triggerOption.value = { ...options, triggerArea: value };
    },
});

// #endregion
</script>
<style lang="scss" module>
//
</style>
