<template>
    <NodeViewWrapper
        :class="[pageStyle['button-view']]"
        class="drag-handle"
        contenteditable="false"
        draggable="true"
        data-drag-handle
    >
        <ButtonDom ref="button" :class="$style['button']" :data="attrs" />
    </NodeViewWrapper>
</template>
<script lang="ts" setup>
import type { ButtonItemAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import ButtonDom from "@stone/uemo-editor-element/packages/button-library-panel/sub-components/ButtonDom.vue";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElButtonItem" });

const props = defineProps(nodeViewProps);

const attrs = computed(() => props.node.attrs as ButtonItemAttrs);
</script>
<style lang="scss" module>
.button-item {
    // init
}
</style>
