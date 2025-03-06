<template>
    <UeElTipGroup v-if="tipAttrs.tips.length > 0" v-bind="tipAttrs" />
</template>
<script lang="ts" setup>
import type { UploadType } from "../index";

import { getSizeDesc } from "@stone/uemo-editor-utils/lib/utils";

const props = defineProps<{ type: UploadType }>();
const instance = getCurrentInstance();
const uploadHandler = instance?.proxy?.$ueFileUpload({});

const { t } = useI18n();

const tipAttrs = computed<UE_EL_COMPONENT.UeElTipGroupProps>(() => {
    const uploadConfig = uploadHandler?.config;

    if (!uploadConfig) {
        return { tips: [t("ERROR_UPLOAD_NOT_CONFIG")] };
    }
    if (props.type === "image") {
        const imageConfig = uploadConfig.image;
        if (imageConfig === false || imageConfig.allow === false) {
            return { tips: [t("ERROR_UPLOAD_NOT_ALLOW_IMAGE")] };
        }

        const limitSize = imageConfig?.limitSize || -1;
        const msgArr =
            limitSize === -1
                ? []
                : [`1. ${t("UPLOAD_IMG_TIP_2", { size: getSizeDesc(limitSize) })}`, `2. ${t("UPLOAD_IMG_TIP_1")}`];
        return { tips: msgArr };
    }
    if (props.type === "svg") {
        const msgArr = [`1. ${t("UPLOAD_SVG_TIP_1")}`, `2. ${t("UPLOAD_SVG_TIP_2")}`];
        return { tips: msgArr };
    }
    return { tips: [] };
});
</script>
