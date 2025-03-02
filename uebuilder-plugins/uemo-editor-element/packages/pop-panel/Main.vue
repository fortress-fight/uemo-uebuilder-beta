<!--
 * @Description: 弹窗组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 18:10:56
-->
<template>
    <Teleport to="body">
        <div v-if="maskLayerParams && openModel" ref="maskLayer" :class="$style['layer--dialog-mask']"></div>
        <Transition
            :css="false"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
            @after-leave="onAfterLeave"
        >
            <div :class="$style['pop-panel']" v-if="openModel" :style="{ zIndex: zIndex }">
                <div
                    :class="$style['layer-dialog-box']"
                    v-on-click-outside="closeModal"
                    v-ue-el-dragger="draggable"
                    ref="dialogBoxRef"
                >
                    <slot></slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
<script lang="ts" setup>
import type { UeElPopPanelBaseProps, DialogUpdatePosHandler } from "./index";

import { vOnClickOutside } from "@vueuse/components";
import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import { computeFloatingPosition, autoUpdate } from "@stone/uemo-editor-utils/lib/floating-ui";

import { defaultCalcPosParam } from "./index";

defineOptions({ name: "UeElPopPanel" });
const mittManage = mitt<{ clearUploadControl: undefined }>();

const prop = withDefaults(defineProps<UeElPopPanelBaseProps>(), {
    immediate: true,
    autoClose: true,
    draggable: false,
    panel: () => ({ position: "center" }),
});
const emit = defineEmits<{ (e: "onShow" | "onHide"): void }>();

const cssModule = useCssModule();
const openModel = defineModel("open");
const dialogBoxRef = useTemplateRef("dialogBoxRef");

const maskLayerParams = computed(() => {
    const defaultMaskParams = { color: "rgba(0,0,0,0.5)" };
    if (!prop.mask) return false;
    if (prop.mask === true) return defaultMaskParams;
    return Object.assign({}, defaultMaskParams, prop.mask);
});

// #region transition

function onEnter(el: Element, done: () => void) {
    const maskLayerDom = el.querySelector(`.${cssModule["layer--dialog-mask"]}`);
    const dialogBoxDom = el.querySelector(`.${cssModule["layer-dialog-box"]}`);

    updateDialogPos()
        .then(() => {
            return new Promise((res, _rej) => {
                const dialogTl = gsap.timeline({
                    paused: true,
                    defaults: { ease: "none", overwrite: "auto" },
                    onComplete: res,
                });

                if (maskLayerParams.value) {
                    dialogTl.to(maskLayerDom, { background: maskLayerParams.value.color, duration: 0.16 });
                }

                dialogTl.to(dialogBoxDom, { duration: 0.36, opacity: 1 });

                if (prop.immediate) {
                    dialogTl.progress(1);
                } else {
                    dialogTl.play();
                }
            });
        })
        .then(done)
        .catch((err) => {
            console.error(err);
        });
}

function onAfterEnter(_el: Element) {
    emit("onShow");
    const { position } = prop.panel;
    if (typeof position === "string") return;

    const autoUpdatePosition = position.autoUpdate;
    if (!autoUpdatePosition) return;
    if (!dialogBoxRef.value) return;

    const clearUploadControl = autoUpdate(
        position.refEl,
        dialogBoxRef.value,
        _debounce(
            () => {
                updateDialogPos().catch((err) => console.error(err));
            },
            0,
            { leading: true }
        )
    );

    mittManage.on("clearUploadControl", clearUploadControl);
}
function onLeave(el: Element, done: () => void) {
    const maskLayerDom = el.querySelector(`.${cssModule["layer--dialog-mask"]}`);
    const dialogBoxDom = el.querySelector(`.${cssModule["layer-dialog-box"]}`);

    new Promise((res, _rej) => {
        const dialogTl = gsap.timeline({
            paused: true,
            defaults: { ease: "none", overwrite: "auto" },
            onStart: () => {
                mittManage.emit("clearUploadControl");
            },
            onComplete: res,
        });

        if (maskLayerParams.value) {
            dialogTl.to(maskLayerDom, { background: "rgba(0,0,0,0)", duration: 0.16 });
        }

        dialogTl.to(dialogBoxDom, { duration: 0.36, opacity: 0 }, 0);

        if (prop.immediate) {
            dialogTl.progress(1);
        } else {
            dialogTl.play();
        }
    })
        .then(() => done())
        .catch((err) => {
            console.error(err);
        });
}
function onAfterLeave(_el: Element) {
    emit("onHide");
}

// #endregion

let UeElDialogCalcPosHandler: DialogUpdatePosHandler = (param) => param;
function updateDialogPos() {
    const { position } = prop.panel;

    if (typeof position === "string") {
        if (position === "center") {
            gsap.set(dialogBoxRef.value, { top: "50%", left: "50%", xPercent: -50, yPercent: -50 });
            return Promise.resolve();
        }
        return Promise.resolve();
    }

    if (!dialogBoxRef.value) return Promise.resolve();

    const { refEl, options = defaultCalcPosParam } = position;

    return computeFloatingPosition(refEl, dialogBoxRef.value, UeElDialogCalcPosHandler(options)).then(({ x, y }) => {
        gsap.set(dialogBoxRef.value, { top: y, left: x });
    });
}

function closeModal() {
    if (!prop.autoClose) return;

    const allowClose = prop.checkAllowClose?.();
    if (allowClose === false) return;

    openModel.value = false;
}

// 向内部 slot 提供注册计算弹窗位置的处理函数的方法
provide("UeElDialogCalcPosHandler", (fn: DialogUpdatePosHandler) => {
    if (typeof fn != "function") return;
    UeElDialogCalcPosHandler = fn;
});
// 向内部组件注册关闭面板操作
provide("UeElDialogCloseHandler", () => {
    openModel.value = false;
});

onBeforeUnmount(() => {
    mittManage.emit("clearUploadControl");
});
</script>
<style lang="scss" module>
.pop-panel {
    position: fixed;
    z-index: var(--ue-z-index--dialog);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    pointer-events: none;
    &[data-pos="center"] {
        display: flex;

        align-items: center;
        justify-content: center;
        .layer-dialog-box {
            position: relative;
        }
    }
}
.layer--dialog-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    pointer-events: all;
}
.layer-dialog-box {
    position: absolute;
    z-index: var(--ue-z-index--mini);
    top: 0;
    left: 0;

    // max-width: 92%;

    pointer-events: all;

    opacity: 0;
}
</style>
