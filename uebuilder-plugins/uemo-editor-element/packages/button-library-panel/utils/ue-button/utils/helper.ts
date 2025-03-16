import type { DotLottiePlayer } from "@stone/uemo-editor-utils/lib/lottie";

import { mobileCheck } from "@stone/uemo-editor-utils/lib/device-check";
import $ from "@stone/uemo-editor-utils/lib/jquery";

import $pageStyle from "../app.module.scss";

export enum ButtonEventName {
    RESIZE = "ue.button.resize",
    HOVER = "ue.button.hover",
    LEAVE = "ue.button.leave",
    PLAY = "ue.button.play",
    DESTROY = "ue.button.destroy",
}

/**
 * 初始化按钮悬浮事件
 * @param button - 按钮DOM元素
 */
export function initHoverEvent(button: HTMLElement) {
    const isMobile = mobileCheck();
    const enterEventName = isMobile ? "touchstart" : "pointerenter";
    const leaveEventName = isMobile ? "touchend" : "pointerleave";

    if ($(button).attr("data-trigger-method")) return;

    const controller = {
        hover: () => {
            $(button).trigger(ButtonEventName.HOVER);
        },
        leave: () => {
            $(button).trigger(ButtonEventName.LEAVE);
        },
        destroy: () => {
            $(button).off(enterEventName + ".hover", controller.hover);
            $(button).off(leaveEventName + ".hover", controller.leave);
            $(button).off(ButtonEventName.DESTROY, controller.destroy);
        },
    };

    $(button).on(enterEventName + ".hover", controller.hover);
    $(button).on(leaveEventName + ".hover", controller.leave);
    $(button).on(ButtonEventName.DESTROY, controller.destroy);
}

/**
 * 初始化按钮Lottie图标效果
 * @param button - 按钮DOM元素
 */
export function initLottieIcon(button: HTMLElement) {
    const lottieIcons = $(button).find(
        `.${$pageStyle["btn-before-lottie-icon"]}, .${$pageStyle["btn-after-lottie-icon"]}`
    );

    if (!lottieIcons.length) return;

    function handleLottie(lottieDom: DotLottiePlayer, action: "hover" | "ready" | "reset") {
        if (!lottieDom) return;

        const lottieItem = lottieDom.getLottie();
        if (!lottieItem) return;

        switch (action) {
            case "hover":
                $(lottieDom).data("playerDir", 1);
                lottieItem.setDirection(1);
                lottieItem.play();
                break;
            case "ready":
                lottieItem.autoplay = true;
                lottieItem.loop = false;
                lottieItem.play();
                break;
            case "reset":
                const playerDir = $(lottieDom).data("playerDir");
                lottieItem.goToAndStop(playerDir == -1 ? lottieItem.totalFrames - 1 : 0, true);
                break;
        }
    }

    const controller = {
        hover: () => {
            lottieIcons.each((_, el) => {
                handleLottie(el as DotLottiePlayer, "hover");
            });
        },
        destroy: () => {
            lottieIcons.off(".hoverLottie");
            $(button).off(ButtonEventName.HOVER, controller.hover);
            $(button).off(ButtonEventName.DESTROY, controller.destroy);
        },
    };

    lottieIcons
        .on("ready.hoverLottie", (ev) => {
            handleLottie(ev.currentTarget as DotLottiePlayer, "ready");
        })
        .on("complete.hoverLottie", (ev) => {
            handleLottie(ev.currentTarget as DotLottiePlayer, "reset");
        });

    $(button).on(ButtonEventName.HOVER, controller.hover).on(ButtonEventName.DESTROY, controller.destroy);
}
