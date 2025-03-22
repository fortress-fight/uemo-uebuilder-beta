<template>
    <UeElSettingGroup
        :class="$style['function-link']"
        v-if="linkDetail === 'anchor'"
        :title="t('LINK_TYPE', { type: t('LINK_ANCHOR') })"
    >
        <template #body>
            <UeElSelect
                :title="t('LINK_ANCHOR')"
                :placeholder="t('LINK_ANCHOR_PLACEHOLDER')"
                :no-option-tip="t('LINK_ANCHOR_EMPTY_TIP')"
                :options="anchorOptions"
                v-model:value="link"
            />
            <UeElButton
                v-if="anchorLink"
                :text="t('LINK_ANCHOR_COPY_TIP')"
                theme="strokeText"
                @trigger="copyAnchorLink(anchorLink)"
            />
        </template>
    </UeElSettingGroup>
    <UeElSettingGroup
        :class="$style['function-link']"
        v-else-if="linkDetail === 'download'"
        :title="t('LINK_FILE_TITLE')"
    >
        <template #body>
            <UeElTextInput
                :auto-trim="true"
                theme="enterText"
                :value="linkAddress"
                :placeholder="t('LINK_FILE_INPUT_TIP')"
                @confirm="linkAddress = $event"
            />
        </template>
    </UeElSettingGroup>

    <slot />

    <!-- 提示信息 -->
    <UeElSettingGroup :title="t('UNIT_TIP')">
        <template #body>
            <UeElTipGroup :tips="tipMessage" />
        </template>
    </UeElSettingGroup>
</template>
<script lang="ts" setup>
import type { UeElLinkSettingValue } from "../index";

import copy from "@stone/uemo-editor-utils/lib/copy";

const { t } = useI18n();
const instance = getCurrentInstance();
const valueRef = defineModel<UeElLinkSettingValue>("value", { required: true });

const linkDetail = computed(() => {
    if (valueRef.value.type === "function") {
        return valueRef.value.detail;
    }
    return "";
});

const anchorOptions = ref<UE_EL_COMPONENT.UeElSelectProps["options"]>([]);

const link = computed({
    get() {
        return valueRef.value.link === "" ? undefined : valueRef.value.link;
    },
    set(value) {
        valueRef.value.link = value || "";
    },
});

const anchorLink = computed<string>(() => {
    if (!link.value) return "";
    if (anchorOptions.value.some((item) => item.value === link.value)) {
        return link.value;
    }
    return "";
});

function copyAnchorLink(link: string) {
    const isSuc = copy(link);
    if (isSuc) {
        instance?.proxy?.$ueElToast.success(t("UNIT_COPY_SUCCESS"));
    } else {
        instance?.proxy?.$ueElToast.error(t("UNIT_COPY_FAILED"));
    }
}

const linkAddress = computed({
    get() {
        return valueRef.value.link || "";
    },
    set(v) {
        valueRef.value.link = v;
    },
});

/**
 * 提示信息配置
 */
const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps["tips"]>(() => {
    const detail = linkDetail.value;
    if (detail === "anchor") {
        return [t("LINK_FUNCTION_ANCHOR_TIP")];
    }
    if (detail === "download") {
        return [t("LINK_FUNCTION_DOWNLOAD_TIP")];
    }
    return [];
});

onBeforeMount(() => {
    instance?.proxy?.$ueElLink?.anchor
        ?.getData()
        .then((res) => {
            anchorOptions.value = res.map((item) => ({
                text: item.name,
                value: item.src,
            }));
        })
        .catch((_error) => {
            instance?.proxy?.$ueElToast.error(t("LINK_ERROR_TIP_ANCHOR_ERROR"));
        });
});
</script>
<style lang="scss" module>
.function-link {
    // init
}
</style>
