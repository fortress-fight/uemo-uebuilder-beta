<!--
 * @Description: 弹窗组件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-12 16:00:00
 * @FileOverview: 可拖拽的弹窗组件，支持自定义位置、遮罩层和动画效果
 * @Events: onShow, onHide
 * @Props:
 *   - immediate: 是否立即显示，默认 true
 *   - autoClose: 是否自动关闭，默认 true
 *   - draggable: 是否可拖拽，默认 false
 *   - panel: 面板配置，包含位置信息
 *   - mask: 遮罩层配置
-->
<template>
    <Teleport to="body">
        <Transition
            :css="false"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
            @after-leave="onAfterLeave"
        >
            <div
                v-if="openModel"
                :data-root-id="rootId"
                :class="$style['layer--pop-panel']"
                :style="{ zIndex: zIndex }"
            >
                <div v-if="maskLayerParams" ref="maskLayer" :class="$style['dialog-mask']" @click="maskClick"></div>
                <div
                    ref="dialogBox"
                    :class="$style['dialog-box']"
                    v-on-click-outside="closeModal"
                    v-ue-el-dragger="draggable"
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
import { guid } from "@stone/uemo-editor-utils/lib/guid";
import $ from "@stone/uemo-editor-utils/lib/jquery";

import { defaultCalcPosParam, UeElProvideDialogCalcPosHandler, UeElProvideDialogCloseHandler } from "./index";

defineOptions({ name: "UeElPopPanel" });

const { t } = useI18n();

const instance = getCurrentInstance();

// #region 组件配置和状态
const props = withDefaults(defineProps<UeElPopPanelBaseProps>(), {
    immediate: true,
    autoClose: true,
    draggable: false,
    panel: () => ({ position: "center" }),
});

const emit = defineEmits<{
    (e: "onShow" | "onHide"): void;
}>();

const cssModule = useCssModule();
const openModel = defineModel<boolean>("open", { default: false });
const dialogBoxRef = useTemplateRef("dialogBox");
const maskLayerRef = useTemplateRef("maskLayer");

/**
 * 事件管理器，用于清理自动更新位置的监听器
 */
const eventBus = mitt<{ clearUploadControl: undefined }>();

/**
 * 遮罩层配置计算
 */
const maskLayerParams = computed(() => {
    if (!props.mask) return false;
    const defaultMaskParams = { color: "rgba(0,0,0,0.5)" };
    return props.mask === true ? defaultMaskParams : { ...defaultMaskParams, ...props.mask };
});

// #endregion

// #region 位置更新处理
let dialogPosHandler: DialogUpdatePosHandler = (param) => param;

/**
 * 更新弹窗位置
 * @returns Promise 位置更新完成的Promise
 */
async function updateDialogPos(): Promise<void> {
    const { position } = props.panel;
    const dialogBox = dialogBoxRef.value;

    if (!dialogBox) return;

    if (typeof position === "string") {
        if (position === "center") {
            gsap.set(dialogBox, { top: "50%", left: "50%", xPercent: -50, yPercent: -50 });
        }
        return;
    }

    const { refEl, options = defaultCalcPosParam } = position;
    const { x, y } = await computeFloatingPosition(refEl, dialogBox, dialogPosHandler(options));

    gsap.set(dialogBox, { top: y, left: x });
}

watch(
    () => props.panel,
    () => {
        updateDialogPos().catch(() => instance?.proxy?.$ueElToast.error(t("POP_PANEL_UPDATE_ERROR")));
    },
    { deep: true }
);

// #endregion

// #region 动画处理
/**
 * 进入动画
 */
async function onEnter(el: Element, done: () => void) {
    try {
        const maskLayer = el.querySelector(`.${cssModule["dialog-mask"]}`);
        const dialogBox = el.querySelector(`.${cssModule["dialog-box"]}`);

        await updateDialogPos();

        const timeline = gsap.timeline({
            paused: true,
            defaults: { ease: "none", overwrite: "auto" },
        });

        if (maskLayerParams.value) {
            timeline.to(maskLayer, {
                background: maskLayerParams.value.color,
                duration: 0.16,
            });
        }

        timeline.to(dialogBox, { duration: 0.36, opacity: 1 });

        if (props.immediate) {
            timeline.progress(1);
        } else {
            timeline.play();
        }

        await timeline;
        done();
    } catch (err) {
        console.error("动画执行错误:", err);
        done();
    }
}

