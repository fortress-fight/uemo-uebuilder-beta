<template>
    <NodeViewWrapper
        :contenteditable="false"
        :class="viewClassName"
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :data-select="selected"
        :data-focus-in="focusIn"
        :data-select-self="selectedSelf"
        v-bind="getShareRowAttrs(attrs)"
    >
        <NodeViewContent :class="pageStyle['share-list']" />
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { ShareRowAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
import { isNodeSelection } from "@tiptap/core";

import { getShareRowAttrs } from "../utils/render";
import { isShareRowNode, isInShareRowNode, getClosestShareRow } from "../utils/helper";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapGridGroup" });

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as ShareRowAttrs);

const className = useCssModule();
const viewClassName = computed(() => {
    return [className["node-view"], pageStyle["share-row"], { "ProseMirror-selectednode": !!props.selected }];
});

const selectedSelf = computed(() => {
    const selection = props.editor.state.selection;

    if (!isNodeSelection(selection)) {
        return false;
    }

    return selection.from === props.getPos() && isShareRowNode(selection) && props.selected;
});

const focusIn = computed(() => {
    const shareRow = getClosestShareRow(props.editor);

    if (shareRow?.pos !== props.getPos()) {
        return false;
    }
    return isInShareRowNode(props.editor.state) && props.editor.isFocused;
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
