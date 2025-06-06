<template>
    <node-view-wrapper
        class="drag-handle"
        data-drag-handle
        draggable="true"
        :class="[$style['node-view'], pageStyle.img_wrapper, { 'ProseMirror-selectednode': !!selected }]"
        :contenteditable="contenteditable"
        :data-image-effect="attrs.imageEffect?.type"
        :style="{ 'text-align': attrs.align }"
        @dragenter="contenteditable = true"
        @drop="contenteditable = false"
    >
        <div v-bind="imageItemAttrs" v-if="attrs.src" :class="pageStyle.image_item">
            <ImageLink
                :attrs="attrs.imageLink"
                :class="pageStyle.image_box"
                :style="imageBoxStyle"
                @click.prevent="() => {}"
            >
                <ImageElement :attrs="attrs" @load="imageLoad" />
            </ImageLink>
        </div>
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { ImageAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import { resolveImageItemAttrs, resolveImageBoxStyle } from "../utils/render";

import pageStyle from "../../../src/app.module.scss";

import ImageLink from "./ImageLink.vue";
import ImageElement from "./ImageElement.vue";

defineOptions({ name: "UeElTiptapImage" });

const contenteditable = ref(false);

const props = defineProps(nodeViewProps);

const attrs = computed(() => props.node.attrs as ImageAttrs);
const imageBoxStyle = computed(() => resolveImageBoxStyle(attrs.value));
const imageItemAttrs = computed(() => resolveImageItemAttrs(attrs.value));

function imageLoad(ev: Event) {
    const img = ev.currentTarget as HTMLImageElement;

    props.updateAttributes({
        imgW: img.naturalWidth,
        imgH: img.naturalHeight,
    });
}
</script>
<style lang="scss" module>
.node-view {
    cursor: pointer;
}
</style>