/**
 * 进入动画完成后的处理
 */
function onAfterEnter(_el: Element) {
    emit("onShow");

    const { position } = props.panel;
    if (typeof position === "string") return;

    const shouldAutoUpdate = position.autoUpdate;
    if (!shouldAutoUpdate || !dialogBoxRef.value) return;

    const cleanup = autoUpdate(
        position.refEl,
        dialogBoxRef.value,
        _debounce(() => void updateDialogPos().catch((err) => console.error("位置更新错误:", err)), 0, {
            leading: true,
        })
    );

    eventBus.on("clearUploadControl", cleanup);
}

/**
 * 离开动画
 */
async function onLeave(el: Element, done: () => void) {
    try {
        const maskLayer = el.querySelector(`.${cssModule["dialog-mask"]}`);
        const dialogBox = el.querySelector(`.${cssModule["dialog-box"]}`);

        const timeline = gsap.timeline({
            paused: true,
            defaults: { ease: "none", overwrite: "auto" },
            onStart: () => eventBus.emit("clearUploadControl"),
        });

        if (maskLayerParams.value) {
            timeline.to(maskLayer, {
                background: "rgba(0,0,0,0)",
                duration: 0.16,
            });
        }

        timeline.to(dialogBox, { duration: 0.36, opacity: 0 }, 0);

        if (props.immediate) {
            timeline.progress(1);
        } else {
            timeline.play();
        }

        await timeline;
        done();
    } catch (err) {
        console.error("动画执行错误:", err);
        done();
    }
}

function onAfterLeave(_el: Element) {
    emit("onHide");
}
// #endregion

// #region ID管理和关闭处理
const rootId = inject("UeElPopPanelRootId", "");
const currentId = rootId || guid();

provide("UeElPopPanelRootId", currentId);

/**
 * 处理弹窗关闭
 */
function closeModal(e: Event) {
    // 如果点击的是遮罩层，则将关闭逻辑交付给 maskLayerRef 的 click 事件
    if (e.target === maskLayerRef.value) {
        return;
    }

    if (!props.autoClose) return;

    const triggerRootId = $(e.target!).closest("[data-root-id]").data("root-id");

    // NOTE 如果当前弹窗的ID与第一次打开的弹窗的ID相同，则不关闭，这种情况发生在弹窗嵌套时
    if (currentId === triggerRootId) return;

    const allowClose = props.checkAllowClose?.();

    if (allowClose === false) return;
    if (typeof allowClose === "string") {
        instance?.proxy?.$ueElToast.error(allowClose);
        return;
    }

    openModel.value = false;
}
// #endregion

// #region 遮罩层点击处理
function maskClick() {
    if (!props.autoClose) return;

    const allowClose = props.checkAllowClose?.();

    if (allowClose === false) return;
    if (typeof allowClose === "string") {
        instance?.proxy?.$ueElToast.error(allowClose);
        return;
    }

    openModel.value = false;
}
// #endregion

// #region Provide/Inject

/**
 * 提供对话框位置计算处理函数
 */
provide(UeElProvideDialogCalcPosHandler, (fn: DialogUpdatePosHandler) => {
    if (typeof fn === "function") {
        dialogPosHandler = fn;
    }
});

/**
 * 提供对话框关闭处理函数
 */
provide(UeElProvideDialogCloseHandler, () => {
    openModel.value = false;
});

// #endregion

// #region 生命周期
onBeforeUnmount(() => {
    openModel.value = false;
    eventBus.emit("clearUploadControl");
    eventBus.all.clear();
});
// #endregion

defineExpose({
    updateDialogPos,
});
</script>

<style lang="scss" module>
.layer--pop-panel {
    position: fixed;
    z-index: var(--ue-z-index--dialog);

    pointer-events: none;

    inset: 0;
    &[data-pos="center"] {
        display: flex;

        align-items: center;
        justify-content: center;
        .layer-dialog-box {
            position: static;
        }
    }
    .dialog-mask {
        position: absolute;
        z-index: var(--ue-z-index--mini);

        pointer-events: all;

        inset: 0;
    }
    .dialog-box {
        position: absolute;
        z-index: var(--ue-z-index--mini);
        top: 0;
        left: 0;

        pointer-events: all;

        opacity: 0;
    }
}
</style>
