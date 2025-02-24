<!--
 * @Description: 字体图标
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 18:21:49
-->
<template>
    <svg :class="$style['icon-box']" aria-hidden="true" :style="{ '--c-size': sizeCss }" v-bind="$attrs">
        <use :xlink:href="'#' + prop.name" />
    </svg>
</template>
<script lang="ts" setup>
import type { UeElIconBaseProps } from "./index";

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
