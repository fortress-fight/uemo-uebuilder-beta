<!--
 * @Description: 菜单栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-06 03:17:59
-->
<template>
    <div :class="$style['menu-bar']" class="flex">
        <template v-if="title">
            <div :class="$style['bar-title']">{{ title }}</div>
            <UeTiptapMenuDivideLine />
        </template>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import type { UeTiptapMenuBarBaseProps } from "./index";

defineOptions({ name: "UeTiptapMenuBar" });
const _props = withDefaults(defineProps<UeTiptapMenuBarBaseProps>(), {
    title: "",
});
</script>
<style lang="scss" module>
.menu-bar {
    font-size: 13px;
    line-height: 16px;

    white-space: nowrap;

    color: color(var(--ue-font-color--deeper));
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.1);
    .bar-title {
        padding: 11px;

        color: color(var(--ue-font-color--deeper));
    }
}
</style>
