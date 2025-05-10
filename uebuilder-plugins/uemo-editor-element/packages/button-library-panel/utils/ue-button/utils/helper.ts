import type { DotLottiePlayer } from "@stone/uemo-editor-utils/lib/lottie";

import { mobileCheck } from "@stone/uemo-editor-utils/lib/device-check";
import $ from "@stone/uemo-editor-utils/lib/jquery";

import { ButtonEventEventBus } from "./event-bus";

import $pageStyle from "../app.module.scss";

/**
 * 初始化按钮悬浮事件
 * @param button - 按钮DOM元素
 */
export function initHoverEvent(button: HTMLElement) {
    const isMobile = mobileCheck();
    const enterEventName = isMobile ? "touchstart" : "pointerenter";
    const leaveEventName = isMobile ? "touchend" : "pointerleave";

    if ($(button).attr("data-trigger-method")) return;

    function hover() {
        ButtonEventEventBus.emit($(button), "ue.button.hover");
    }

    function leave() {
        ButtonEventEventBus.emit($(button), "ue.button.leave");
    }

    $(button).on(enterEventName + ".hover", hover);
    $(button).on(leaveEventName + ".hover", leave);

    const controller = {
        hover: () => {
            $(button).addClass($pageStyle["state-hover"]);
        },
        leave: () => {
            $(button).removeClass($pageStyle["state-hover"]);
        },
        destroy: () => {
            $(button).removeClass($pageStyle["state-hover"]);

            $(button).off(enterEventName + ".hover", hover);
            $(button).off(leaveEventName + ".hover", leave);

            ButtonEventEventBus.unbind($(button), "ue.button.hover", controller.hover);
            ButtonEventEventBus.unbind($(button), "ue.button.leave", controller.leave);
            ButtonEventEventBus.unbind($(button), "ue.button.destroy", controller.destroy);
        },
    };

    ButtonEventEventBus.bind($(button), "ue.button.hover", controller.hover);
    ButtonEventEventBus.bind($(button), "ue.button.leave", controller.leave);
    ButtonEventEventBus.bind($(button), "ue.button.destroy", controller.destroy);
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

            ButtonEventEventBus.unbind($(button), "ue.button.hover", controller.hover);
            ButtonEventEventBus.unbind($(button), "ue.button.destroy", controller.destroy);
        },
    };

    lottieIcons
        .on("ready.hoverLottie", (ev) => {
            handleLottie(ev.currentTarget as DotLottiePlayer, "ready");
        })
        .on("complete.hoverLottie", (ev) => {
            handleLottie(ev.currentTarget as DotLottiePlayer, "reset");
        });

    ButtonEventEventBus.bind($(button), "ue.button.hover", controller.hover);
    ButtonEventEventBus.bind($(button), "ue.button.destroy", controller.destroy);
}

/**
 * 初始化按钮SVG图标效果
 * @param button - 按钮DOM元素
 */
export function initSvgIcon(button: HTMLElement) {
    const svgIcons = $(button).find(`.${$pageStyle["btn-before-svg-icon"]}, .${$pageStyle["btn-after-svg-icon"]}`);

    if (!svgIcons.length) return;

    import("@stone/uemo-editor-utils/lib/svg")
        .then(({ initSvgIconComponent }) => {
            return initSvgIconComponent();
        })
        .catch((err) => {
            console.error(err);
        });
}
