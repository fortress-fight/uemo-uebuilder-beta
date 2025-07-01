<template>
    <NodeViewWrapper :class="viewClassName" :draggable="false" :style="getGridItemStyle(attrs)">
        <NodeViewContent :class="pageStyle['grid-item--inner']" />
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { GridItemAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";

import { getGridItemStyle } from "../utils/render";
import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapGridItem" });

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as GridItemAttrs);

const className = useCssModule();
const viewClassName = computed(() => {
    return [className["node-view"], pageStyle["grid-item"], { "ProseMirror-selectednode": !!props.selected }];
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
