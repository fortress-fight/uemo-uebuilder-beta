<!--
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-04-29 18:44:16
-->
<template>
    <node-view-wrapper
        class="drag-handle"
        contenteditable="false"
        draggable="true"
        :class="$style['node-placeholder-wrapper']"
        data-drag-handle
    >
        <div ref="rootDom" :class="$style['tiptap-node-placeholder']" class="w-full" :show="showPanel">
            <div :class="$style['btn--add-node']" class="flex items-center">
                <UeElIcon v-if="info.icon" class="mr-2" :name="info.icon" />
                <span class="block">{{ info.title }}</span>
            </div>
        </div>
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { TYPE_NODE_PLACEHOLDER } from "../data";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import { placeholderMap } from "../data";

const prop = defineProps(nodeViewProps);

const showPanel = computed(() => prop.selected);
const nodeAttrs = computed(() => prop.node.attrs as { nodeName: TYPE_NODE_PLACEHOLDER });

const info = computed(() => {
    return placeholderMap[nodeAttrs.value.nodeName] || { title: "未知节点", icon: "icon-unknown" };
});
</script>
<style lang="scss" module>
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
}
</style>
