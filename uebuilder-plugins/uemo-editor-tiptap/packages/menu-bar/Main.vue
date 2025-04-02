<!--
 * @Description: 菜单栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-03 00:03:34
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
const _props = withDefaults(defineProps<UeTiptapMenuBarBaseProps>(), {});
</script>
<style lang="scss" module>
.menu-bar {
    font-size: 13px;
    line-height: 16px;

    white-space: nowrap;

    color: color(var(--ue-font-color--deeper));
    border-radius: var(--ue-tiptap-radius);
    background-color: #fff;
    box-shadow: var(--ue-tiptap-shadow);
    .bar-title {
        padding: 11px;

        color: color(var(--ue-font-color--deeper));
    }
}
</style>
