<template>
    <UeElSettingGroup :title="t('WEB_URL')">
        <template #body>
            <UeElTextInput
                ref="inputRef"
                :auto-trim="true"
                theme="enterText"
                :value="webUrl"
                :rules="webInputRules"
                :placeholder="t('LINK_ADDRESS_INPUT_TIP')"
                :required="true"
                @confirm="webUrl = $event"
            />
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
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";
import { isWebReg } from "@stone/uemo-editor-utils/lib/utils";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.WebFrame["attrs"]>("value", { required: true });

const { t } = useI18n();

const webInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isWebReg, message: t("WEB_URL_INPUT_TIP") }];
const webUrl = useDefineObjectModel(valueModel, {
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
</script>
<style lang="scss" module>
.tiptap-frame-content-panel {
    // init
}
</style>
