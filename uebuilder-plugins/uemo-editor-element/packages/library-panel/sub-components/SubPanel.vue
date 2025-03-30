<!--
 * @Description: 资源库面板内部组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 22:40:05
-->
<template>
    <div v-if="search" :class="$style['search-input-wrapper']">
        <UeElTextInput
            padding-size="level4"
            ref="imageInput"
            sub-type="search"
            theme="enterText"
            :placeholder="search.placeholder"
            :value="searchText"
            @confirm="changeSearchText"
        />
    </div>
    <div v-if="!category" :class="$style['library-panel-group']">
        <div class="grid items-start" ref="scrollBox" :class="$style['group-inner']" :style="scrollBoxStyle">
            <slot :scrollTo="scrollTo" :searchText="searchText" />
        </div>
    </div>
    <div class="grid min-h-0" v-else :class="$style['library-panel-group--wrapper']">
        <div :class="$style['category-area']">
            <div :class="$style['library-panel-group']">
                <div class="grid" ref="categoryScrollBox" :class="$style['group-inner']" :style="scrollBoxStyle">
                    <div class="grid gap-1" :class="$style['category-list']">
                        <div
                            v-for="(item, index) in category"
                            :class="$style['category-item']"
                            :data-active="!!searchText ? false : localActiveCategory === item.value"
                            :key="index"
                            @click="updateLocalActiveCategory(item.value)"
                        >
                            <span class="text" :title="item.name">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style['content-area']">
            <div class="h-full" :class="$style['library-panel-group']">
                <div
                    class="grid items-start h-full"
                    ref="scrollBox"
                    :class="$style['group-inner']"
                    :style="scrollBoxStyle"
                >
                    <slot :active-category="localActiveCategory" :scrollTo="scrollTo" :searchText="searchText" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElLibraryPanelCard } from "../index";

defineOptions({ name: "UeElLibraryPanelGroup" });

const prop = withDefaults(defineProps<UeElLibraryPanelCard>(), {});
const scrollBox = ref<HTMLElement>();
const localActiveCategory = ref<string>("");
const searchText = ref<string>("");

function changeSearchText(value: string) {
    searchText.value = value;
}

const activeCategory = computed(() => {
    return prop.category?.find((item) => item.active)?.value || "";
});

function updateLocalActiveCategory(value: string) {
    searchText.value = "";
    localActiveCategory.value = value;
}

watch(activeCategory, (newVal) => {
    if (localActiveCategory.value === newVal) return;
    localActiveCategory.value = newVal;
});
watch(localActiveCategory, () => {
    scrollTo("top");
});

onBeforeMount(() => {
    localActiveCategory.value = activeCategory.value;
});

const scrollBoxStyle = computed(() => {
    return {
        minHeight: `calc(${prop.minHeight} - ${prop.search ? "64px" : "0px"} - 40px)`,
        maxHeight: `calc(${prop.maxHeight} - ${prop.search ? "64px" : "0px"} - 40px)`,
    };
});

function scrollTo(pos: "top" | "bottom") {
    if (pos === "top") {
        scrollBox.value?.scrollTo(0, 0);
    } else {
        scrollBox.value?.scrollTo(0, scrollBox.value.scrollHeight);
    }
}

defineExpose({ scrollTo });
</script>
<style lang="scss" module>
.library-panel-group--wrapper {
    grid-template-columns: auto 1fr;
    .library-panel-group {
        // padding: 12px 0;
    }
    .group-inner {
        padding: 0 12px;
    }
}
.search-input-wrapper {
    padding: 12px;

    border-bottom: 1px solid color(var(--ue-border-color));
}
.library-panel-group {
    padding: 20px 0;
}
.group-inner {
    overflow: auto;

    padding: 0 20px;

    gap: var(--ue-editor-row-space--lv3);
}
.category-list {
    grid-auto-rows: max-content;
}
.category-area {
    font-size: 12px;

    width: 90px;
    height: 100%;

    border-right: 1px solid color(var(--ue-border-color));
    .category-item {
        padding: 4px 8px;

        cursor: pointer;

        border-radius: var(--ue-border-radius--lv1);
        &:hover {
            background-color: color(var(--ue-color--hover));
        }
        &[data-active="true"] {
            color: #fff;
            background-color: color(var(--ue-color--active));
        }
    }
}
</style>
