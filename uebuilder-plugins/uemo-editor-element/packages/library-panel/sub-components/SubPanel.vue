<!--
 * @Description: 资源库面板内部组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-14 00:33:37
-->
<template>
    <div :class="$style['library-panel-group']" v-if="!category">
        <div
            ref="scrollBox"
            :class="$style['group-inner']"
            :style="{ minHeight: minHeight, maxHeight: maxHeight }"
            class="grid items-start"
        >
            <slot :scrollTo="scrollTo"></slot>
        </div>
    </div>
    <div :class="$style['library-panel-group--wrapper']" class="grid min-h-0 items-start" v-else>
        <div :class="$style['category-area']">
            <div :class="$style['library-panel-group']">
                <div
                    ref="categoryScrollBox"
                    :class="$style['group-inner']"
                    :style="{ minHeight: minHeight, maxHeight: maxHeight }"
                    class="grid"
                >
                    <div :class="$style['category-list']" class="grid gap-1">
                        <div
                            v-for="(item, index) in category"
                            :key="index"
                            :class="$style['category-item']"
                            :data-active="activeCategory === item.value"
                            @click="activeCategory = item.value"
                        >
                            <span class="text">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style['content-area']">
            <div :class="$style['library-panel-group']">
                <div
                    ref="scrollBox"
                    :class="$style['group-inner']"
                    :style="{ minHeight: minHeight, maxHeight: maxHeight }"
                    class="grid items-start"
                >
                    <slot :active-category="activeCategory" :scrollTo="scrollTo"></slot>
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
const activeCategory = ref<string>("");

const propActiveCategory = computed(() => {
    return prop.category?.find((item) => item.active)?.value || "";
});

watch(propActiveCategory, (newVal) => {
    if (activeCategory.value === newVal) return;
    activeCategory.value = newVal;
});
watch(activeCategory, () => {
    scrollTo("top");
});

onBeforeMount(() => {
    activeCategory.value = propActiveCategory.value;
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
.library-panel-group {
    padding: 20px 0;
}
.group-inner {
    overflow: auto;

    padding: 0 20px;

    gap: var(--ue-editor-row-space--lv3);
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
