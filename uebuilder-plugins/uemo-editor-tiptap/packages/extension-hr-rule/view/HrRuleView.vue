<template>
    <NodeViewWrapper
        :contenteditable="false"
        :class="viewClassName"
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :data-select="props.selected"
        :data-editing="isEditing"
        :style="getHrRuleStyle(attrs)"
    >
        <div :class="pageStyle['editor-hr--inner']"></div>
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { HrRuleAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import { getHrRuleStyle } from "../utils/render";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapGridGroup" });

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as HrRuleAttrs);

const className = useCssModule();
const viewClassName = computed(() => {
    return [className["node-view"], pageStyle["editor-hr"], { "ProseMirror-selectednode": !!props.selected }];
});

const isEditing = computed(() => {
    return props.selected && getEditorPanelExtensionStorage(props.editor).lastEditorPanelType === "hrRule";
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
