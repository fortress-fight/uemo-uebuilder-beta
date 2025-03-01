<!--
 * @Description: 颜色选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 00:32:08
-->
<template>
    <UeElEditorGroup :class="$style['color-panel']">
        <div ref="colorBox" :class="$style['color-box']">
            <div :class="$style['mask--white']"></div>
            <div :class="$style['mask--black']"></div>
            <div ref="colorRing" class="flex items-center justify-center" :class="$style['color-ring']">
                <div class="flex-grow-0 flex-shrink-0" :class="$style['color-ring--inner']"></div>
            </div>
            <div ref="shadowColorRing" :class="$style['color-ring']" class="opacity-0"></div>
        </div>
        <div ref="colorBar" :class="$style['color-bar']" class="flex items-center">
            <div ref="colorBarInner" :class="$style['color-bar--inner']" class="relative"></div>
            <div ref="shadowColorBarInner" :class="$style['color-bar--inner']" class="relative opacity-0"></div>
        </div>
        <div :class="$style['color-input']" class="grid items-center">
            <UeElColorInput :class="$style['new-color-input']" :value="value" @update:value="updateHSV($event)" />
            <div
                v-if="enableColorPicker"
                :class="$style['btn-box']"
                class="flex items-center justify-center"
                :title="t('COLOR_EYE_DROPPER')"
                @click="openSystemColorPicker"
            >
                <UeElIcon name="icon-dropper" :class="$style['ic']" />
            </div>
            <div :class="$style['btn-box']" class="flex justify-center items-center" @click="useOldVal">
                <div :class="$style['older-color-item']">
                    <div
                        :class="$style['inner']"
                        :style="{
                            opacity: oldColorOpacity * 100 + '%',
                            backgroundColor: oldColor,
                        }"
                    ></div>
                </div>
            </div>
        </div>
    </UeElEditorGroup>
</template>
<script lang="ts" setup>
import type { UeElColorPickerBaseProps } from "./index";

import Color from "@stone/uemo-editor-utils/lib/color";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
import { Dragger, DraggerControl } from "@stone/uemo-editor-utils/lib/dragger";
import { useEyeDropper } from "@vueuse/core";

const { t } = useI18n();
const { isSupported, open } = useEyeDropper();

defineOptions({ name: "UeElColorPicker" });

const instance = getCurrentInstance();
const _prop = withDefaults(defineProps<UeElColorPickerBaseProps>(), {});
const valueRef = defineModel<string>("value", { required: true });

const colorHsv = reactive<{ h: number; s: number; v: number; alpha?: number }>({
    h: 0,
    s: 0,
    v: 0,
    alpha: 1,
});

function updateHSV(color: string | undefined) {
    if (!color) return;

    const newColorHsv = Color(color).hsv().object();
    colorHsv.h = newColorHsv.h;
    colorHsv.s = newColorHsv.s;
    colorHsv.v = newColorHsv.v;
    colorHsv.alpha = newColorHsv.alpha ?? 1;
}

watch(
    () => valueRef.value,
    (newValue) => {
        if (newValue === valueRef.value) return;
        updateHSV(newValue);
    }
);

onBeforeMount(() => {
    updateHSV(valueRef.value);
});

// #region 缓存颜色信息

const localColor = computed(() => {
    return Color(colorHsv).rgb().toString();
});

const oldColor = ref<string>("");
const oldColorOpacity = ref<number>(1);

function useOldVal() {
    updateHSV(Color(oldColor.value).alpha(oldColorOpacity.value).toString());
}

watch(
    () => localColor.value,
    (color) => {
        valueRef.value = color;
    }
);

onBeforeMount(() => {
    oldColor.value = Color(valueRef.value).hex();
    oldColorOpacity.value = Color(valueRef.value).alpha();
});

// #endregion

// #region 控件管理

// 色板相关元素
const colorBox = useTemplateRef("colorBox");
const colorRing = useTemplateRef("colorRing");
const shadowColorRing = useTemplateRef("shadowColorRing");

// 色相条相关元素
const colorBar = useTemplateRef("colorBar");
const colorBarInner = useTemplateRef("colorBarInner");
const shadowColorBarInner = useTemplateRef("shadowColorBarInner");

/**
 * 更新色相滑块位置
 */

function updateColorBoxPicker(h: number) {
    if (colorBox.value) {
        gsap.set(colorBox.value, {
            backgroundColor: "hsla(" + h + ", 100%, 50%, 1)",
        });
    }
    if (colorBar.value && colorBarInner.value) {
        const { width } = colorBar.value.getBoundingClientRect();

        gsap.set(colorBarInner.value, {
            x: width * (h / 360),
        });
    }
}
watch(() => colorHsv.h, updateColorBoxPicker);

/**
 * 更新色板选色环
 */

function updateColorBarSelector([s, v]: [number, number]) {
    if (colorBox.value && colorRing.value) {
        const { width, height } = colorBox.value.getBoundingClientRect();
        gsap.set(colorRing.value, {
            x: width * (s / 100),
            y: height * (1 - v / 100),
        });
    }
}
watch([() => colorHsv.s, () => colorHsv.v], updateColorBarSelector);

onMounted(() => {
    requestAnimationFrame(() => {
        updateColorBoxPicker(colorHsv.h);
        updateColorBarSelector([colorHsv.s, colorHsv.v]);
    });
});

