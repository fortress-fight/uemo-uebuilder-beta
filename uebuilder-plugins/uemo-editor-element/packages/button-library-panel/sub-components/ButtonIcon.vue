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

import $pageStyle from "../utils/ue-button/app.module.scss";

const prop = defineProps<UeElButtonIconProps>();

const iconDom = useTemplateRef<DotLottiePlayer>("iconDom");

const dotLottieStyle = computed(() => ({
    "--lottie-player-path-fill": "currentColor",
    "--lottie-player-path-stroke": "currentColor",
    "--icon-space": prop.space,
    "--icon-size": prop.size,
}));

function isLottie(source: string) {
    return (source || "").endsWith(".lottie");
}
</script>
<style lang="scss" module>
.button-icon {
    // init
}
</style>
