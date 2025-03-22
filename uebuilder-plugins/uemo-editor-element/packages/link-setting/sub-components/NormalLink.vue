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

const { t } = useI18n();
const valueRef = defineModel<UeElLinkSettingValue>("value", { required: true });

const linkAddress = computed({
    get() {
        return valueRef.value.link;
    },
    set(v) {
        valueRef.value.link = v;
    },
});

const linkTarget = computed({
    get() {
        if (valueRef.value.type !== "link") return;
        return valueRef.value.target === "_blank";
    },
    set(isBlank) {
        if (valueRef.value.type !== "link") return;
        valueRef.value.target = isBlank ? "_blank" : "_self";
    },
});
</script>
<style lang="scss" module>
//
</style>
