<!--
 * @Description: 首页用户收藏路由页面
 * @Author: F-Stone
 * @LastEditTime: 2025-07-31 13:06:10
-->
<template>
    <div :class="$style['router-home-user-collect-view']">
        <div :class="$style['v-body']" class="flex-1">
            <slot></slot>
        </div>
        <div :class="$style['v-footer']">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { RouterHomeUserCollectViewBaseProps } from "./index";

defineOptions({ name: "RouterHomeUserCollectView" });
const _props = withDefaults(defineProps<RouterHomeUserCollectViewBaseProps>(), {});
</script>
<style lang="scss" module>
.router-home-user-collect-view {
    display: grid;
    overflow: auto;

    height: 100%;

    grid-template-rows: 1fr auto;
}
</style>
