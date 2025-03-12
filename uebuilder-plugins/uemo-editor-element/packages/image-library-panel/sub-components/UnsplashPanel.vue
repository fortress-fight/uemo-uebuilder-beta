<template>
    <div class="grid" :class="$style['search-bar']">
        <UeElTextInput
            padding-size="level4"
            ref="imageInput"
            sub-type="search"
            theme="enterText"
            :placeholder="t('IMAGE_SEARCH_PLACEHOLDER')"
            :value="searchText"
            @confirm="changeSearchText"
        />
    </div>
    <div class="relative" :class="$style['search-result']">
        <UeElLoading v-if="loading" type="circle" />
        <div v-if="imageList.length" :class="$style['image-list']">
            <div ref="resultListDom" :class="$style['result-list']">
                <UnsplashPreview
                    v-for="(item, index) in imageList"
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
import type { UNSPLASH_IMAGE } from "../index";
import type { PhotosBasic } from "@stone/uemo-editor-utils/lib/unsplash";

import Unsplash from "@stone/uemo-editor-utils/lib/unsplash";

import { MasonryMixin } from "../utils/masonry-mixin";
import UnsplashPreview from "./UnsplashPreview.vue";

const { t } = useI18n();
const instance = getCurrentInstance();
const prop = defineProps<{ accessKey: string }>();
const select = defineModel<string>("select", { required: false });

const unsplash: Unsplash = new Unsplash(prop.accessKey);

const searchPage = ref<number>(1);
const searchText = ref<string>("");

const searchResult = ref<HTMLElement>();
function changeSearchText(text: string) {
    searchText.value = text;

    unsplashImageList.value = [];
    searchPage.value = 1;
    searchResult.value?.scrollTo({ top: 0 });
    getUnsplashImageList();
}

const loading = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const isEnd = ref<boolean>(false);
const unsplashImageList = ref<PhotosBasic[]>([]);

function getUnsplashImageList(type: "replace" | "add" = "replace") {
    if (type === "replace") {
        loading.value = true;
    } else {
        loadMore.value = true;
    }

    isEnd.value = false;
    unsplash
        ?.photosSearch(searchText.value, searchPage.value)
        .then((res) => {
            if (!res.response) {
                instance?.proxy?.$ueElToast.error(t("IMAGE_UNSPLASH_ERROR"));
                return;
            }
            if (type === "replace") {
                unsplashImageList.value = res.response.results;
            } else {
                unsplashImageList.value = [...unsplashImageList.value, ...res.response.results];
            }
            isEnd.value = res.response.total_pages <= searchPage.value;
        })
        .catch((err) => {
            if (typeof err === "string") {
                instance?.proxy?.$ueElToast.error(err);
            } else if (typeof err === "object" && err.msg) {
                instance?.proxy?.$ueElToast.error(err.msg);
            } else {
                instance?.proxy?.$ueElToast.error(t("IMAGE_UNSPLASH_ERROR"));
            }
        })
        .finally(() => {
            loading.value = false;
            loadMore.value = false;
        });
}
const imageList = computed<UNSPLASH_IMAGE[]>(() => {
    return unsplashImageList.value.map((item) => {
        return {
            src: item.urls.thumb,
            regularImgUrl: item.urls.raw,
            author: item.user.name,
            width: item.width,
            height: item.height,
            authorLink: item.user.links.html + "?utm_source=uebuilder&utm_medium=referral",
            link: item.links.html,
            isActive: select.value?.includes(item.urls.raw),
            downloadLocation: item.links.download_location,
        };
    });
});

function addMore() {
    searchPage.value++;
    getUnsplashImageList("add");
}

onBeforeMount(() => {
    getUnsplashImageList();
});

// #region 瀑布流

const resultListDom = useTemplateRef("resultListDom");
MasonryMixin(resultListDom, imageList);

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
