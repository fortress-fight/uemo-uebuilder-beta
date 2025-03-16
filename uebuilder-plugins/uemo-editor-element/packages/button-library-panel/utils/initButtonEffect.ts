import type { DotLottiePlayer } from "@stone/uemo-editor-utils/lib/lottie";

import mitt from "mitt";
import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import { mobileCheck } from "@stone/uemo-editor-utils/lib/device-check";

import $pageStyle from "./app.module.scss";

enum ButtonEventName {
    RESIZE = "ue.button.resize",
    HOVER = "ue.button.hover",
    LEAVE = "ue.button.leave",
    PLAY = "ue.button.play",
    DESTROY = "ue.button.destroy",
}

/**
 * 初始化按钮波浪效果
 * @param button - 按钮DOM元素
 * @returns 返回控制器对象，包含播放和销毁方法
 */
async function initWaveEffect(button: HTMLElement) {
    // 动态导入GSAP相关依赖
    const { gsap, SplitText, CustomEase } = await import("@stone/uemo-editor-utils/lib/gsap");

    // 创建自定义缓动效果
    CustomEase.create("customEase1", ".46,.4,.56,.87");

    // 获取文本容器和原始文本
    const textBox = button?.querySelector<HTMLElement>("." + $pageStyle["btn-text"]);
    const originText = textBox?.textContent;

    // 初始化文本分割
    // @ts-expect-error
    const text = new SplitText(textBox, { tag: "span", type: "chars" });
    const chars = text.chars;

    /**
     * 创建GSAP动画时间轴
     * 设置初始状态并配置动画效果
     */
    const timeline = gsap.timeline({
        paused: true,
        onStart() {
            gsap.set(chars, { opacity: 0, display: "inline-block" });
        },
    });

    // 添加字符动画
    timeline.to(chars, {
        keyframes: {
            "0%": { opacity: 0, yPercent: 80 },
            "45%": { opacity: 1, yPercent: -20 },
            "100%": { opacity: 1, yPercent: 0 },
        },
        duration: 0.7,
        ease: "customEase1",
        stagger: 0.015,
    });

    /**
     * 创建动画控制器
     */
    const controller = {
        play: () => timeline.play(0),
        destroy: () => {
            timeline.kill();
            $(textBox!).text(originText || "");
            $(button).off(ButtonEventName.PLAY, controller.play);
            $(button).off(ButtonEventName.DESTROY, controller.destroy);
        },
    };

    // 将控制器绑定到按钮元素
    $(button).on(ButtonEventName.PLAY, () => {
        controller.play();
    });

    $(button).on(ButtonEventName.DESTROY, () => {
        controller.destroy();
    });
}
/**
 * 初始化按钮旋转效果
 * @param button - 按钮DOM元素
 */
function initRotateEffect(button: HTMLElement) {
    const updateOriginX = () => {
        if (!button) return;
        const height = button?.offsetHeight || 0;
        button.style.setProperty("--origin-z", `${-height / 2}px`);
    };

    $(button).on(ButtonEventName.RESIZE, updateOriginX);
    updateOriginX();

    const controller = {
        play: () => {
            //
        },
        destroy: () => {
            $(button).off(ButtonEventName.RESIZE, updateOriginX);
            $(button).off(ButtonEventName.PLAY, controller.play);
            $(button).off(ButtonEventName.DESTROY, controller.destroy);
        },
    };

    $(button).on(ButtonEventName.PLAY, () => {
        controller.play();
    });

    $(button).on(ButtonEventName.DESTROY, () => {
        controller.destroy();
    });
}

/**
 * 初始化按钮背景悬浮效果
 * @param button - 按钮DOM元素
 */
async function initBackgroundHoverEffect(button: HTMLElement) {
    // 动态导入GSAP
    const { gsap } = await import("@stone/uemo-editor-utils/lib/gsap");

    // 获取按钮样式
    const btnStyle = button.style;

    // 处理背景色
    const getBackgroundColor = () => {
        const oldBg = btnStyle.getPropertyValue("--background-color");
        const bg = btnStyle.getPropertyValue("--background") || "transparent";
        return oldBg || bg;
    };

    // 处理悬浮背景色
    const getHoverBackgroundColor = () => {
        const oldHoverBg = btnStyle.getPropertyValue("--hover-bg-color");
        const hoverBg = btnStyle.getPropertyValue("--hover-background");
        return oldHoverBg || hoverBg;
    };

    // 转换为线性渐变
    const toLinearGradient = (color: string) => {
        if (!color || color.includes("linear-gradient")) return color;
        return `linear-gradient(90deg, ${color} 0%, ${color} 100%)`;
    };

    // 初始化颜色
    const color = btnStyle.getPropertyValue("--color");
    const hoverColor = btnStyle.getPropertyValue("--hover-color") || color;
    const bgColor = toLinearGradient(getBackgroundColor());
    const hoverBgColor = toLinearGradient(getHoverBackgroundColor()) || bgColor;

    // 判断是否需要动画过渡
    const needsAnimation = bgColor.includes("linear-gradient") || hoverBgColor?.includes("linear-gradient");

    // 设置过渡效果
    $(button).css("transition", needsAnimation ? "0.26s ease, background 0s, color 0s" : "0.26s ease, background 0s");

    // 创建动画控制器
    const controller = {
        hover: () => {
            if (!needsAnimation) return;
            gsap.fromTo(
                button,
                { background: bgColor, color: color },
                { background: hoverBgColor, color: hoverColor, duration: 0.3 }
            );
        },
        leave: () => {
            if (!needsAnimation) return;
            gsap.fromTo(
                button,
                { background: hoverBgColor, color: hoverColor },
                { background: bgColor, color: color, duration: 0.3 }
            );
        },
        destroy: () => {
            $(button).off(ButtonEventName.HOVER, controller.hover);
            $(button).off(ButtonEventName.LEAVE, controller.leave);
            $(button).off(ButtonEventName.DESTROY, controller.destroy);
        },
    };

    // 绑定事件
    $(button).on(ButtonEventName.HOVER, controller.hover);
    $(button).on(ButtonEventName.LEAVE, controller.leave);
    $(button).on(ButtonEventName.DESTROY, controller.destroy);

    return controller;
}

