<!--
 * @Description: 资源文件预览组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 12:39:11
-->
<template>
    <div :class="$style['resource-preview']" class="flex items-center justify-center">
        <div v-if="!attrs" :class="$style['empty-placeholder']" class="flex items-center justify-center">
            <UeElIcon v-if="ueElIconParam" v-bind="ueElIconParam" />
        </div>
        <div
            :class="$style['preview-area']"
            class="flex items-center justify-center h-full w-full"
            v-if="attrs"
            @pointerenter="handlePointerEnter"
            @pointerleave="handlePointerLeave"
        >
            <template v-if="isIconAttr(type, attrs)">
                <iconpark-icon :class="$style['icon-preview']" :name="attrs.name" />
            </template>
            <template v-else-if="isSvgAttr(type, attrs)">
                <ue-svg-viewer :class="$style['svg-preview']" :src="attrs.source" />
            </template>
            <template v-else>
                <dotlottie-player
                    v-if="type === 'lottie'"
                    ref="dotlottieRef"
                    :key="attrs"
                    :class="$style['dotlottie-player']"
                    :src="attrs"
                    mode="normal"
                    loop="false"
                    @ready="handleLottieReady"
                    @complete="handleLottieComplete"
                />
                <i v-if="type === 'shareIcon'" :class="[$style['share-icon-preview'], attrs]"></i>
                <UeElHoverEffectPreviewButton
                    v-if="type === 'buttonHoverEffect'"
                    :class="[$style['button-hover-effect-preview'], attrs]"
                    :value="attrs"
                />
                <TextDecorationPreview
                    :class="$style['text-decoration-preview']"
                    v-if="type === 'textDecoration'"
                    :value="attrs"
                />
            </template>
        </div>
        <UeElLoading v-if="loading" :duration="3" title="" :class="$style['loading-bar']" />
    </div>
</template>

<script lang="ts" setup generic="T extends UeElResourcePreviewType">
import type { UeElResourcePreviewBaseProps, UeElResourcePreviewType } from "./index";
import type { DotLottiePlayer } from "@stone/uemo-editor-utils/lib/lottie";

import UeElHoverEffectPreviewButton from "../button-hover-effect-library-panel/sub-components/PreviewButton.vue";
import TextDecorationPreview from "../text-decoration-library-panel/sub-component/TextDecorationPreview.vue";

defineOptions({ name: "UeElResourcePreview" });
const props = withDefaults(defineProps<UeElResourcePreviewBaseProps<T>>(), {});

// 常量定义
const LOADING_TIMEOUT = 20;
const ICON_SIZE = 40;

// 响应式状态
const loading = ref(false);
const dotlottieRef = useTemplateRef<DotLottiePlayer>("dotlottieRef");

/**
 * 类型守卫：检查是否为图标属性
 * @param attrs - 属性值
 * @returns 是否为图标属性
 */
function isIconAttr(
    type: UeElResourcePreviewBaseProps["type"],
    attrs: UeElResourcePreviewBaseProps["attrs"]
): attrs is UE_EL_UTIL.ResourceIconAttrs {
    if (type !== "icon") return false;
    if (typeof attrs === "undefined" || typeof attrs === "string") return false;
    return "name" in attrs && "source" in attrs;
}

/**
 * 类型守卫：检查是否为 SVG 属性
 * @param attrs - 属性值
 * @returns 是否为 SVG 属性
 */
function isSvgAttr(
    type: UeElResourcePreviewBaseProps["type"],
    attrs: UeElResourcePreviewBaseProps["attrs"]
): attrs is UE_EL_UTIL.ResourceSvgAttrs {
    if (type !== "svg") return false;
    if (typeof attrs === "undefined" || typeof attrs === "string") return false;
    return "source" in attrs;
}

/**
 * 计算图标参数
 */
