<template>
    <template v-if="fileUploadHistory">
        <UeElTextInput
            padding-size="level4"
            ref="imageInput"
            sub-type="search"
            theme="enterText"
            :placeholder="t('IMAGE_SEARCH_PLACEHOLDER')"
            :value="searchText"
            @confirm="changeSearchText"
        />
        <div class="relative" :class="$style['search-result']">
            <UeElLoading v-if="loading" type="circle" />
            <div v-if="imageList.length" :class="$style['image-list']">
                <div ref="resultListDom" :class="$style['result-list']" class="grid grid-cols-2">
                    <UeElSelectBox
                        v-for="(item, index) in imageList"
                        :key="index"
                        :select="item.isActive"
                        :width="100"
                        :height="60"
                        @trigger="select = item.url"
                    >
                        <div :class="$style['image-box']" class="h-full flex items-center justify-center">
                            <img :src="item.url" alt="" />
                        </div>
                        <template #footer>
                            <div :class="$style['image-title']">{{ item.title }}</div>
                        </template>
                    </UeElSelectBox>
                </div>
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
            <UeElEmptyPanel v-else :description="t('UNIT_SEARCH_EMPTY')" />
        </div>
    </template>
    <UeElEmptyPanel v-else :description="t('UPLOAD_IMG_HISTORY_NOT_SUPPORT')" />
</template>
<script lang="ts" setup>
import UeElSelectBox from "../../library-panel/sub-components/SelectBox.vue";

const { t } = useI18n();
const instance = getCurrentInstance();
const select = defineModel<string>("select", { required: false });

const fileUploadHistory = instance?.proxy?.$ueFileUploadHistory;

const searchPage = ref<number>(1);
const searchText = ref<string>("");

const searchResult = ref<HTMLElement>();
function changeSearchText(text: string) {
    searchText.value = text;

    imageHistoryList.value = [];
    searchPage.value = 1;
    searchResult.value?.scrollTo({ top: 0 });
    getImageHistoryList();
}

const loading = ref<boolean>(false);
const loadMore = ref<boolean>(false);
const isEnd = ref<boolean>(false);
const imageHistoryList = ref<UE_EL_UTIL.UploadHistoryFileData[]>([]);
const imageList = computed<{ url: string; title: string; isActive?: boolean }[]>(() => {
    return imageHistoryList.value
        ? imageHistoryList.value
              .map((item) => {
                  return { url: item.url, title: item.filename, isActive: select.value?.includes(item.url) };
              })
              .filter((item) => {
                  return /(jpg|webp|png|gif|jpeg)$/.test(item.url);
              })
        : [];
});

function getImageHistoryList(type: "replace" | "add" = "replace") {
    if (!fileUploadHistory?.config) {
        instance?.proxy?.$ueElToast.error(t("UPLOAD_IMG_HISTORY_CONFIG_ERROR"));
        return;
    }

    if (type === "replace") {
        loading.value = true;
    } else {
        loadMore.value = true;
    }

    isEnd.value = false;
    fileUploadHistory
        ?.getUploadFileData({
            filename: searchText.value,
            page: searchPage.value.toString(),
            type: "image",
        })
        .then((res) => {
            if (!res) return Promise.reject(new Error(t("UPLOAD_IMG_HISTORY_GET_LIST_FAILED")));

            if (type === "replace") {
                imageHistoryList.value = res.data.list;
            } else {
                imageHistoryList.value = [...imageHistoryList.value, ...res.data.list];
            }
            // NOTE 用于兼容 uemo 上传历史记录返回数据格式
            if ("next" in res.data) {
                isEnd.value = !res.data.next;
            } else if ("total" in res.data) {
                isEnd.value = Math.ceil(res.data.total / res.data.limit) <= res.data.page;
            }
        })
        .catch((err) => {
            instance?.proxy?.$ueElError(err);
        })
        .finally(() => {
            loading.value = false;
            loadMore.value = false;
        });
}

function addMore() {
    searchPage.value++;
    getImageHistoryList("add");
}

onBeforeMount(() => {
    getImageHistoryList();
});
</script>
<style lang="scss" module>
.search-bar {
    padding-bottom: 0;

    gap: var(--ue-control-col-space);
}
.result-list {
    gap: 10px;
    &::after {
        display: block;
        clear: both;

        content: "";
    }
    .image-box {
        width: 100%;

        border-radius: 4px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
        img {
            right: 0;
            bottom: 0;

            width: auto;
            max-width: 90%;
            max-height: 90%;
            margin: auto;
        }
    }
    .image-title {
        margin-top: 3px;

        color: var(--c-gray-40);
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
