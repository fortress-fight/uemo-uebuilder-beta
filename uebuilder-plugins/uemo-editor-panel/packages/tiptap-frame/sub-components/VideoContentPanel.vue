<template>
    <UeElSettingGroup>
        <template #body>
            <UeElControlGroup>
                <UeElResourceSetting type="video" v-model:value="src" :removable="false" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('VIDEO_POSTER')">
        <template #body>
            <UeElControlGroup>
                <UeElResourceSetting type="image" v-model:value="videoPoster" :removable="true" />
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
    <UeElSizeSettingGroup v-model:value="size" />
    <UeElSettingGroup :title="t('UNIT_SETTING')">
        <template #body>
            <UeElControlGroup>
                <UeElSelect v-model:value="playMode" :title="t('VIDEO_PLAY_MODE')" :options="playModeOptions" />
            </UeElControlGroup>
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.VideoFrame["attrs"]>("value", { required: true });

const { t } = useI18n();

const src = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        return modelValue.src || undefined;
    },
    set: (value, modelValue) => {
        if (!value) return modelValue;

        modelValue.src = value;
        return modelValue;
    },
});

const videoPoster = useDefineObjectModel(valueModel, {
    get: (modelValue) => modelValue.videoPoster || undefined,
    set: (value, modelValue) => {
        modelValue.videoPoster = value;
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

const playModeOptions = computed<UE_EL_COMPONENT.UeElSelectProps["options"]>(() => {
    return [
        { text: t("VIDEO_AUTO_PLAY"), value: "auto" },
        { text: t("VIDEO_POP_PLAY"), value: "pop" },
        { text: t("VIDEO_INLINE_PLAY"), value: "inline" },
    ];
});

const playMode = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        return modelValue.playMode;
    },
    set: (value, modelValue) => {
        modelValue.playMode = value;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.tiptap-frame-content-panel {
    // init
}
</style>
