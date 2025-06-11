<template>
    <node-view-wrapper
        :style="{ textAlign: svgViewAttrs.align }"
        :class="[pageStyle['svg-viewer-wrapper'], { 'ProseMirror-selectednode': !!selected }]"
        :data-ratio="svgViewAttrs.ratio || false"
        :data-scroll-effect-param="svgViewAttrs.scrollEffect ? JSON.stringify(svgViewAttrs.scrollEffect) : undefined"
        class="drag-handle"
        contenteditable="false"
        draggable="true"
        data-drag-handle
    >
        <div :style="boxStyle" :class="pageStyle['svg-viewer-box']">
            <div :style="{ width: '100%', padding: svgViewAttrs.padding }">
                <div v-if="svgViewAttrs.url" :class="pageStyle['svg-viewer-inner']">
                    <ue-svg-viewer
                        ref="svgViewerRef"
                        :class="pageStyle['svg-viewer']"
                        :src="svgViewAttrs.url"
                        mode="normal"
                        :fill-color="svgViewAttrs.color"
                        :stroke-color="svgViewAttrs.color"
                    />
                </div>
            </div>
        </div>
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { SvgViewerAttrs } from "../src";

import pageStyle from "../../../src/app.module.scss";
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

import { getSvgViewerStyle } from "../utils/render";

const prop = defineProps(nodeViewProps);

const svgViewAttrs = computed(() => {
    return prop.node.attrs as SvgViewerAttrs;
});

const boxStyle = computed(() => {
    return getSvgViewerStyle(svgViewAttrs.value);
});

onBeforeMount(() => {
    void (async () => {
        try {
            const { initSvgIconComponent } = await import("@stone/uemo-editor-utils/lib/svg");
            await initSvgIconComponent();
        } catch (error) {
            console.error("Failed to initialize component:", error);
        }
    })();
});
</script>
<style lang="scss" module>
// #region lottie
</style>
