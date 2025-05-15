<template>
    <UeElSettingGroup :title="t('LINK_ADDRESS')">
        <UeElTextInput
            :auto-trim="true"
            theme="enterText"
            :value="linkAddress"
            :placeholder="t('LINK_ADDRESS_INPUT_TIP')"
            :required="true"
            @confirm="linkAddress = $event"
        />
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('LINK_TARGET_TITLE')">
        <UeElCheckBox :text="t('LINK_TARGET')" v-model:value="linkTarget" />
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElLinkSettingPanelValue } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const { t } = useI18n();
const valueRef = defineModel<UeElLinkSettingPanelValue>("value", { required: true });

const linkAddress = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.link;
    },
    set(value, modelValue) {
        modelValue.link = value;
        return modelValue;
    },
});

const linkTarget = useDefineObjectModel(valueRef, {
    get(modelValue) {
        if (modelValue.type !== "link") return;
        return modelValue.target === "_blank";
    },
    set(isBlank, modelValue) {
        if (modelValue.type !== "link") return;
        modelValue.target = isBlank ? "_blank" : "_self";
        return modelValue;
    },
});
</script>
<style lang="scss" module>
//
</style>
