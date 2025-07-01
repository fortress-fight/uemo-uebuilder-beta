<template>
    <node-view-wrapper
        class="drag-handle"
        :data-drag-handle="isEditing ? undefined : true"
        :draggable="isEditing ? false : true"
        :contenteditable="contenteditable"
        @dragenter="contenteditable = true"
        @drop="contenteditable = false"
        :data-ratio="attrs.ratio || false"
        :style="{ textAlign: attrs.align }"
        :class="[pageStyle['lottie-wrapper'], { 'ProseMirror-selectednode': !!selected }]"
    >
        <div :style="boxStyle" :class="pageStyle['lottie-box']">
            <div :style="lottieViewer" :class="pageStyle['lottie-viewer']">
                <template v-if="attrs.url">
                    <dotlottie-player
                        v-if="attrs.color"
                        ref="dotlottiePlayerRef"
                        key="with-color"
                        :src="attrs.url"
                        mode="normal"
                        loop="false"
                        lottietype="btnIcon"
                        :style="{
                            '--lottie-player-path-fill': 'currentColor',
                            '--lottie-player-path-stroke': 'currentColor',
                        }"
                        @ready="domReady"
                        @complete="onEnded"
                    />
                    <dotlottie-player
                        v-else
                        ref="dotlottiePlayerRef"
                        key="none-color"
                        :src="attrs.url"
                        mode="normal"
                        loop="false"
                        @ready="domReady"
                        @complete="onEnded"
                    />
                </template>
            </div>
        </div>
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { DotLottiePlayer } from "@stone/uemo-editor-utils/lib/lottie";
import type { LottieAttrs } from "../src";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

import pageStyle from "../../../src/app.module.scss";
import { getLottieViewStyle, getLottieBoxStyle } from "../utils/render";

defineOptions({ name: "UeElTiptapLottieView" });

const props = defineProps(nodeViewProps);

const contenteditable = ref(false);

const isEditing = computed(() => {
    return getEditorPanelExtensionStorage(props.editor).lastEditorPanelType === "lottie";
});

const attrs = computed(() => {
    return props.node.attrs as LottieAttrs;
});

const dotlottiePlayerRef = useTemplateRef<DotLottiePlayer>("dotlottiePlayerRef");

const boxStyle = computed(() => {
    return getLottieBoxStyle(attrs.value);
});

const lottieViewer = computed(() => {
    return getLottieViewStyle(attrs.value);
});

function domReady() {
    const dom = dotlottiePlayerRef.value;
    if (!dom) return;
    const lottieItem = dom.getLottie();
    const data = lottieItem?.renderer.data;
    if (data) {
        props.updateAttributes({ w: data.w, h: data.h });
    }
}

function onEnded() {
    const dom = dotlottiePlayerRef.value;
    if (!dom) return;
    const lottieItem = dom.getLottie();
    if (lottieItem) {
        lottieItem.goToAndStop(0, true);
    }
}

watch(
    () => attrs.value.url,
    (url) => {
        const dom = dotlottiePlayerRef.value;
        if (!dom || !url) return;
        requestAnimationFrame(() => {
            dom
                ?.load(url)
                .then(domReady)
                .catch((err) => console.error(err));
        });
    },
    { immediate: true }
);

onBeforeMount(() => {
    import("@stone/uemo-editor-utils/lib/lottie").catch((err) => {
        console.error(err);
    });
});
</script>
<style lang="scss" module>
.lottie-viewer-placeholder {
    //
}
</style>
