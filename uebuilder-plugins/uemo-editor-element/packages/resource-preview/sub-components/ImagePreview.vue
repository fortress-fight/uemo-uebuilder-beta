<template>
    <div
        :class="$style['image-preview']"
        class="flex justify-center items-center"
        ref="previewBoxDom"
        :data-focus-enable="enableFocus"
    >
        <img ref="imageDom" :class="$style['preview-img']" :src="src" @load="handleImageLoad" alt="预览图片" />
        <Transition :css="false" appear @after-enter="handleAfterEnter" @leave="handleLeave">
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

/**
 * 组件属性定义
 */
interface Props {
    /** 图片源地址 */
    src: string;
    /** 增强功能配置 */
    enhance?: {
        focus: {
            /** 是否启用焦点功能 */
            enable: boolean;
            /** 焦点位置 */
            pos?: string;
        };
    };
}

const props = withDefaults(defineProps<Props>(), {
    enhance: () => ({ focus: { enable: false } }),
});

const emit = defineEmits<{
    (e: "trigger", params: ResourcePreviewEmitsParams["image"]): void;
}>();

// #region 焦点位置控制

/** 图片DOM引用 */
const imageDomRef = useTemplateRef("imageDom");
/** 预览框DOM引用 */
const previewBoxDomRef = useTemplateRef("previewBoxDom");
/** 焦点拖拽器DOM引用 */
const focusDraggerDomRef = useTemplateRef("focusDragger");
/** 加载状态 */
const loading = ref(false);
/** 拖拽状态 */
const dragging = ref<boolean>(false);

/** 是否启用焦点功能 */
const enableFocus = computed(() => props.enhance?.focus.enable);

/** 焦点位置计算属性 */
const focusPos = computed({
    get: () => props.enhance?.focus.pos || "0% 0%",
    set(value: string) {
        void (value === "0% 0%"
            ? emit("trigger", { type: "focus", data: { pos: "" } })
            : emit("trigger", { type: "focus", data: { pos: value } }));
    },
});

/** 图片与预览框的偏移距离 */
let offsetX = 0;
let offsetY = 0;

/**
 * 更新拖拽器位置
 */
function updateDraggerPos() {
    if (!focusDraggerDomRef.value) return;

    const dragger = DraggerControl.get(focusDraggerDomRef.value);
    if (!dragger) return;

    const { maxX, maxY } = dragger.bounds;
    const { x, y } = dragger.currentPosition;

    const pos = `${numRound(((x - offsetX) / (maxX - offsetX)) * 100)}% ${numRound(
        ((y - offsetY) / (maxY - offsetY)) * 100
    )}%`;
    focusPos.value = pos;
}

/**
 * 初始化位置拖拽器
 */
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
        onDrag: updateDraggerPos,
        onRelease() {
            dragging.value = false;
        },
    }).init();

    updateOffset();
}

/**
 * 更新偏移距离
 */
function updateOffset() {
    const posRingDom = focusDraggerDomRef.value;
    const imageDom = imageDomRef.value;
    const boxDom = previewBoxDomRef.value;

    if (!enableFocus.value || !imageDom || !boxDom || !posRingDom) {
        return;
    }

    const boxBound = boxDom.getBoundingClientRect();
    const imageBound = imageDom.getBoundingClientRect();

    offsetX = imageBound.left - boxBound.left;
    offsetY = imageBound.top - boxBound.top;

    const [xPercent, yPercent] = focusPos.value.split(" ");

    if (xPercent && yPercent) {
        const imgWidth = gsap.getProperty(imageDom, "width").toString();
        const imgHeight = gsap.getProperty(imageDom, "height").toString();
        gsap.set(posRingDom, {
            x: offsetX + (parseInt(imgWidth) * parseInt(xPercent)) / 100,
            y: offsetY + (parseInt(imgHeight) * parseInt(yPercent)) / 100,
        });
    }
}

/**
 * 处理图片加载完成
 */
function handleImageLoad() {
    loading.value = false;
}

/**
 * 处理过渡动画进入后
 */
function handleAfterEnter() {
    initPosDragger();
}

/**
 * 处理过渡动画离开
 */
function handleLeave() {
    if (!focusDraggerDomRef.value) return;
    DraggerControl.get(focusDraggerDomRef.value)?.destroy();
}

// 监听图片源变化
watch(
    () => props.src,
    (src) => {
        loading.value = !!src;
    },
    { immediate: true }
);

// 组件卸载前清理
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
    &[data-focus-enable="true"] {
        img {
            cursor: grab !important;
        }
        img:active {
            cursor: none !important;
        }
    }
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

        pointer-events: none;
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
