<template>
    <node-view-wrapper
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :class="pageStyle.img_wrapper"
        :contenteditable="contenteditable"
        :data-image-effect="attrs.imageEffect?.type"
        :style="{ 'text-align': attrs.align }"
        @dragenter="contenteditable = true"
        @drop="contenteditable = false"
    >
        <img :src="attrs.src" />
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { ImageAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import pageStyle from "../../../src/app.module.scss";

defineOptions({ name: "UeElTiptapImage" });

const contenteditable = ref(false);

const props = defineProps(nodeViewProps);

const attrs = computed(() => props.node.attrs as ImageAttrs);
</script>
<style lang="scss" module>
//
</style>
