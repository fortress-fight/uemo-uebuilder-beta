<template>
    <NodeViewWrapper
        :contenteditable="false"
        :class="viewClassName"
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :data-select="props.selected"
        :data-editing="isEditing"
        :style="`--divide-block-size: ${attrs.size}; --divide-block-md-size: ${attrs.mdSize}`"
    >
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { DividerBlockAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import pageStyle from "../../../src/app.module.scss";

import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeElTiptapGridGroup" });

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as DividerBlockAttrs);

const className = useCssModule();
const viewClassName = computed(() => {
    return [className["node-view"], pageStyle["editor-divide-block"], { "ProseMirror-selectednode": !!props.selected }];
});

const isEditing = computed(() => {
    return props.selected && getEditorPanelExtensionStorage(props.editor).lastEditorPanelType === "gridGroup";
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
