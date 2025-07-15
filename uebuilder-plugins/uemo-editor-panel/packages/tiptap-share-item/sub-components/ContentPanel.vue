<template>
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElResourceSetting type="shareIcon" v-model:value="svgIcon" :removable="false" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElLinkSettingGroup v-model:value="link" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import { parseLink, parseLinkTiptapAttr } from "@stone/uemo-editor-tiptap/utils/tiptap-helper";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.ShareItem["attrs"]>("value", { required: true });

// #region content

const svgIcon = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        if (!modelValue.icon) return undefined;

        return modelValue.icon;
    },
    set: (value, modelValue) => {
        if (!value) return modelValue;

        modelValue.icon = value;

        return modelValue;
    },
});

const link = useDefineObjectModel(valueModel, {
    get: (modelValue) => parseLink(modelValue),
    set: (value, modelValue) => {
        return {
            ...modelValue,
            ...parseLinkTiptapAttr(value),
        };
    },
});

// #endregion
</script>
<style lang="scss" module>
//
</style>
