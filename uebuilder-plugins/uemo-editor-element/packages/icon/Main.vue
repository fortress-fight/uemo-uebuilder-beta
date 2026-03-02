<!--
 * @Description: 字体图标
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 16:51:09
-->
<template>
    <div :class="$style['icon-box']" aria-hidden="true" :style="{ '--c-size': sizeCss }" v-bind="$attrs">
        <i class="ic" :class="name"></i>
    </div>
</template>
<script lang="ts" setup>
import type { UeElIconBaseProps } from "./index";

import "@stone/icon-font/dist/tiptap/ue-tiptap.scss";

defineOptions({ name: "UeElIcon" });
const prop = defineProps<UeElIconBaseProps>();
const sizeCss = computed(() => (prop.size ? prop.size + "px" : ""));
</script>
<style lang="scss" module>
.icon-box {
    font-size: var(--c-size, 16px);

    overflow: hidden;
    flex: 0 0 auto;

    width: 1em;
    height: 1em;

    vertical-align: middle;

    fill: currentColor;
}
</style>
