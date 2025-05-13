<template>
    <node-view-wrapper
        :class="pageStyle.img_wrapper"
        :style="{ 'text-align': attrs.align }"
        class="drag-handle"
        :contenteditable="true"
        draggable="true"
        data-drag-handle
        :data-image-effect="attrs.imageEffect?.type"
    >
        <img :src="attrs.src" />
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { ImageAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapImage" });

const props = defineProps(nodeViewProps);

const attrs = computed(() => props.node.attrs as ImageAttrs);
</script>
<style lang="scss" module>
//
</style>
