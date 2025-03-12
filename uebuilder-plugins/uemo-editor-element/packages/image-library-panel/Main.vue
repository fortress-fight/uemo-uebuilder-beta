<!--
 * @Description: 图片资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-12 19:38:01
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #ImageLibList>
            <UeElLoading v-if="loading" />
            <UnsplashPanel
                v-if="imageLib?.type === 'Unsplash'"
                v-model:select="select"
                :accessKey="imageLib.accessKey"
            />
        </template>
        <template #ImageUpload>
            <UeElFileUploadButton type="image" @submit="useUpload" />
        </template>
        <template #ImageLink>
            <UeElTextInput
                padding-size="level4"
                theme="enterText"
                :placeholder="t('IMAGE_LIBRARY_LINK_TIP')"
                :rules="imageInputRules"
                :value="imageLink"
                @confirm="changeSelect($event)"
            />
            <UeElButton size="large" theme="fillText" :text="t('UNIT_SUBMIT')" @trigger="useLink" />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElImageLibraryPanelBaseProps } from "./index";

import { isImageReg } from "@stone/uemo-editor-utils/lib/utils";
import UnsplashPanel from "./sub-components/UnsplashPanel.vue";

defineOptions({ name: "UeElImageLibraryPanel" });

const { t } = useI18n();
const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElImageLibraryPanelBaseProps>(), {});
const emit = defineEmits<{ (e: "close"): void }>();
const select = defineModel<string>("select", { required: false });

const loading = ref(false);
const imageLib = ref<UE_EL_UTIL.ResourceImage | null>(null);

const imageLibrary = ref(instance?.proxy?.$ueElResource.imageLibrary);
const defaultCardName = ref<string>(imageLibrary.value?.enable ? "ImageLibList" : "ImageUpload");
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => {
    const param: UE_EL_COMPONENT.UeElLibraryPanelProps = {
        cards: [
            { title: t("UNIT_UPLOAD"), name: "ImageUpload" },
            { title: t("UNIT_LINK"), name: "ImageLink" },
        ],
    };

    if (imageLibrary.value?.enable) {
        param.cards.unshift({
            title: t("IMAGE_LIBRARY_TITLE"),
            name: "ImageLibList",
            icon: "icon-app-image-14",
            iconSize: 16,
        });
    }

    return param;
});

function useUpload(url: UE_EL_UTIL.FileUploadInfo) {
    select.value = url.url;
}

const imageLink = ref<string>("");
const imageInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isImageReg, message: t("IMAGE_LIBRARY_LINK_TIP") }];

function changeSelect(url: string) {
    imageLink.value = url;
}

function useLink() {
    if (imageLink.value.length === 0) return;
    select.value = imageLink.value;

    emit("close");
}

const getImageLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await imageLibrary.value?.getData();

        imageLib.value = res || null;

        clearTimeout(timer);

        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

onBeforeMount(() => {
    if (!imageLibrary.value?.enable) return;
    getImageLibrary().catch((error) => {
        instance?.proxy?.$ueElError(error);
    });
});
</script>
<style lang="scss" module>
.image-library-panel {
    //
}
</style>
