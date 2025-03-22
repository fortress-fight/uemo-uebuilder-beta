<template>
    <UeElSettingGroup :title="t('LINK_ADDRESS')">
        <template #body>
            <UeElTextInput
                :auto-trim="true"
                theme="enterText"
                :value="linkAddress"
                :placeholder="t('LINK_ADDRESS_INPUT_TIP')"
                @confirm="linkAddress = $event"
            />
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup :title="t('LINK_TARGET_TITLE')">
        <template #body>
            <UeElCheckBox :text="t('LINK_TARGET')" v-model:value="linkTarget" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElLinkSettingValue } from "../index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const { t } = useI18n();
const valueRef = defineModel<UeElLinkSettingValue>("value", { required: true });

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
