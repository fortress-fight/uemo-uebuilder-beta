<!--
 * @Description: 资源库面板内部组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-07 11:08:24
-->
<template>
    <div :class="$style['library-panel-group']">
        <div
            ref="scrollBox"
            :class="$style['group-inner']"
            :style="{ minHeight: minHeight, maxHeight: maxHeight }"
            class="grid"
        >
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineOptions({ name: "UeElLibraryPanelGroup" });

const _prop = withDefaults(defineProps<{ minHeight?: string; maxHeight?: string }>(), {
    minHeight: "50px",
    maxHeight: "500px",
});

const scrollBox = ref<HTMLElement>();

defineExpose({
    scrollToBottom: () => {
        scrollBox.value?.scrollTo(0, scrollBox.value.scrollHeight);
    },
    scrollToTop: () => {
        scrollBox.value?.scrollTo(0, 0);
    },
});
</script>
<style lang="scss" module>
.library-panel-group {
    padding: 20px 0;
}
.group-inner {
    overflow: auto;

    padding: 0 20px;

    gap: 10px;
}
</style>
