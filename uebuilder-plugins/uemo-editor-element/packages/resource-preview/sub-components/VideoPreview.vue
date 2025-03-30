<template>
    <div
        :class="$style['video-preview']"
        class="flex justify-center items-center"
        ref="previewBoxDom"
        @click="handleToggleVideo"
    >
        <video
            ref="videoDom"
            :class="$style['preview-video']"
            :src="src"
            :alt="t('UNIT_PREVIEW_VIDEO')"
            @canplay="handleVideoLoad"
            @pause="isPlaying = false"
            @play="isPlaying = true"
        />
        <UeElLoading
            v-if="loading"
            :duration="3"
            type="circle"
            bg="rgba(0,0,0,0.2)"
            color="#fff"
            :class="$style['loading-bar']"
        />
        <div v-if="!isPlaying" :class="$style['btn--toggle']" class="flex justify-center items-center">
            <UeElIcon name="icon-app-play-fill" :size="16" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
defineOptions({ name: "UeElVideoPreview" });

const props = withDefaults(defineProps<{ src: string }>(), {});
const videoDom = useTemplateRef("videoDom");

/** 加载状态 */
const loading = ref(false);
const isPlaying = ref(false);

/**
 * 处理视频加载完成
 */
function handleVideoLoad() {
    loading.value = false;
}

// 监听图片源变化
watch(
    () => props.src,
    (src) => {
        loading.value = !!src;
    },
    { immediate: true }
);

/**
 * 处理视频播放
 */
function handleToggleVideo() {
    if (videoDom.value?.paused) {
        videoDom.value?.play();
    } else {
        videoDom.value?.pause();
    }
}

// 组件卸载前清理
onBeforeUnmount(() => {
    videoDom.value?.pause();
});

// #endregion

defineExpose({ loading });
</script>

<style lang="scss" module>
.video-preview {
    position: relative;

    width: 100%;
    height: 100%;

    cursor: pointer;
    .preview-video {
        width: 100%;
        height: 100%;

        object-fit: contain;
    }
    .btn--toggle {
        @include move-center;
        @include circle(36px, #fff);
    }
}
</style>
