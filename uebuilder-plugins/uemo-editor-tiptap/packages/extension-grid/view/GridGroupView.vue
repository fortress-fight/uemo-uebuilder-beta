<template>
    <NodeViewWrapper
        :contenteditable="true"
        :class="viewClassName"
        class="drag-handle"
        data-drag-handle
        draggable="true"
        @dragenter="contenteditable = true"
        @drop="contenteditable = false"
        :data-align-x="attrs.alignX"
        :data-align-y="attrs.alignY"
        :data-select="selected"
        :data-focus-in="focusIn"
        :data-select-self="selectedSelf"
    >
        <NodeViewContent :class="pageStyle['grid-layer--inner']" :style="getGridGroupStyle(attrs)" />
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { GridGroupAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";

import { getGridGroupStyle } from "../utils/render";
import { isGridGroupNode, isInGridGroup, isInGridItem } from "../utils/helper";
import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapGridGroup" });

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as GridGroupAttrs);

const contenteditable = ref(false);
const className = useCssModule();
const viewClassName = computed(() => {
    return [className["node-view"], pageStyle["grid-layer"], { "ProseMirror-selectednode": !!props.selected }];
});

const selectedSelf = computed(() => {
    return isGridGroupNode(props.editor.state.selection) && props.selected;
});

const focusIn = computed(() => {
    return isInGridGroup(props.editor.state) && isInGridItem(props.editor.state) && props.editor.isFocused;
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
