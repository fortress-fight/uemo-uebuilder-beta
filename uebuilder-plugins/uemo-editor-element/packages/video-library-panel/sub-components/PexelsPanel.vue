<template>
    <div class="grid" :class="$style['search-bar']">
        <UeElTextInput
            padding-size="level4"
            ref="videoInput"
            sub-type="search"
            theme="enterText"
            :placeholder="t('VIDEO_SEARCH_PLACEHOLDER')"
            :value="searchText"
            @confirm="changeSearchText"
        />
        <UeElSelect
            class="justify-self-start"
            v-bind="searchVideoDirSelect"
            v-model:value="searchVideoDir"
            :class="$style['select--dir']"
        />
    </div>
    <div class="relative" :class="$style['search-result']">
        <UeElLoading v-if="loading" type="circle" />
        <div v-if="videoList.length" :class="$style['video-list']">
            <div ref="resultListDom" :class="$style['result-list']">
                <PexelsPreview
                    v-for="(item, index) in videoList"
                    :data="item"
                    :key="index"
                    :select="select"
                    @select="select = $event"
                />
                <UeElButton
                    v-if="!isEnd"
                    size="large"
                    theme="fillText"
                    :class="$style['btn--add-more']"
                    :loading="loadMore"
                    :text="t('UNIT_LOAD_MORE')"
                    @trigger="addMore"
                />
            </div>
        </div>
        <UeElEmptyPanel v-else :description="t('UNIT_SEARCH_EMPTY')" />
    </div>
</template>
<script lang="ts" setup>
import type { PEXELS_VIDEO } from "../index";
import type { Video } from "@stone/uemo-editor-utils/lib/pexels";

import PexelsPreview from "./PexelsPreview.vue";
import Pexels from "@stone/uemo-editor-utils/lib/pexels";

import { MasonryMixin } from "../utils/masonry-mixin";

const { t } = useI18n();
const instance = getCurrentInstance();
const prop = defineProps<{ accessKey: string }>();
const pexels: Pexels = new Pexels(prop.accessKey);
const select = defineModel<string>("select", { required: false });

// #region 视频库内容获取

const loading = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const isEnd = ref<boolean>(false);
const videoList = ref<PEXELS_VIDEO[]>([]);

function sortFile(videos: Video["video_files"]): Video["video_files"] {
    const videoMap: Record<string, Video["video_files"]> = {
        sd: [],
        hd: [],
        hls: [],
    };
    videos.map((video) => {
        if (video.quality === "sd") {
            videoMap.sd.push(video);
        } else if (video.quality === "hd") {
            videoMap.hd.push(video);
        } else if (video.quality === "hls") {
            videoMap.hls.push(video);
        }
    });
    let result: Video["video_files"] = [];
    Object.values(videoMap).map((v) => {
        result = [
            ...result,
            ...v.sort((a, b) => {
                if (!b.width || !a.width) {
                    return 0;
                }
                return a.width - b.width;
            }),
        ];
    });
    return result;
}
function filterVideoInfo(videos: Video[]) {
    return videos.map((video) => {
        const files = sortFile(video.video_files);
        return {
            link: files[0].link,
            thumb: video.image,
            userName: video.user.name,
            userUrl: video.user.url,
            width: video.width,
            height: video.height,
            files: files,
            links: files.map((item) => item.link),
        };
    });
}
function getPexelsVideoList(type: "replace" | "add" = "replace") {
    if (type === "replace") {
        loading.value = true;
    } else {
        loadMore.value = true;
    }

    isEnd.value = false;
    const key = searchText.value;

    const searchApi =
        key || searchVideoDir.value
            ? pexels.videoSearch(
                  key,
                  searchPage.value,
                  searchVideoDir.value as "landscape" | "portrait" | "square" | ""
              )
            : pexels.popularVideoSearch(searchPage.value);

    searchApi
        .then((res) => {
            const newVideoList = filterVideoInfo(res.videos);
            if (type === "replace") {
                videoList.value = newVideoList;
            } else {
                videoList.value = [...videoList.value, ...newVideoList];
            }
            isEnd.value = res.total_results / res.per_page <= searchPage.value;
        })
        .catch((err) => {
            if (typeof err === "string") {
                instance?.proxy?.$ueElToast.error(err);
            } else if (typeof err === "object" && err.msg) {
                instance?.proxy?.$ueElToast.error(err.msg);
            } else {
                instance?.proxy?.$ueElToast.error(t("VIDEO_PEXELS_ERROR"));
            }
        })
        .finally(() => {
            loading.value = false;
            loadMore.value = false;
        });
}

onBeforeMount(() => {
    getPexelsVideoList();
});

// #endregion

// #region searchCondition 控制

const searchPage = ref<number>(1);
function addMore() {
    searchPage.value++;
    getPexelsVideoList("add");
}

const searchText = ref<string>("");
const searchResult = ref<HTMLElement>();

function changeSearchText(text: string) {
    searchText.value = text;

    videoList.value = [];
    searchPage.value = 1;
    searchResult.value?.scrollTo({ top: 0 });
    getPexelsVideoList();
}

const searchVideoDir = ref<string>("");
const searchVideoDirSelect = computed<UE_EL_COMPONENT.UeElSelectProps>(() => ({
    title: t("VIDEO_DIR_TITLE"),
    options: [
        { text: t("UNIT_DEFAULT"), value: "" },
        { text: t("VIDEO_DIR_1"), value: "landscape" },
        { text: t("VIDEO_DIR_2"), value: "portrait" },
        { text: t("VIDEO_DIR_3"), value: "square" },
    ],
}));

watch(searchVideoDir, () => {
    videoList.value = [];
    searchPage.value = 1;
    searchResult.value?.scrollTo({ top: 0 });
    getPexelsVideoList();
});

// #endregion

// #region 瀑布流

const resultListDom = useTemplateRef("resultListDom");
MasonryMixin(resultListDom, videoList);

// #endregion
</script>
<style lang="scss" module>
.search-bar {
    padding-bottom: 0;

    gap: var(--ue-control-col-space);
}
.result-list {
    &::after {
        display: block;
        clear: both;

        content: "";
    }
}
.btn--add-more {
    margin-top: 10px;

    color: color(var(--ue-font-color));
}
.empty-area {
    color: color(var(--ue-font-color));
}
.search-result {
    min-height: 300px;
}
</style>