/**
 * 初始化颜色面板功能
 */
function initColorBox() {
    if (!shadowColorRing.value || !colorBox.value) return;

    const { width, height } = colorBox.value.getBoundingClientRect();
    new Dragger(shadowColorRing.value, {
        trigger: colorBox.value,
        bounds: colorBox.value,
        onPressInit(ev) {
            const x = ev.clientX - colorBox.value!.getBoundingClientRect().left;
            const y = ev.clientY - colorBox.value!.getBoundingClientRect().top;
            gsap.set(shadowColorRing.value, { x, y });
            colorHsv.s = (x / width) * 100;
            colorHsv.v = (1 - y / height) * 100;
            this.refreshPosition();
        },
        liveSnap: (pointers) => {
            const { x, y } = pointers;
            colorHsv.s = (x / width) * 100;
            colorHsv.v = (1 - y / height) * 100;
            return { x: x, y: y };
        },
    }).init();
}

/**
 * 初始化色相滑块功能
 */
function initColorBar() {
    if (!colorBar.value || !shadowColorBarInner.value) return;
    const { width } = colorBar.value.getBoundingClientRect();
    new Dragger(shadowColorBarInner.value, {
        type: "x",
        trigger: colorBar.value,
        bounds: colorBar.value,
        onPressInit(ev) {
            const x = ev.clientX - colorBar.value!.getBoundingClientRect().left;
            gsap.set(shadowColorBarInner.value, { x });
            colorHsv.h = (x / width) * 360;
            this.refreshPosition();
        },
        liveSnap: (pointers) => {
            const { x } = pointers;
            colorHsv.h = (x / width) * 360;
            return pointers;
        },
    }).init();
}

onMounted(() => {
    requestAnimationFrame(() => {
        initColorBar();
        initColorBox();
    });
});
onBeforeUnmount(() => {
    if (shadowColorBarInner.value) {
        DraggerControl.get(shadowColorBarInner.value)?.destroy();
    }
    if (shadowColorRing.value) {
        DraggerControl.get(shadowColorRing.value)?.destroy();
    }
});

// #endregion

// #region 拾色器控制

const enableColorPicker = window.location.protocol.includes("https");
function openSystemColorPicker() {
    if (!isSupported) {
        instance?.proxy?.$ueElToast.error(t("COLOR_PICKER_TIP_NOT_SUPPORTED"));
        return;
    }

    open()
        .then((result) => {
            updateHSV(result?.sRGBHex);
        })
        .catch((error) => {
            console.error(error instanceof Error ? error : new Error(String(error)));
        });
}

// #endregion

defineExpose({
    changeOldColor(color: string) {
        void (color && (oldColor.value = color));
    },
});
</script>
<style lang="scss" module>
.color-panel {
    width: 100%;
    padding-bottom: 0;
}
.color-box {
    position: relative;

    width: 100%;
    margin-bottom: 12px;
    .mask--black {
        @include ab-cover;
        background-image: linear-gradient(to top, #000, rgb(0 0 0 / 0));
    }
    .mask--white {
        @include ab-cover;
        pointer-events: none;

        background-image: linear-gradient(to right, #fff, rgb(255 255 255 / 0));
    }
    &::after {
        display: block;

        padding-top: 100%;

        content: "";
    }
    .color-ring {
        position: absolute;
        top: 0;
        left: 0;

        width: 0;
        height: 0;
    }
    .color-ring--inner {
        width: 18px;
        height: 18px;

        border: 2px solid #fff;
        border-radius: 11px;
        box-shadow: 0 0 4px rgb(0 0 0 / 0.3), inset 0 0 4px rgb(0 0 0 / 0.2);
    }
}
.color-bar {
    height: 10px;
    margin-bottom: 12px;

    border-radius: 10px;
    background-color: #000;
    background-image: linear-gradient(
        to left,
        rgb(255 0 0) 0%,
        rgb(255 0 255) 17%,
        rgb(0 0 255) 33%,
        rgb(0 255 255) 50%,
        rgb(0 255 0) 67%,
        rgb(255 255 0) 83%,
        rgb(255 0 0) 100%
    );
    .color-bar--inner {
        width: 0;
        height: 0;

        cursor: grab;
        &::after {
            @include move-center;

            width: 7px;
            height: 20px;

            content: "";

            border: 1px solid rgb(0 0 0 / 0.2);
            border-radius: 10px;
            background: #fff;
        }
        &:active {
            cursor: grabbing;
        }
    }
}
.color-input {
    margin-bottom: 12px;
    padding-right: 2px;

    gap: 4px;

    grid-template-columns: 1fr auto auto;
    .new-color-input {
        max-width: 158px;
    }
    .btn-box {
        @include square(28px);

        cursor: pointer;

        border: 1px solid transparent;
        border-radius: var(--ue-border-radius--lv1);
        background-color: #fff;
        &:hover {
            border-color: color(var(--ue-border-color));
        }
        .ic {
            font-size: 16px;
        }
    }
    .older-color-item {
        @include square(16px);
        position: relative;

        overflow: hidden;

        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
        background-color: #fff;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
        background-size: 6px 6px;
        .inner {
            @include ab-cover;
        }
    }
}
</style>
