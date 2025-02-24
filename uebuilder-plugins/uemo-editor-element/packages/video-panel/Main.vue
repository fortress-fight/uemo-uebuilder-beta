<!--
 * @Description: 视频面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-25 02:10:33
-->
<template>
    <div :class="$style['video-panel']" class="flex justify-center items-center">
        <div :class="$style['panel-body']">
            <video
                ref="videoRef"
                :src="src"
                :poster="poster"
                :loop="loop"
                :autoplay="autoplay"
                controlslist="nodownload"
                controls
            ></video>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElVideoPanelBaseProps } from "./index";

defineOptions({ name: "UeElVideoPanel" });

const prop = withDefaults(defineProps<UeElVideoPanelBaseProps>(), {
    autoplay: true,
});

const videoRef = useTemplateRef("videoRef");

onMounted(() => {
    if (prop.autoplay && videoRef.value) {
        const playPromise = videoRef.value.play();
        if (playPromise instanceof Promise) {
            playPromise.catch(() => {
                videoRef.value?.pause();
            });
        }
    }
});
</script>
<style lang="scss" module>
.video-panel {
    max-width: 70vw;
    .panel-body {
        overflow: hidden;

        border-radius: 14px;
        background-color: #fff;
        background-color: transparent;
        video {
            display: block;

            width: 100%;
            height: 100%;

            object-fit: contain;
            object-position: center;
        }
    }
}
</style>
