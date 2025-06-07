<template>
    <node-view-wrapper
        :style="{ textAlign: frameAttrs.align }"
        :class="[$style['frame-view'], pageStyle.frame, { 'ProseMirror-selectednode': !!selected }]"
        :data-placeholder="!frameLink"
        :data-type="frameAttrs.type || undefined"
        :data-frame-ratio="frameAttrs.ratio || false"
        class="drag-handle"
        contenteditable="false"
        draggable="true"
        data-drag-handle
    >
        <div
            v-if="frameLink"
            :class="pageStyle['frame-box']"
            :style="boxStyle"
            :data-style="boxStyle"
            :data-autoplay="isAutoPlay || undefined"
            :data-play-mode="frameAttrs.type === 'video' ? frameAttrs.playMode : undefined"
        >
            <video
                v-if="frameAttrs.type === 'video'"
                ref="videoDom"
                :src="frameLink"
                :class="pageStyle['frame-body']"
                :poster="frameAttrs.videoPoster"
                :autoplay="isAutoPlay ? true : undefined"
                :loop="isAutoPlay ? true : undefined"
                :playsinline="isAutoPlay ? true : undefined"
                :muted="isAutoPlay ? true : undefined"
            ></video>
            <iframe v-else ref="frameDom" :class="pageStyle['frame-body']" :src="frameLink"> </iframe>
            <div :class="$style['prevent-event-mask']"></div>
        </div>
    </node-view-wrapper>
</template>
<script lang="ts" setup>
import type { FrameAttrs } from "../src";

import pageStyle from "../../../src/app.module.scss";

import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { createMd5 } from "@stone/uemo-editor-utils/lib/md5";

import { parseFrameStyle } from "../utils/render";
import { getFrameStorage } from "../utils/helper";

const props = defineProps(nodeViewProps);
const frameAttrs = computed(() => props.node.attrs as FrameAttrs);

const frameStorage = computed(() => getFrameStorage(props.editor));
const isAutoPlay = computed(() => {
    if (frameAttrs.value.type === "video") {
        return frameAttrs.value.playMode === "auto";
    } else {
        return false;
    }
});

const frameLink = computed<string>(() => {
    let frameLink = "";
    switch (frameAttrs.value.type) {
        case "map":
            {
                const { mapTitle, mapDescription, mapPosition, mapTheme, pointerTheme, mapBtns, mapLang } =
                    frameAttrs.value;
                if (mapPosition) {
                    const mapParam = encodeURIComponent(
                        JSON.stringify({
                            title: mapTitle,
                            description: mapDescription,
                            position: mapPosition,
                            theme: mapTheme,
                            pointer: pointerTheme,
                            btns: mapBtns,
                            lang: mapLang,
                        })
                    );

                    frameLink = frameStorage.value?.mapUrl + "?" + "time=" + createMd5(mapParam) + "#" + mapParam;
                }
            }
            break;

        default:
            frameLink = frameAttrs.value.src || "";
            break;
    }
    return frameLink;
});

const frameDom = ref<HTMLIFrameElement>();
watch(frameLink, (newVal) => {
    if (frameAttrs.value.type === "map" && newVal) {
        if (frameDom.value) {
            frameDom.value.src = newVal;
        }
    }
});
const boxStyle = computed(() => {
    return parseFrameStyle(frameAttrs.value);
});

const videoDom = ref<HTMLVideoElement>();
watch(
    () => {
        if (frameAttrs.value.type === "video") {
            return frameAttrs.value.playMode === "auto";
        }
        return false;
    },
    (videoAutoPlay) => {
        if (!videoAutoPlay) {
            videoDom.value?.pause();
            return;
        }
        requestAnimationFrame(() => {
            const playPromise = videoDom.value?.play();
            if (playPromise instanceof Promise) {
                playPromise.catch(() => {
                    //
                });
            }
        });
    }
);
</script>
<style lang="scss" module>
.frame-view {
    cursor: pointer;
    &[data-placeholder] {
        // outline: none !important;
    }
    .prevent-event-mask {
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
    }
}
</style>
a