/**
 * 初始化按钮悬浮事件
 * @param button - 按钮DOM元素
 */
function initHoverEvent(button: HTMLElement) {
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
function initLottieIcon(button: HTMLElement) {
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

/**
 * 按钮创建器
 * @param theme - 按钮主题
 * @param button - 按钮DOM元素
 */
export async function buttonCreator(theme = "", button?: HTMLElement) {
    if (!button) return;

    initBackgroundHoverEffect(button).catch((error) => {
        console.error(error);
    });

    switch (theme.split("-")[0]) {
        case "wave":
            {
                await initWaveEffect(button).catch((error) => {
                    console.error(error);
                });
            }
            break;

        case "rotate":
            {
                initRotateEffect(button);
            }
            break;

        default:
            break;
    }

    initHoverEvent(button);
    initLottieIcon(button);
}

/**
 * 按钮管理器类 - 负责按钮组件的生命周期管理和功能初始化
 */
export class UeElButton {
    private static instance: UeElButton;
    private static eventBus = mitt<{ [ButtonEventName.RESIZE]: undefined }>();
    private static buttonElements = new Set<HTMLElement>();

    // 使用防抖优化 resize 事件处理
    private static resizeObserver = new ResizeObserver(
        _debounce(() => UeElButton.eventBus.emit(ButtonEventName.RESIZE), 200)
    );

    /**
     * 触发指定事件
     * @param eventName - 事件名称
     * @param button - 按钮DOM元素
     */
    static triggerEvent(eventName: ButtonEventName, button: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>) {
        if (Array.isArray(button)) {
            button.forEach((btn) => {
                $(btn).trigger(eventName);
            });
        } else {
            $(button).trigger(eventName);
        }
    }

    // 标记 Lottie 组件是否已初始化
    private isLottieReady = false;

    constructor() {
        if (UeElButton.instance) return UeElButton.instance;
        UeElButton.instance = this;
    }

    /**
     * 初始化 Lottie 动画组件
     */
    private async initLottieComponent(elements: HTMLElement[]) {
        if (elements.length === 0 || this.isLottieReady) return;
        await import("@stone/uemo-editor-utils/lib/lottie");
        this.isLottieReady = true;
    }

    /**
     * 初始化图标组件
     */
    private async initIcons(elements: HTMLElement[]) {
        if (elements.length === 0) return;
        const { initIconParkComponent } = await import("@stone/uemo-editor-utils/lib/icon");
        initIconParkComponent(elements);
    }

    /**
     * 初始化按钮组
     * @param buttons - 需要初始化的按钮DOM元素数组
     */
    public initButton(buttons: HTMLElement[]) {
        // 并行初始化组件
        Promise.all([
            this.initLottieComponent(Array.from($(buttons).find("dotlottie-player"))),
            this.initIcons(Array.from($(buttons).find("iconpark-icon"))),
        ]).catch(console.error);

        // 初始化每个按钮
        buttons.forEach((button) => {
            const theme = $(button).data("theme") || "normal";
            buttonCreator(theme, button).catch(console.error);

            // 添加 resize 监听并记录按钮
            UeElButton.resizeObserver.observe(button);
            UeElButton.buttonElements.add(button);
        });
    }

    /**
     * 销毁指定按钮组
     */
    public destroyButton(buttons: HTMLElement[]) {
        $(buttons).trigger(ButtonEventName.DESTROY);
        buttons.forEach((button) => {
            UeElButton.buttonElements.delete(button);
        });
    }

    /**
     * 清理所有资源
     */
    public destroy() {
        this.isLottieReady = false;
        this.destroyButton(Array.from(UeElButton.buttonElements));
        UeElButton.resizeObserver.disconnect();
        UeElButton.buttonElements.clear();
        UeElButton.eventBus.all.clear();
        UeElButton.buttonElements.clear();
    }
}
