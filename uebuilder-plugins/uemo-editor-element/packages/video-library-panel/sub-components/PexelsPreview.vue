<template>
    <UeElSelectBox
        :width="data.width"
        :height="data.height"
        :class="$style['pexels-preview']"
        ref="rootDom"
        @trigger="useVideoLink($event, data)"
        :select="data.links.includes(select || '')"
    >
        <video
            loop
            muted
            playsinline
            preload="none"
            :poster="data.thumb"
            :src="data.link"
            @pointerout="stop"
            @pointerover="play"
        />
        <template #footer>
            <div :class="$style['author']">
                by
                <a target="_blank" :href="data.userUrl">{{ data.userName }}</a>
                on Pexels
            </div>
        </template>
    </UeElSelectBox>
    <UeElPopPanel v-model:open="optionIsOpen" :panel="popPanelParams">
        <UeElSelectOption :list="selectOptions" :value="select" @change="selectVideo" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { PEXELS_VIDEO } from "../index";

import UeElSelectBox from "../../library-panel/sub-components/SelectBox.vue";

const { t } = useI18n();
const _prop = defineProps<{ data: PEXELS_VIDEO; select?: string }>();
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
        refEl: rootDomRef.value?.$el as HTMLElement,
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

function useVideoLink(_ev: MouseEvent, video: PEXELS_VIDEO) {
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
    video {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        object-fit: cover;
    }
}
.author {
    font-size: 12px;

    margin-top: 3px;

    color: color(var(--ue-font-color));
    a {
        text-decoration: underline;
    }
}
</style>
