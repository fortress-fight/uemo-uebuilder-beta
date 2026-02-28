<template>
    <div :class="$style['begin-guide']" class="flex items-center justify-center">
        <div :class="$style['start-panel']">
            <div :class="$style['step-head']" class="flex justify-between items-end">
                <div :class="$style['state--pos-left']">
                    <div :class="$style['step-title']">
                        {{ stepList[activeStep].title }}
                    </div>
                    <div :class="$style['step-subtitle']">
                        {{ stepList[activeStep].subtitle }}
                    </div>
                </div>
                <div :class="$style['state--pos-right']">
                    <button :class="$style['btn--jump']" @click="emit('finish')">{{ t("UNIT_SKIP") }}</button>
                </div>
            </div>
            <div :class="$style['step-body']">
                <video
                    v-for="(item, index) in stepList"
                    :key="index"
                    ref="videoDoms"
                    :class="$style['video-player']"
                    :src="item.video"
                    :data-active="activeStep === index"
                    preload="auto"
                    muted
                    loop
                ></video>
            </div>
            <div :class="$style['step-footer']" class="flex justify-between items-center">
                <div :class="$style['dot-list']" class="flex">
                    <div
                        v-for="(item, index) in stepList"
                        :key="index"
                        :data-active="activeStep === index"
                        :class="$style['dot-item']"
                        @click="goTo(index)"
                    ></div>
                </div>
                <div :class="$style['btn--next-step']" :data-is-last="isLastStep" @click="goTo(activeStep + 1)">
                    <span v-if="isLastStep" class="text">{{ t("UNIT_FINISH") }}</span>
                    <span v-else class="text"> {{ t("UNIT_NEXT") }} </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const { t } = useI18n();

const emit = defineEmits<{ (e: "finish"): void }>();

const activeStep = ref(0);
const stepList = [
    {
        title: "UEbuilder",
        subtitle: t("tutorialStep1"),
        video: "https://static.jsmo.xin/static/video/xc001.mp4",
    },
    {
        title: "UEbuilder",
        subtitle: t("tutorialStep2"),
        video: "https://static.jsmo.xin/static/video/xc002.mp4",
    },
    {
        title: "UEbuilder",
        subtitle: t("tutorialStep3"),
        video: "https://static.jsmo.xin/static/video/xc003.mp4",
    },
];

const isLastStep = computed(() => {
    return activeStep.value === stepList.length - 1;
});

const videoDoms = ref<HTMLVideoElement[]>([]);

function playVideo(video: HTMLVideoElement) {
    if (!video) return;

    const playPromise = video.play();
    if (playPromise instanceof Promise) {
        playPromise.catch((err) => {
            console.error("视频加载失败:", err);
        });
    }
}

watch(activeStep, (index, oldIndex) => {
    videoDoms.value[oldIndex].pause();
    playVideo(videoDoms.value[index]);
    requestAnimationFrame(() => {
        videoDoms.value[oldIndex].currentTime = 0;
    });
});

function goTo(index: number) {
    if (index > stepList.length - 1) {
        emit("finish");
        return;
    }
    activeStep.value = index;
}

onMounted(() => {
    requestAnimationFrame(() => {
        playVideo(videoDoms.value[activeStep.value]);
    });
});
</script>
<style lang="scss" module>
.begin-guide {
    position: fixed;
    z-index: 90000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background: rgb(0 0 0 / 0.2);

    backdrop-filter: blur(4px);
    .start-panel {
        padding: 28px 40px;

        border-radius: 20px;
        background: #fff;
    }
    .step-head {
        margin-bottom: 20px;
        .btn--jump {
            padding: 10px 0 0 10px;
            &:hover {
                color: var(--editor-color-text);
            }
        }
    }
    .step-title {
        font-family: Inter;
        font-size: 12px;

        margin-bottom: 5px;

        color: var(--editor-c-gray);
    }
    .step-subtitle {
        font-family: Microsoft YaHei;
        font-size: 20px;
        font-weight: 700;

        color: var(--editor-color-text);
    }
    .step-body {
        @include space-placeholder(1920px, 1080px);
        overflow: hidden;

        width: 600px;
        margin-bottom: 15px;

        transform: translate3d(0, 0, 0);

        border-radius: 5px;
        background: #d9d9d9;
        .video-player {
            position: absolute;
            top: 0;
            left: 0;

            visibility: hidden;

            width: 100%;

            pointer-events: none;

            opacity: 0;
            &[data-active="true"] {
                visibility: initial;

                pointer-events: initial;

                opacity: 1;
            }
        }
    }
    .step-footer {
        .dot-list {
            display: flex;

            gap: 10px;
        }
        .dot-item {
            position: relative;

            width: 8px;
            height: 8px;

            cursor: pointer;

            border-radius: 8px;
            background: #d9d9d9;
            &::after {
                @include move-center("xy");
                @include circle(18px);

                content: "";
            }
            &[data-active="true"] {
                background: var(--editor-color-text);
            }
        }
    }
    .btn--next-step {
        font-size: 12;
        line-height: 2;

        display: flex;

        min-width: 76px;
        padding: 8px 20px;

        cursor: pointer;

        color: #fff;
        border-radius: 5px;
        background: var(--editor-color-text);

        align-items: flex-start;
        gap: 10px;
        justify-content: center;
        &[data-is-last="true"] {
            background: var(--c-blue-60);
        }
    }
}
</style>
