<!--
 * @Description: 视频库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-12 19:35:34
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards" :default-card="defaultCardName">
        <template #VideoLibList="">
            <UeElLoading v-if="loading" />
            <PexelsPanel
                v-if="videoLib?.type === 'Pexels'"
                v-model:select="select"
                :accessKey="videoLib.accessKey"
            ></PexelsPanel>
        </template>
        <template #VideoUpload="">
            <UeElFileUploadButton type="video" @submit="useUpload" />
        </template>
        <template #VideoLink="">
            <UeElTextInput
                padding-size="level4"
                theme="enterText"
                :placeholder="t('VIDEO_LIBRARY_LINK_TIP')"
                :rules="videoInputRules"
                :value="videoLink"
                @confirm="changeSelect($event)"
            />
            <UeElButton size="large" theme="fillText" :text="t('UNIT_SUBMIT')" @trigger="useLink" />
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElVideoLibraryPanelBaseProps } from "./index";

import { isVideoReg } from "@stone/uemo-editor-utils/lib/utils";
import PexelsPanel from "./sub-components/PexelsPanel.vue";

defineOptions({ name: "UeElVideoLibraryPanel" });

const { t } = useI18n();
const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElVideoLibraryPanelBaseProps>(), {});
const emit = defineEmits<{ (e: "close"): void }>();
const select = defineModel<string>("select", { required: false });

const loading = ref(false);
const videoLib = ref<UE_EL_UTIL.ResourceVideo | null>(null);

const videoLibrary = ref(instance?.proxy?.$ueElResource.videoLibrary);
const defaultCardName = ref<string>(videoLibrary.value?.enable ? "VideoLibList" : "VideoUpload");
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => {
    const param: UE_EL_COMPONENT.UeElLibraryPanelProps = {
        cards: [
            { title: t("UNIT_UPLOAD"), name: "VideoUpload" },
            { title: t("UNIT_LINK"), name: "VideoLink" },
        ],
    };

    if (videoLibrary.value?.enable) {
        param.cards.unshift({
            title: t("VIDEO_LIBRARY_TITLE"),
            name: "VideoLibList",
            icon: "icon-app-video",
            iconSize: 16,
        });
    }

    return param;
});

function useUpload(url: UE_EL_UTIL.FileUploadInfo) {
    select.value = url.url;
}

const videoLink = ref<string>("");
const videoInputRules: UE_EL_UTIL.InputRule[] = [{ pattern: isVideoReg, message: t("VIDEO_LIBRARY_LINK_TIP") }];

function changeSelect(url: string) {
    videoLink.value = url;
}

function useLink() {
    if (videoLink.value.length === 0) return;
    select.value = videoLink.value;

    emit("close");
}

const getVideoLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const res = await videoLibrary.value?.getData();

        videoLib.value = res || null;

        clearTimeout(timer);

        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

onBeforeMount(() => {
    if (!videoLibrary.value?.enable) return;
    getVideoLibrary().catch((error) => {
        instance?.proxy?.$ueElError(error);
    });
});
</script>
<style lang="scss" module>
.video-library-panel {
    //
}
</style>
