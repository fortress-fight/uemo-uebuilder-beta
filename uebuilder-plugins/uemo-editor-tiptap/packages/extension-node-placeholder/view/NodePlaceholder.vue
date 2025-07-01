<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-06-13 09:36:09
-->
<template>
    <node-view-wrapper draggable="false" contenteditable="false" :class="$style['node-placeholder-wrapper']">
        <div ref="rootDom" :class="$style['tiptap-node-placeholder']" class="w-full">
            <div :class="$style['btn--add-node']" class="flex items-center">
                <UeElIcon
                    v-if="nodeAttrs.nodeLoading"
                    :class="$style['loading-ic']"
                    class="mr-2"
                    name="icon-app-loading"
                />
                <UeElIcon v-else-if="info.icon" class="mr-2" :name="info.icon" />
                <span class="block">{{ info.title }}</span>
            </div>
        </div>
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { NodePlaceholderAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import { placeholderMap } from "../data";

const prop = defineProps(nodeViewProps);

const nodeAttrs = computed(() => prop.node.attrs as NodePlaceholderAttrs);

const info = computed(() => {
    return placeholderMap[nodeAttrs.value.nodeName] || { title: "未知节点", icon: "icon-unknown" };
});
</script>
<style lang="scss" module>
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.node-placeholder-wrapper {
    cursor: pointer;
    &[data-placeholder] {
        outline: none !important;
    }
}
.tiptap-node-placeholder {
    .prevent-event-mask {
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
    }
    .btn--add-node {
        font-size: 12px;

        width: 100%;
        padding: 10px;
        padding-left: 20px;

        cursor: pointer;
        transition: background-color 0.2s ease;

        color: color(var(--ue-font-color));
        border-radius: var(--ue-border-radius--lv1);
        background-color: color(var(--ue-tiptap-background-color));
        &:hover {
            background-color: #ececec;
        }
    }
    .loading-ic {
        animation: rotate 2s infinite linear;
    }
}
</style>
