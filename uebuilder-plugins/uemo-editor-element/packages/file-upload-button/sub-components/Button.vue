<template>
    <UeElButton v-bind="buttonAttrs" :disabled="disable" />
</template>
<script lang="ts" setup>
import type { UploadType } from "../index";
const props = defineProps<{
    upload: () => void;
    type: UploadType;
    disable: boolean;
    uploading: boolean;
    uploadProgress: number;
}>();

const { t } = useI18n();

const buttonAttrs = computed<UE_EL_COMPONENT.UeElButtonProps>(() => {
    const buttonInfoMap: Record<UploadType, UE_EL_COMPONENT.UeElButtonProps> = {
        image: {
            theme: "fillText",
            size: "large",
            icon: "icon-shangchuantupian",
            text: t("UPLOAD_IMAGE_TITLE"),
            loading: props.uploading,
            disable: props.disable,
        },
        svg: {
            theme: "fillText",
            size: "large",
            icon: "icon-app-svg",
            text: t("UPLOAD_SVG_TITLE"),
            loading: props.uploading,
            disable: props.disable,
        },
        lottie: {
            theme: "fillText",
            size: "large",
            icon: "icon-app-lottie",
            text: t("UPLOAD_LOTTIE_TITLE"),
            loading: props.uploading,
            disable: props.disable,
        },
    };

    return buttonInfoMap[props.type];
});
</script>
