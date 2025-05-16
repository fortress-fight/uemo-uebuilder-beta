<template>
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElResourceSetting type="image" v-model:value="src" :removable="false" />
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
    <UeElLinkSettingGroup v-model:value="link" />
    <UeElSizeSettingGroup v-model:value="size" />
    <UeElColorSettingGroup :title="t('UNIT_MASK')" v-model:value="maskColor" type="color" />
    <UeElSettingGroup title="SEO" is-last>
        <template #body>
            <UeElControlGroup>
                <UeElTextInput
                    autoTrim
                    :value="alt"
                    @confirm="alt = $event"
                    :placeholder="t('IMAGE_ALT_PLACEHOLDER')"
                />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.Image["attrs"]>("value", { required: true });

const { t } = useI18n();

// #region content

const src = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.src || "",
    set: (value, modelValue) => {
        modelValue.src = value;
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

const size = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        if (!modelValue.sizeMode) return undefined;

        return {
            mode: modelValue.sizeMode,
            width: modelValue.width,
            height: modelValue.height,
            ratio: modelValue.ratio,
        };
    },
    set: (value, modelValue) => {
        modelValue.sizeMode = value?.mode;
        modelValue.width = value?.width;
        modelValue.height = value?.height;
        modelValue.ratio = value?.ratio;

        return modelValue;
    },
});

const link = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.imageLink,
    set: (value, modelValue) => {
        modelValue.imageLink = value || undefined;
        return modelValue;
    },
});

const alt = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.alt || "",
    set: (value, modelValue) => {
        modelValue.alt = value;
        return modelValue;
    },
});

const maskColor = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.imageMask || undefined,
    set: (value, modelValue) => {
        modelValue.imageMask = value;
        return modelValue;
    },
});

// #endregion
</script>
<style lang="scss" module>
//
</style>
