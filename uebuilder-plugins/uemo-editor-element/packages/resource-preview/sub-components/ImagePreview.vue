<template>
    <div :class="$style['image-preview']" class="flex justify-center items-center" ref="previewBoxDom">
        <img ref="imageDom" :class="$style['preview-img']" :src="src" @load="loading = false" />
        <Transition :css="false" appear @after-enter="onAfterEnter" @leave="onLeave">
            <div
                ref="focusDragger"
                class="flex items-center justify-center"
                :class="$style['pos-ring']"
                v-if="enableFocus && !loading"
            >
                <div class="flex-grow-0 flex-shrink-0" :class="$style['pos-ring--inner']"></div>
            </div>
        </Transition>
    </div>
</template>
<script lang="ts" setup>
import type { ResourcePreviewEmitsParams } from "../index";

import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
import { numRound } from "@stone/uemo-editor-utils/lib/number";
import { Dragger, DraggerControl } from "@stone/uemo-editor-utils/lib/dragger";

defineOptions({ name: "UeElImagePreview" });

const props = withDefaults(
    defineProps<{
        src: string;
        enhance?: { focus: { enable: boolean; pos?: string } };
    }>(),
    { enhance: () => ({ focus: { enable: false } }) }
);
const emit = defineEmits<{
    (e: "trigger", params: ResourcePreviewEmitsParams["image"]): void;
}>();

// #region 焦点位置控制

const imageDomRef = useTemplateRef("imageDom");
const previewBoxDomRef = useTemplateRef("previewBoxDom");
const focusDraggerDomRef = useTemplateRef("focusDragger");
const loading = ref(false);
const dragging = ref<boolean>(false);

const enableFocus = computed(() => props.enhance?.focus.enable);

const focusPos = computed({
    get: () => props.enhance?.focus.pos || "0% 0%",
    set(value: string) {
        void (value === "0% 0%"
            ? emit("trigger", { type: "focus", data: { pos: "" } })
            : emit("trigger", { type: "focus", data: { pos: value } }));
    },
});

function updateDraggerPos() {
    if (!focusDraggerDomRef.value) return;

    const dragger = DraggerControl.get(focusDraggerDomRef.value);
    if (!dragger) return;

    const { maxX, maxY } = dragger.bounds;
    const { x, y } = dragger.getCurrentPosition();

    const pos = `${numRound(((x - disX) / (maxX - disX)) * 100)}% ${numRound(((y - disY) / (maxY - disY)) * 100)}%`;
    focusPos.value = pos;
}

function initPosDragger() {
    const posRingDom = focusDraggerDomRef.value;
    const imageDom = imageDomRef.value;
    const boxDom = previewBoxDomRef.value;
    if (!enableFocus.value || !imageDom || !boxDom || !posRingDom) {
        return;
    }

    new Dragger(posRingDom, {
        trigger: [imageDom, posRingDom],
        bounds: imageDom,
        onPressInit(ev) {
            dragging.value = true;
            const boxBound = boxDom.getBoundingClientRect();
            gsap.set(posRingDom, {
                x: ev.clientX - boxBound.left,
                y: ev.clientY - boxBound.top,
            });
            this.refreshPosition();
            updateDraggerPos();
        },
        onDrag() {
            updateDraggerPos();
        },
        onRelease() {
            dragging.value = false;
        },
    }).init();

    updateDistance();
}

let disX = 0;
let disY = 0;
function updateDistance() {
    const posRingDom = focusDraggerDomRef.value;
    const imageDom = imageDomRef.value;
    const boxDom = previewBoxDomRef.value;

    if (!enableFocus.value || !imageDom || !boxDom || !posRingDom) {
        return;
    }

    const boxBound = boxDom.getBoundingClientRect();
    const imageBound = imageDom.getBoundingClientRect();

    disX = imageBound.left - boxBound.left;
    disY = imageBound.top - boxBound.top;

    const value = focusPos.value.split(" ");

    if (value.length === 2) {
        const imgWidth = gsap.getProperty(imageDom, "width").toString();
        const imgHeight = gsap.getProperty(imageDom, "height").toString();
        gsap.set(posRingDom, {
            x: disX + (parseInt(imgWidth) * parseInt(value[0])) / 100,
            y: disY + (parseInt(imgHeight) * parseInt(value[1])) / 100,
        });
    }
}

watch(
    () => props.src,
    (src) => {
        loading.value = !!src;
    },
    { immediate: true }
);

function onAfterEnter() {
    initPosDragger();
}

function onLeave() {
    if (!focusDraggerDomRef.value) return;
    DraggerControl.get(focusDraggerDomRef.value)?.destroy();
}

onBeforeUnmount(() => {
    if (!focusDraggerDomRef.value) return;
    DraggerControl.get(focusDraggerDomRef.value)?.destroy();
});

// #endregion

defineExpose({ loading });
</script>
<style lang="scss" module>
.image-preview {
    position: relative;
    .preview-img {
        max-width: 100%;
        max-height: 100%;
    }
    .pos-ring {
        position: absolute;
        z-index: 10000;
        top: 0;
        left: 0;

        width: 0;
        height: 0;
    }
    .pos-ring--inner {
        width: 18px;
        height: 18px;

        border: 2px solid #fff;
        border-radius: 11px;
        background: rgb(0 0 0 / 0.2);
        box-shadow: 0 0 4px rgb(0 0 0 / 0.3), inset 0 0 4px rgb(0 0 0 / 0.2);
    }
}
</style>
