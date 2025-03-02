<template>
    <div ref="barBox" :class="$style['gradient-bar']" :style="{ '--show-bar-bg': barColor }">
        <div
            v-ue-el-label="{
                placement: 'bottom',
                followCursor: 'horizontal',
                content: t('COLOR_PICKER_ADD_POINT'),
            }"
            :class="$style['gradient-bar--inner']"
            @click="addPoint"
        ></div>
        <div ref="shadowPointer" :class="$style['shadow-pointer']"></div>
        <div
            v-for="(item, index) in points"
            ref="colorPointers"
            :key="index"
            tabindex="0"
            :class="$style['color-pointer']"
            :data-id="item.id"
            :style="{ left: item.position }"
            :data-active="editorPointId === item.id"
            @mousedown="emit('updateEditorPointId', item.id)"
            @keydown="handleKeyDown"
        >
            <div :class="$style['color-box']">
                <div :class="$style['color-box--inner']" :style="{ '--bg-color': item.color }"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { GradientPoint } from "../index";

import { guid } from "@stone/uemo-editor-utils/lib/guid";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
import { Dragger, DraggerControl } from "@stone/uemo-editor-utils/lib/dragger";

const instance = getCurrentInstance();
const { t } = useI18n();

const prop = defineProps<{ type: "linear" | "radial"; editorPointId: string; points: GradientPoint[] }>();
const emit = defineEmits<{
    (e: "update:points", value: GradientPoint[]): void;
    (e: "updateEditorPointId" | "changePointPosition", value: string): void;
}>();

const $css = useCssModule();
const barBox = useTemplateRef("barBox");
const shadowPoint = useTemplateRef("shadowPointer");

const gradientPointsStyle = computed(() => calcPointerStyle(prop.points));
const barColor = computed(() => {
    if (prop.type === "linear") {
        return `linear-gradient(${90}deg, ${gradientPointsStyle.value})`;
    }
    if (prop.type === "radial") {
        return `radial-gradient(circle at 50% 50%, ${gradientPointsStyle.value})`;
    }
    return "";
});

function calcPointerStyle(points: GradientPoint[]) {
    const sortPoints = points.slice().sort((a, b) => {
        return parseFloat(a.position) - parseFloat(b.position);
    });

    return `${sortPoints.map((item) => `${item.color} ${item.position}`).join(", ")}`;
}

function handleKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode === 46 || ev.code === "Delete") {
        removePoint();
    }
}

/**
 * @description: 移除当前点
 */
function removePoint() {
    if (prop.points.length <= 2) {
        instance?.proxy?.$ueElToast.error(t("COLOR_PICKER_ERROR_TIP_MIN_POINT"));
        return;
    }

    emit(
        "update:points",
        prop.points.filter((item) => {
            return item.id !== prop.editorPointId;
        })
    );
}

/**
 * @description: 添加新颜色
 */
function addPoint(ev: MouseEvent) {
    if (prop.points.length >= 5) {
        instance?.proxy?.$ueElToast.error(t("COLOR_PICKER_ERROR_TIP_MAX_POINT"));
        return;
    }

    const newPointer: GradientPoint = {
        color: "#000000",
        position: parseInt((ev.offsetX / barBox.value!.clientWidth) * 100 + "") + "%",
        id: guid(5),
    };

    emit("update:points", [...prop.points, newPointer]);
}

/**
 * @description: 初始颜色位置跳转拖拽行为
 */
function initPointerDragger() {
    if (!barBox.value || !shadowPoint.value) return;

    const boxDom = barBox.value;
    const shadowPointDom = shadowPoint.value;

    let barWidth = 0;

    new Dragger(shadowPointDom, {
        trigger: { box: boxDom, el: "." + $css["color-pointer"] },
        bounds: boxDom,
        type: "x",
        onPressInit(ev) {
            const boxRect = boxDom.getBoundingClientRect();
            barWidth = boxRect.width;
            gsap.set(shadowPointDom, { x: ev.clientX - boxRect.left });
            this.refreshPosition();
        },
        liveSnap: (pointers) => {
            const newPosition = parseInt((pointers.x / barWidth) * 100 + "") + "%";
            changePosition(newPosition);
            return pointers;
        },
    }).init();
}

/**
 * @description: 更新颜色位置
 */
function changePosition(position: string | number) {
    prop.points.some((item) => {
        if (item.id !== prop.editorPointId) return false;
        item.position = position.toString();
        return true;
    });

    emit("update:points", prop.points);
}

onMounted(() => {
    initPointerDragger();
});

onBeforeUnmount(() => {
    if (!shadowPoint.value) return;
    DraggerControl.get(shadowPoint.value)?.destroy();
});

// #endregion

defineExpose({ removePoint, changePosition, calcPointerStyle });
</script>
<style lang="scss" module>
.gradient-bar {
    position: relative;

    width: calc(100% - 20px);
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 10px;
    .shadow-pointer {
        position: absolute;
        top: 0;
        left: 0;

        width: 0;
        height: 0;
    }
}
.gradient-bar--inner {
    position: relative;

    overflow: hidden;

    height: 10px;

    cursor: pointer;

    border: 1px solid var(--ue-border-color);
    border-radius: var(--ue-border-radius--lv1);
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
    background-size: 6px 6px;
    &::after {
        @include ab-cover;
        content: "";

        background-image: var(--show-bar-bg);
    }
}
.color-pointer {
    position: absolute;
    top: 0;
    left: 0;

    width: 0;
    height: 0;

    cursor: grab;
    &[data-active="true"] {
        z-index: 20;
        .color-box {
            border: 1px solid var(--theme-layout-row);
            &::after {
                border-color: var(--theme-layout-row) transparent transparent transparent;
            }
        }
    }
}
.color-box {
    position: absolute;
    bottom: 6px;
    left: 0;

    padding: 2px;

    transform: translateX(-50%);

    border: 1px solid color(var(--ue-border-color));
    border-radius: var(--ue-border-radius--lv1);
    background-color: #fff;
    &::after {
        position: absolute;
        top: 100%;
        left: 50%;

        display: block;

        width: 0;
        height: 0;

        content: "";
        transform: translateX(-50%);

        border-width: 4px 4px 0;
        border-style: solid;
        border-color: color(var(--ue-border-color)) transparent transparent;
    }
}
.color-box--inner {
    position: relative;

    overflow: hidden;

    width: 14px;
    height: 14px;

    border-radius: 2px;
    background-color: #000;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
    background-size: 6px 6px;
    &::after {
        @include ab-cover;
        content: "";

        background-color: var(--bg-color);
    }
}
</style>
