<!--
 * @Description: Emoji 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-04-29 01:40:19
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #EmojiLibList>
            <UeElLoading v-if="loading" />
            <div v-if="!searchResult" :class="$style['emoji-cat-bar']" class="grid grid-cols-9 gap-1">
                <button
                    v-for="(item, index) in emojiCategoryList"
                    :key="index"
                    :class="$style['emoji-cat']"
                    :data-active="selectCategory === item?.name"
                    @click="selectCategory = item?.name || ''"
                >
                    <template v-if="item">
                        <div :class="$style['emoji-cat-box']">
                            <InlineSvg :class="$style['emoji-cat-icon']" :src="categoryMap[item.name]" />
                        </div>
                    </template>
                </button>
            </div>
            <div :class="$style['emoji-list-panel']">
                <div :class="$style['emoji-list']" class="grid grid-cols-8 gap-1" v-if="emojiList.length">
                    <button
                        v-for="(item, index) in emojiList"
                        :key="index"
                        :class="$style['emoji-item']"
                        :data-active="selectedIndex === index"
                        @click="selectItem(index)"
                    >
                        <div
                            :class="$style['inner']"
                            class="flex items-center justify-center"
                            :data-unicode_version="item.unicode_version"
                            :data-emoji_version="item.emoji_version"
                        >
                            {{ item.emoji }}
                        </div>
                    </button>
                </div>
                <div v-else>
                    <UeElEmptyPanel :description="t('UNIT_SEARCH_EMPTY')" />
                </div>
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElEmojiLibraryPanelBaseProps, EmojiCategoryMap, EmojiList, EmojiData } from "./index";

import { categoryMap, getEmojiList } from "./utils/helper";

defineOptions({ name: "UeElEmojiLibraryPanel" });

const { t } = useI18n();
const instance = getCurrentInstance();
const prop = withDefaults(defineProps<UeElEmojiLibraryPanelBaseProps>(), {});
const select = defineModel<string>("select", { required: false });

const loading = ref(false);
const emojiData = ref<EmojiData>([]);
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [{ title: "Emoji", name: "EmojiLibList", icon: "icon-app-emoji", iconSize: 15 }],
}));

const searchResult = ref<EmojiList | null>(null);

// #region 分类

const selectCategory = ref<EmojiCategoryMap["name"]>();
const emojiCategoryList = computed(() => {
    return Object.keys(categoryMap).map((item) => ({ name: item, svg: categoryMap[item] }));
});

onBeforeMount(() => {
    selectCategory.value = emojiCategoryList.value[0]?.name || "";
});

// #endregion

// #region Emoji

const emojiList = computed(() => {
    return searchResult.value || emojiData.value.find((item) => item.name === selectCategory.value)?.emojis || [];
});

// #endregion

// #region 选中状态

const selectedIndex = ref<number>(0);
const rowLen = 8;

function onKeyDown(event: KeyboardEvent): boolean {
    if (loading.value) return false;

    const eventKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"];

    if (!eventKeys.includes(event.key)) {
        return false;
    }

    if (selectedIndex.value === -1) {
        selectedIndex.value = 0;
        return true;
    }

    const len = emojiList.value.length;
    if (event.key === "ArrowLeft") {
        selectedIndex.value = (selectedIndex.value + len - 1) % len;
        return true;
    }

    if (event.key === "ArrowRight") {
        selectedIndex.value = (selectedIndex.value + len + 1) % len;
        return true;
    }

    if (event.key === "ArrowUp") {
        selectedIndex.value = (selectedIndex.value + len - rowLen) % len;
        return true;
    }

    if (event.key === "ArrowDown") {
        selectedIndex.value = (selectedIndex.value + rowLen) % len;
        return true;
    }

    if (event.key === "Enter") {
        selectItem(selectedIndex.value);
        return true;
    }

    return false;
}

// watch(
//     () => select.value,
//     (val) => {
//         selectedIndex.value = emojiList.value.findIndex((item: any) => item.emoji === val);
//     }
// );

// watch(
//     () => emojiList.value,
//     () => (selectedIndex.value = -1)
// );

function selectItem(index: number) {
    if (loading.value) return false;
    const item = emojiList.value[index];
    if (item) {
        select.value = item.emoji;
    }
}

// #endregion

const getEmojiLibrary = async () => {
    // 启动1秒定时器：若超过1秒未返回，则显示 loading
    const timer = setTimeout(() => (loading.value = true), 20);

    try {
        const { list, fuse } = await getEmojiList();
        emojiData.value = list as EmojiData;

        watch(
            () => prop.query,
            (query) => {
                if (query.length && fuse) {
                    const filteredEmojis = fuse.search(query);
                    searchResult.value = filteredEmojis.slice(0, 81).map((result) => result.item) as EmojiList;
                } else {
                    searchResult.value = null;
                }
            }
        );

        clearTimeout(timer);

        loading.value = false;
    } catch (error) {
        clearTimeout(timer);
        loading.value = false;
        throw error;
    }
};

onBeforeMount(() => {
    getEmojiLibrary().catch((error) => {
        instance?.proxy?.$ueElError(error);
    });
});

defineExpose({
    onKeyDown,
});
</script>
<style lang="scss" module>
.library-emoji-panel {
    //
}
.emoji-cat-bar {
    position: sticky;
    z-index: 10;
    top: 0;

    padding-bottom: 10px;

    color: color(var(--ue-font-color));
    background: #fff;
    .emoji-cat {
        @include space-placeholder(50px, 50px);
        position: relative;

        width: 100%;

        border-radius: var(--ue-border-radius--lv1);
        &:hover,
        &[data-active="true"] {
            color: #fff;
            background-color: color(var(--ue-color--active));
        }
    }
    .emoji-cat-box {
        @include ab-cover;
        padding: 7px;
    }
    .emoji-cat-icon {
        width: 100%;
        height: 100%;
    }
}
.emoji-item {
    @include space-placeholder(10px, 10px);
    font-size: 22px;
    line-height: 1;

    position: relative;

    width: 100%;

    color: color(var(--ue-font-color));
    border-radius: var(--ue-border-radius--lv1);
    outline: 0;
    &:hover,
    &[data-active="true"] {
        background-color: color(var(--ue-background-color--gray), 0.6);
    }
    .inner {
        @include ab-cover;
    }
}
.empty-panel {
    font-size: 14px;

    width: 100%;
    padding: 20px;

    text-align: center;

    color: color(var(--ue-font-color));
}
</style>