const ueElIconParam = computed<UE_EL_COMPONENT.UeElIconProps | null>(() => {
    const iconMap: Record<string, UE_EL_COMPONENT.UeElIconProps> = {
        icon: { name: "icon-app-icon", size: ICON_SIZE },
        lottie: { name: "icon-app-lottie", size: ICON_SIZE },
        svg: { name: "icon-app-svg", size: ICON_SIZE },
        shareIcon: { name: "icon-app-share", size: ICON_SIZE },
        buttonHoverEffect: { name: "icon-app-animation", size: ICON_SIZE },
        textDecoration: { name: "icon-app-svg-line", size: ICON_SIZE },
    };
    return iconMap[props.type] || null;
});

/**
 * 加载图标列表
 * @param source - 图标源文件
 */
async function getIconList(source: string[]): Promise<void> {
    const timer = setTimeout(() => (loading.value = true), LOADING_TIMEOUT);

    try {
        const { loadSvgIcon } = await import("@stone/uemo-editor-utils/lib/icon");
        await loadSvgIcon(source);
    } finally {
        clearTimeout(timer);
        loading.value = false;
    }
}

/**
 * 处理 Lottie 动画准备就绪
 */
function handleLottieReady(): void {
    loading.value = false;
    const lottieDom = dotlottieRef.value;
    const lottieItem = lottieDom?.getLottie();
    if (lottieItem) {
        lottieItem.autoplay = true;
        lottieItem.loop = false;
    }
}

/**
 * 处理 Lottie 动画完成
 */
function handleLottieComplete(): void {
    const lottieDom = dotlottieRef.value;
    if (!lottieDom) return;
    const lottieItem = lottieDom.getLottie();
    if (lottieItem) {
        lottieItem.goToAndStop(lottieDom.dataset.playerDir === "-1" ? lottieItem.totalFrames - 1 : 0, true);
    }
}

/**
 * 处理鼠标进入事件
 */
function handlePointerEnter(): void {
    if (props.type === "lottie") {
        const lottieDom = dotlottieRef.value;
        if (!lottieDom) return;
        lottieDom.dataset.playerDir = "1";
        const lottieItem = lottieDom.getLottie();
        if (lottieItem) {
            lottieItem.setDirection(1);
            lottieItem.play();
        }
    }
}

/**
 * 处理鼠标离开事件
 */
function handlePointerLeave(): void {
    if (props.type === "lottie") {
        const lottieDom = dotlottieRef.value;
        if (!lottieDom) return;
        const lottieItem = lottieDom.getLottie();
        if (lottieItem) {
            lottieItem.pause();
        }
    }
}

watchEffect(() => {
    void (async () => {
        try {
            if (isIconAttr(props.type, props.attrs)) {
                await getIconList([props.attrs.source]);
            }
            if (props.type === "lottie") {
                await import("@stone/uemo-editor-utils/lib/lottie");
            }
            if (isSvgAttr(props.type, props.attrs)) {
                const { initSvgIconComponent } = await import("@stone/uemo-editor-utils/lib/svg");
                await initSvgIconComponent();
            }
        } catch (error) {
            console.error("Failed to initialize component:", error);
        }
    })();
});
</script>

<style lang="scss" module>
.resource-preview {
    position: relative;

    overflow: hidden;

    width: 100%;
    height: 130px;

    border: 1px solid color(var(--ue-border-color));
    border-radius: var(--ue-border-radius--lv1);
}
.loading-bar {
    top: auto;
    bottom: 20px;

    background-color: transparent;
}
.empty-placeholder {
    @include ab-cover;
    width: 100%;
    height: 130px;

    border-radius: var(--ue-border-radius--lv1);
    background-color: #fff;
}
.preview-area {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
    background-size: 12px 12px;
}
.icon-preview {
    font-size: 90px;
}
.svg-preview {
    position: relative;

    display: flex;

    width: 100%;
    max-height: 100%;
}
.share-icon-preview {
    font-size: 90px;
}
.button-hover-effect-preview {
    min-width: 86%;
}
.text-decoration-preview {
    max-width: 60%;

    background-color: #fff;
}
</style>
