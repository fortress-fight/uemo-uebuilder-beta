import type { DotLottiePlayer } from "@stone/uemo-editor-utils/lib/lottie";

import mitt from "mitt";
import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import { mobileCheck } from "@stone/uemo-editor-utils/lib/device-check";

import $pageStyle from "./app.module.scss";

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
            $(button).off("ue.button.play", controller.play);
            $(button).off("ue.button.destroy", controller.destroy);
        },
    };

    // 将控制器绑定到按钮元素
    $(button).on("ue.button.play", () => {
        controller.play();
    });

    $(button).on("ue.button.destroy", () => {
        controller.destroy();
    });
}

function initRotateEffect(button: HTMLElement) {
    const updateOriginX = () => {
        if (!button) return;
        const height = button?.offsetHeight || 0;
        button.style.setProperty("--origin-z", `${-height / 2}px`);
    };

    $(button).on("resize.button", updateOriginX);
    updateOriginX();

    const controller = {
        play: () => {
            //
        },
        destroy: () => {
            $(button).off("resize.button", updateOriginX);
            $(button).off("ue.button.play", controller.play);
            $(button).off("ue.button.destroy", controller.destroy);
        },
    };

    $(button).on("ue.button.play", () => {
        controller.play();
    });

    $(button).on("ue.button.destroy", () => {
        controller.destroy();
    });
}

async function initHoverEffect(button: HTMLElement) {
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
    const hoverBgColor = toLinearGradient(getHoverBackgroundColor());

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
            $(button).off("ue.button.hover", controller.hover);
            $(button).off("ue.button.leave", controller.leave);
            $(button).off("ue.button.destroy", controller.destroy);
        },
    };

    // 绑定事件
    $(button).on("ue.button.hover", controller.hover);
    $(button).on("ue.button.leave", controller.leave);
    $(button).on("ue.button.destroy", controller.destroy);

    return controller;
}

function initHoverEvent(button: HTMLElement) {
    const isMobile = mobileCheck();
    const enterEventName = isMobile ? "touchstart" : "pointerenter";
    const leaveEventName = isMobile ? "touchend" : "pointerleave";
    const method = $(button).attr("data-trigger-method");

    if (!method) {
        const controller = {
            hover: () => {
                $(button).trigger("ue.button.hover");
            },
            leave: () => {
                $(button).trigger("ue.button.leave");
            },
            destroy: () => {
                $(button).off(enterEventName + ".hover", controller.hover);
                $(button).off(leaveEventName + ".hover", controller.leave);
                $(button).off("ue.button.destroy", controller.destroy);
            },
        };

        $(button).on(enterEventName + ".hover", controller.hover);
        $(button).on(leaveEventName + ".hover", controller.leave);
        $(button).on("ue.button.destroy", controller.destroy);
    }
}

function initLottieIcon(button: HTMLElement) {
    const beforeLottieIcon = $(button).find("." + $pageStyle["btn-before-lottie-icon"]);
    const afterLottieIcon = $(button).find("." + $pageStyle["btn-after-lottie-icon"]);

    function hoverLottie() {
        const beforeLottie = beforeLottieIcon[0] as DotLottiePlayer;
        if (beforeLottie) {
            $(beforeLottie).data("playerDir", 1);
            const beforeLottieItem = beforeLottie.getLottie();
            beforeLottieItem?.setDirection(1);
            beforeLottieItem?.play();
        }

        const afterLottie = afterLottieIcon[0] as DotLottiePlayer;
        if (afterLottie) {
            $(afterLottie).data("playerDir", 1);
            const afterLottieItem = afterLottie.getLottie();
            afterLottieItem?.setDirection(1);
            afterLottieItem?.play();
        }
    }

    function resetLottie(lottieDom: DotLottiePlayer) {
        if (!lottieDom) return;
        const lottieItem = lottieDom.getLottie();
        lottieItem?.goToAndStop($(lottieDom).data("playerDir") == -1 ? lottieItem.totalFrames - 1 : 0, true);
    }

    function lottieReady(lottieDom: DotLottiePlayer) {
        if (!lottieDom) return;
        const lottieItem = lottieDom.getLottie();
        if (lottieItem) {
            lottieItem.autoplay = true;
            lottieItem.loop = false;
            lottieItem.play();
        }
    }

    $(beforeLottieIcon)
        .add(afterLottieIcon)
        .on("lottieReady.hoverLottie", (ev) => {
            const lottieDom = ev.currentTarget as DotLottiePlayer;
            lottieReady(lottieDom);
        });

    $(beforeLottieIcon)
        .add(afterLottieIcon)
        .on("complete.hoverLottie", (ev) => {
            const lottieDom = ev.currentTarget as DotLottiePlayer;
            resetLottie(lottieDom);
        });

    const controller = {
        hover: () => {
            hoverLottie();
        },
        destroy: () => {
            $(beforeLottieIcon).add(afterLottieIcon).off("complete.hoverLottie");
            $(button).off("ue.button.hover", controller.hover);
            $(button).off("ue.button.destroy", controller.destroy);
        },
    };

    $(button).on("ue.button.hover", controller.hover);
    $(button).on("ue.button.destroy", controller.destroy);
}

export async function buttonCreator(theme = "", button?: HTMLElement) {
    if (!button) return;

    initHoverEffect(button).catch((error) => {
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

export class UeElButton {
    private static instance: UeElButton;
    private static mittManager = mitt<{ "resize.button": undefined }>();
    private static resizeObserver: ResizeObserver = new ResizeObserver(
        _debounce(() => {
            UeElButton.mittManager.emit("resize.button");
        }, 200)
    );
    private static initButtonDoms = new Set<HTMLElement>();

    constructor() {
        if (UeElButton.instance) {
            return UeElButton.instance;
        }
        UeElButton.instance = this;
    }

    dotLottieComponentReady = false;

    async initDotLottie(doms: HTMLElement[]) {
        if (doms.length <= 0 || this.dotLottieComponentReady) return;

        await import("@stone/uemo-editor-utils/lib/lottie");
        this.dotLottieComponentReady = true;
    }

    async initIconPark(doms: HTMLElement[]) {
        if (doms.length <= 0) return;

        const { initIconParkComponent } = await import("@stone/uemo-editor-utils/lib/icon");
        initIconParkComponent(doms);
    }

    initButton(buttonDoms: HTMLElement[]) {
        this.initDotLottie(Array.from($(buttonDoms).find("dotlottie-player"))).catch((err) => {
            console.error(err);
        });

        this.initIconPark(Array.from($(buttonDoms).find("iconpark-icon"))).catch((err) => {
            console.error(err);
        });

        buttonDoms.forEach((button) => {
            const theme = $(button).data("theme");
            buttonCreator(theme || "normal", button).catch((err) => {
                console.error(err);
            });
        });

        buttonDoms.forEach((button) => {
            UeElButton.resizeObserver.observe(button);
            UeElButton.initButtonDoms.add(button);
        });
    }

    destroyButton(buttonDoms: HTMLElement[]) {
        $(buttonDoms).each((_index, button) => {
            $(button).trigger("ue.button.destroy");
        });
    }

    destroy() {
        this.destroyButton(Array.from(UeElButton.initButtonDoms));
        UeElButton.resizeObserver.disconnect();
        UeElButton.initButtonDoms.clear();
        UeElButton.mittManager.all.clear();
    }
}
