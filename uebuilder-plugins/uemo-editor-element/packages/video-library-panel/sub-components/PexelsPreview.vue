<template>
    <div
        ref="rootDom"
        :class="$style['pexels-preview']"
        class="cursor-pointer"
        :data-select="video.links.includes(select || '')"
        @click="useVideoLink($event, video)"
    >
        <div :class="$style['item-box']" :style="{ '--width': video.width, '--height': video.height }">
            <video
                :src="video.link"
                :poster="video.thumb"
                preload="none"
                loop
                muted
                playsinline
                @pointerover="play"
                @pointerout="stop"
            ></video>
        </div>
        <div :class="$style['author']">
            by
            <a :href="video.userUrl" target="_blank">{{ video.userName }}</a>
            on Pexels
        </div>
    </div>
    <UeElPopPanel v-model:open="optionIsOpen" :panel="popPanelParams">
        <UeElSelectOption :list="selectOptions" :value="select" @change="selectVideo" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { PEXELS_VIDEO } from "../index";

const { t } = useI18n();
const instance = getCurrentInstance();
const _prop = defineProps<{ video: PEXELS_VIDEO; select?: string }>();
const emit = defineEmits<{ (e: "select", url: string): void }>();
const rootDomRef = useTemplateRef("rootDom");

let timer: number;

function play(e: PointerEvent) {
    clearTimeout(timer);
    const target = e.currentTarget;
    if (target instanceof HTMLVideoElement) {
        timer = setTimeout(() => {
            if (target.paused) {
                target.play().catch((err) => console.error(err));
            }
        }, 500);
    }
}
function stop(e: PointerEvent) {
    clearTimeout(timer);
    const target = e.target;
    if (target instanceof HTMLVideoElement && target.paused === false) {
        target.pause();
    }
}

const optionIsOpen = ref<boolean>(false);
const qTr = computed(() => ({
    sd: t("VIDEO_QUALITY_SD"),
    hd: t("VIDEO_QUALITY_HD"),
    hls: t("VIDEO_QUALITY_HLS"),
}));

/**
 * 计算弹出面板的参数
 * @returns {UE_EL_COMPONENT.UeElPopPanelProps["panel"]} 弹出面板参数
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => ({
    position: {
        refEl: rootDomRef.value as HTMLElement,
        options: {
            placement: "right-start",
            middleware: [
                ["shift", { crossAxis: true, padding: 17, rootBoundary: "viewport" }],
                ["offset", () => ({ mainAxis: 4 })],
            ],
        },
    },
}));

const selectOptions = ref<UE_EL_COMPONENT.UeElSelectOptionProps["list"]>([]);

function useVideoLink(ev: MouseEvent, video: PEXELS_VIDEO) {
    const selectDom = ev.currentTarget;
    if (!instance || !(selectDom instanceof HTMLElement)) {
        return;
    }

    const options = Object.values(video.files).map((v) => {
        const q = qTr.value[v.quality] || v.quality;
        return {
            value: v.link,
            text: v.width + "x" + v.height + " [" + q + "]",
        };
    });

    selectOptions.value = options;
    optionIsOpen.value = true;
}

function selectVideo(value?: string | number) {
    if (!value) return;
    emit("select", String(value));
    optionIsOpen.value = false;
}

onBeforeUnmount(() => {
    clearTimeout(timer);
});
</script>
<style lang="scss" module>
.pexels-preview {
    width: calc(50% - 5px);
    margin-bottom: 10px;

    border-radius: var(--ue-border-radius--lv1);
    &[data-select="true"] {
        .item-box {
            &::before {
                box-shadow: inset 0 0 0 4px color(var(--ue-border-color--deeper)), inset 0 0 0 7px #fff;
            }
        }
    }
    .item-box {
        position: relative;

        overflow: hidden;

        border-radius: var(--ue-border-radius--lv1);
        video {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            object-fit: cover;
        }
        &::before {
            @include ab-cover;
            z-index: 10;

            content: "";
            pointer-events: none;
        }
        &::after {
            display: block;

            padding-bottom: calc(100% * (var(--height) / var(--width)));

            content: "";
            pointer-events: none;
        }
    }
}
.author {
    margin-top: 3px;

    color: color(var(--ue-font-color));
    a {
        text-decoration: underline;
    }
}
</style>
