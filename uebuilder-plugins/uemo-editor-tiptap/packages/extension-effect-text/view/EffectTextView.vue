<template>
    <NodeViewWrapper
        :contenteditable="false"
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :class="viewClassName"
        :style="getEffectTextStyle(attrs)"
        :data-align="attrs.align"
        :data-mo-align="attrs.moAlign"
        :data-scroll-effect="JSON.stringify(attrs.scrollEffect)"
        :data-font-size="!isPxFontSize ? attrs.fontSize || '' : undefined"
    >
        <div :class="pageStyle['effect-text-inner']">
            {{ attrs.content }}
        </div>
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { EffectTextAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import { getEffectTextStyle } from "../utils/render";
import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapEffectText" });

const props = defineProps(nodeViewProps);
const attrs = computed(() => props.node.attrs as EffectTextAttrs);

const className = useCssModule();

const isPxFontSize = computed(() => {
    return attrs.value.fontSize?.endsWith("px");
});

const viewClassName = computed(() => {
    return [
        className["node-view"],
        pageStyle["effect-text-block"],
        { "ProseMirror-selectednode": !!props.selected },
        { ["text-" + parseInt(attrs.value.fontSize)]: isPxFontSize.value },
    ];
});
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
