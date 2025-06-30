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
        :data-editing="isEditing"
        :data-select-self="selectedSelf"
    >
        <NodeViewContent :class="pageStyle['grid-layer--inner']" :style="getGridGroupStyle(attrs)" />
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { GridGroupAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";

import pageStyle from "../../../src/app.module.scss";

import { isNodeSelection } from "@tiptap/core";
import { getGridGroupStyle } from "../utils/render";
import { isGridGroupNode, isInGridGroup, isInGridItem, getClosestGridGroup } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeElTiptapGridGroup" });

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as GridGroupAttrs);

const contenteditable = ref(false);
const className = useCssModule();
const viewClassName = computed(() => {
    return [className["node-view"], pageStyle["grid-layer"], { "ProseMirror-selectednode": !!props.selected }];
});

const selectedSelf = computed(() => {
    const selection = props.editor.state.selection;

    if (!isNodeSelection(selection)) {
        return false;
    }

    return selection.from === props.getPos() && isGridGroupNode(selection) && props.selected;
});

const focusIn = computed(() => {
    const gridGroup = getClosestGridGroup(props.editor);
    if (gridGroup?.pos !== props.getPos()) {
        return false;
    }
    return isInGridGroup(props.editor.state) && isInGridItem(props.editor.state) && props.editor.isFocused;
});

const isEditing = computed(() => {
    return selectedSelf.value && getEditorPanelExtensionStorage(props.editor).lastEditorPanelType === "gridGroup";
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
