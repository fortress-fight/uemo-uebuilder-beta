<!--
 * @Description: 我的页面路由入口
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 01:09:20
-->
<template>
    <div :class="$style['router-user-page-view']">
        <div :class="$style['v-body']" class="flex-1">
            <slot></slot>
        </div>
        <div :class="$style['v-footer']">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { RouterUserPageViewBaseProps } from "./index";

defineOptions({ name: "RouterUserPageView" });
const _props = withDefaults(defineProps<RouterUserPageViewBaseProps>(), {});
</script>
<style lang="scss" module>
.router-user-page-view {
    display: grid;
    overflow: auto;

    height: 100%;

    grid-template-rows: 1fr auto;
}
</style>
