<template>
    <dotlottie-player
        v-if="isLottie(source)"
        loop="false"
        lottietype="btnIcon"
        mode="normal"
        ref="iconDom"
        :class="[
            pos == 'before' ? $pageStyle['btn-before-lottie-icon'] : $pageStyle['btn-after-lottie-icon'],
            $pageStyle['btn-icon'],
        ]"
        :src="source"
        :style="dotLottieStyle"
        @complete="complete()"
        @ready="domReady"
    />
    <ue-svg-viewer
        v-else-if="source?.endsWith('.svg')"
        :class="[
            pos == 'before' ? $pageStyle['btn-before-svg-icon'] : $pageStyle['btn-after-svg-icon'],
            $pageStyle['btn-icon'],
        ]"
        :fill-color="color === 'currentColor' ? 'currentColor' : undefined"
        :src="source"
        :stroke-color="color === 'currentColor' ? 'currentColor' : undefined"
        :style="{ '--icon-space': space, '--icon-size': size }"
    />
    <iconpark-icon
        v-else
        :class="[
            pos == 'before' ? $pageStyle['btn-before-icon'] : $pageStyle['btn-after-icon'],
            $pageStyle['btn-icon'],
        ]"
        :data-source="source"
        :name="name"
        :style="{ '--icon-space': space, '--icon-size': size }"
    />
</template>
<script lang="ts" setup>
import type { DotLottiePlayer } from "@stone/uemo-editor-utils/lib/lottie";
import type { UeElButtonIconProps } from "../index";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import $pageStyle from "../utils/app.module.scss";

const prop = defineProps<UeElButtonIconProps>();

const iconDom = useTemplateRef<DotLottiePlayer>("iconDom");

const dotLottieStyle = computed(() => ({
    "--lottie-player-path-fill": "currentColor",
    "--lottie-player-path-stroke": "currentColor",
    "--icon-space": prop.space,
    "--icon-size": prop.size,
}));

watch(
    () => prop.source,
    (url) => {
        if (!url || !isLottie(url)) return;
        requestAnimationFrame(() => {
            iconDom.value
                ?.load?.(url)
                .then()
                .catch((err) => {
                    console.error(err);
                });
        });
    }
);

function isLottie(source: string) {
    return (source || "").endsWith(".lottie");
}

function domReady() {
    const lottieDom = iconDom.value;
    const lottieItem = lottieDom?.getLottie();
    if (lottieItem) {
        lottieItem.autoplay = true;
        lottieItem.loop = false;
        lottieItem.play();
    }
}

function complete() {
    if (!iconDom.value) return;
    const lottieItem = iconDom.value.getLottie();
    lottieItem?.goToAndStop($(iconDom.value).data("playerDir") == -1 ? lottieItem.totalFrames - 1 : 0, true);
}

function play() {
    if (!iconDom.value) return;
    $(iconDom.value).data("playerDir", 1);
    const afterLottieItem = iconDom.value.getLottie();
    afterLottieItem?.setDirection(1);
    afterLottieItem?.play();
}

defineExpose({ play });
</script>
<style lang="scss" module>
.button-icon {
    // init
}
</style>
