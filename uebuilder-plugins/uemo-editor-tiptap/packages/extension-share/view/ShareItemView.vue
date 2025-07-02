<template>
    <NodeViewWrapper
        :contenteditable="false"
        :class="viewClassName"
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :data-select="props.selected"
        :data-editing="isEditing"
        :style="getShareItemStyle(attrs)"
    >
        <div :class="pageStyle['share-icon']">
            <i :class="attrs.icon"></i>
        </div>
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { ShareItemAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import pageStyle from "../../../src/app.module.scss";

import { getShareItemStyle } from "../utils/render";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeElShareItem" });

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as ShareItemAttrs);

const className = useCssModule();
const viewClassName = computed(() => {
    return [className["node-view"], pageStyle.share, { "ProseMirror-selectednode": !!props.selected }];
});

const isEditing = computed(() => {
    return props.selected && getEditorPanelExtensionStorage(props.editor).lastEditorPanelType === "shareItem";
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
