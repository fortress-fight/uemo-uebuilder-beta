import type {
    ScrollBaseOptions,
    ScrollOpacityOptions,
    ScrollRotateOptions,
    ScrollScaleOptions,
    ScrollTranslateOptions,
    ScrollStickyOptions,
    ScrollFixedOptions,
    ScrollParallaxOptions,
    ScrollImageParallaxOptions,
    UeElScrollEffectSettingPanelValue,
} from "../../../../../packages/scroll-effect-setting-panel";

import { defaultScrollOptions } from "../../../../../packages/scroll-effect-setting-panel/utils/helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { gsap, ScrollTrigger } from "@stone/uemo-editor-utils/lib/gsap";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

import $pageStyle from "../app.module.scss";
import { ScrollEffectEventEventBus } from "./event-bus";
import { i18n } from "../../../../../src/i18n";

/**
 * 滾動效果工廠DOM參數接口
 */
export type UeScrollEffectFactoryDomParams = {
    /** 舞臺元素 */
    stage: HTMLElement;
    /** 滾動容器元素 */
    scroller?: HTMLElement;
    /** 是否開啟調試模式 */
    debugger?: boolean;
};

function updateScrollMarkerText(start: string, end: string) {
    const { t } = i18n.global;

    const [tStart, cStart] = start.split(" ");
    const [tEnd, cEnd] = end.split(" ");
    const textMap: Record<string, string> = { top: t("UNIT_TOP"), center: t("UNIT_CENTER"), bottom: t("UNIT_BOTTOM") };

    $(".gsap-marker-scroller-start")
        .text(`${textMap[cStart]} [${t("UNIT_START")}]`)
        .css({ width: "auto", "border-width": "0px 0px 2px" });
    $(".gsap-marker-scroller-end")
        .text(`${textMap[cEnd]} [${t("UNIT_END")}]`)
        .css({ width: "auto", "border-width": "2px 0px 0px" });
    $(".gsap-marker-start")
        .text(`${textMap[tStart]} [${t("UNIT_START")}]`)
        .css({ width: "auto", "border-width": "0px 0px 2px" });
    $(".gsap-marker-end")
        .text(`${textMap[tEnd]} [${t("UNIT_END")}]`)
        .css({ width: "auto", "border-width": "2px 0px 0px" });
}

/**
 * 獲取滾動效果的觸發參數
 * @param dom - 目標DOM元素
 * @param params - 滾動效果參數
 * @returns ScrollTrigger的靜態變量配置
 */
function getScrollEffectParams(
    dom: HTMLElement,
    params: {
        options: MakeRequired<ScrollBaseOptions, "startPos" | "endPos">;
        scroller?: HTMLElement;
        debugger?: boolean;
    }
): ScrollTrigger.StaticVars {
    const { startPos, endPos, startPosDis, endPosDis, triggerMode, triggerDelay, triggerDuration, triggerEase } =
        params.options;

    // 計算帶有偏移量的起始和結束位置
    const startParam = startPosDis ? `${startPos}+=${startPosDis}` : startPos;
    const endParam = endPosDis ? `${endPos}+=${endPosDis}` : endPos;

    // 創建基礎滾動觸發參數
    const scrollTriggerParam: ScrollTrigger.StaticVars = {
        trigger: dom,
        start: startParam,
        end: endParam,
        scrub: 0.8,
        scroller: params.scroller,
    };

    // 創建進度動畫
    const progress = { value: 0 };
    const progressAnimation = gsap.to(progress, {
        ease: "none",
        value: 1,
        paused: true,
        duration: 1,
        onUpdate: () => {
            $(dom).css({
                "--scroll-progress": `${progress.value}`,
            });
        },
    });

    if (triggerMode === "enter-leaver") {
        // 進入離開模式的配置
        const delayValue = triggerDelay ? parseFloat(triggerDelay) : 0;
        const duration = triggerDuration ? parseFloat(triggerDuration) : 1;
        const ease = triggerEase || "power3.out";

        return {
            ...scrollTriggerParam,
            scrub: false,
            animation: gsap.to(progressAnimation, {
                ease,
                duration,
                time: progressAnimation.duration(),
                delay: delayValue,
                repeatDelay: delayValue,
            }),
            toggleActions: "play none none reverse",
        };
    }

    // 默認滾動模式的配置
    return {
        ...scrollTriggerParam,
        animation: gsap.to(progressAnimation, {
            time: progressAnimation.duration(),
            duration: 2,
            ease: "none",
        }),
    };
}

/**
 * 創建滾動效果
 *
 * @param {HTMLElement} dom
 * @param {{
 *         options: ScrollBaseOptions;
 *         scroller?: HTMLElement;
 *         debugger?: boolean;
 *     }} params
 * @return {*}
 */
function createScrollEffect(
    dom: HTMLElement,
    params: {
        options: MakeRequired<ScrollBaseOptions, "startPos" | "endPos">;
        scroller?: HTMLElement;
        debugger?: boolean;
    }
) {
    const scrollTriggerParam = getScrollEffectParams(dom, params);

    if (params.debugger) {
        scrollTriggerParam.markers = {
            startColor: "#ff740e",
            endColor: "#2c48ff",
            fontSize: "14px",
            fontWeight: "bold",
            indent: 0,
        };
    }
    const scrollControl = ScrollTrigger.create(scrollTriggerParam);

    if (params.debugger) {
        const { endPos, startPos } = params.options;

        updateScrollMarkerText(startPos, endPos);
    }

    function resizeCallBack() {
        requestAnimationFrame(() => {
            scrollControl.refresh();
        });
    }

    const debounceResizeCallback = _debounce(resizeCallBack, 200);
    const debounceResizeCallbackVisible = _debounce(() => {
        scrollControl.endAnimation();
    }, 200);

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.resize", debounceResizeCallback);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.hidden", debounceResizeCallbackVisible);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", resizeCallBack);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.window-resize", debounceResizeCallback);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        scrollControl.kill();

        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.resize", debounceResizeCallback);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.hidden", debounceResizeCallbackVisible);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.update", resizeCallBack);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.window-resize", debounceResizeCallback);
    });

    return { scrollControl };
}

/**
 * 初始化透明度滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
function initOpacityScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollOpacityOptions = {}
) {
    const useOptions = Object.assign(defaultScrollOptions.opacity, options);

    $(dom).css({
        "--scroll-start": useOptions.start,
        "--scroll-end": useOptions.end,
    });
    createScrollEffect(dom, { scroller: params.scroller, options: useOptions, debugger: params.debugger });

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        $(dom).css({ "--scroll-start": "", "--scroll-end": "" });
    });
}

/**
 * 初始化旋轉滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
function initRotateScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollRotateOptions = {}
) {
    const useOptions = Object.assign(defaultScrollOptions.rotate, options);

    const axis = useOptions.axis;
    $(dom).attr("data-axis", axis);

    $(dom).css({
        "--scroll-opacity-start": useOptions.opacityStart,
        "--scroll-opacity-end": useOptions.opacityEnd,
        "--scroll-start": useOptions.start,
        "--scroll-end": useOptions.end,
    });

    createScrollEffect(dom, { scroller: params.scroller, options: useOptions, debugger: params.debugger });

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        $(dom).css({
            "--scroll-opacity-start": "",
            "--scroll-opacity-end": "",
            "--scroll-start": "",
            "--scroll-end": "",
        });
    });
}

/**
 * 初始化縮放滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
function initScaleScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollScaleOptions = {}
) {
    const useOptions = Object.assign(defaultScrollOptions.scale, options);

    $(dom).css({
        "--scroll-opacity-start": useOptions.opacityStart,
        "--scroll-opacity-end": useOptions.opacityEnd,
        "--scroll-start": useOptions.start,
        "--scroll-end": useOptions.end,
    });

    createScrollEffect(dom, { scroller: params.scroller, options: useOptions, debugger: params.debugger });

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        $(dom).css({
            "--scroll-opacity-start": "",
            "--scroll-opacity-end": "",
            "--scroll-start": "",
            "--scroll-end": "",
        });
    });
}

/**
 * 初始化平移滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
function initTranslateScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollTranslateOptions = {}
) {
    const useOptions = Object.assign(defaultScrollOptions.translate, options);

    $(dom).css({
        "--scroll-opacity-start": useOptions.opacityStart,
        "--scroll-opacity-end": useOptions.opacityEnd,
        "--scroll-x-start": useOptions.xStart,
        "--scroll-x-end": useOptions.xEnd,
        "--scroll-y-start": useOptions.yStart,
        "--scroll-y-end": useOptions.yEnd,
    });

    createScrollEffect(dom, { scroller: params.scroller, options: useOptions, debugger: params.debugger });

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        $(dom).css({
            "--scroll-opacity-start": "",
            "--scroll-opacity-end": "",
            "--scroll-x-start": "",
            "--scroll-x-end": "",
            "--scroll-y-start": "",
            "--scroll-y-end": "",
        });
    });
}

/**
 * 初始化粘性滾動效果
 *
 * @param {HTMLElement} dom
 * @param {UeScrollEffectFactoryDomParams} params
 * @param {ScrollStickyOptions} [options={}]
 */
function initStickyScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollStickyOptions = {}
) {
    const useOptions = Object.assign(defaultScrollOptions.sticky, options);

    function getPaddingArr() {
        const arr = useOptions.padding.split(/\s+/);
        if (arr.length === 1) {
            return [arr[0], arr[0], arr[0], arr[0]];
        }
        if (arr.length === 2) {
            return [arr[0], arr[1], arr[0], arr[1]];
        }
        if (arr.length === 3) {
            return [arr[0], arr[1], arr[2], arr[1]];
        }
        if (arr.length === 4) {
            return [arr[0], arr[1], arr[2], arr[3]];
        }
        return [arr[0], arr[0], arr[0], arr[0]];
    }

    const ctrl = ScrollTrigger.create({
        trigger: dom,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        scroller: params.scroller,
        start: "top top+=" + parseFloat(getPaddingArr()[0]),
        end: () => {
            const distance = params.stage.clientHeight - dom.offsetTop;
            const padding = parseFloat(getPaddingArr()[2]);
            return `top+=${distance - padding} ${dom.clientHeight + padding}`;
        },
        markers: params.debugger
            ? {
                  startColor: "#ff740e",
                  endColor: "#2c48ff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  indent: 0,
              }
            : false,
    });
    if (params.debugger) {
        updateScrollMarkerText("top top", "bottom bottom");
    }

    const updateSticky = _debounce(() => {
        ctrl.refresh();
    }, 200);

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", updateSticky);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        ctrl.kill();
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.update", updateSticky);
    });
}

async function initFixedScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollFixedOptions = {}
) {
    const useOptions = Object.assign(defaultScrollOptions.fixed, options);

    const { ueParallaxController } = await import("@stone/uemo-editor-utils/lib/parallax-controller");

    if (params.scroller) {
        ueParallaxController.updateScrollContainer(params.scroller);
    }

    const rect = dom.getBoundingClientRect();
    const wH = params.scroller ? params.scroller.clientHeight : window.innerHeight;
    const margin = wH + (wH - rect.height) / 2;
    const moveYNum = parseFloat(useOptions.moveY);
    const translateY: [string, string] = ["-" + (wH * 2 - moveYNum) + "px", wH * 2 + moveYNum + "px"];

    const ctrl = ueParallaxController.createElement([dom], {
        rootMargin: { top: margin, right: 0, bottom: margin, left: 0 },
        translateY,
    });

    const updateParallax = _debounce(() => {
        ctrl.update();
    }, 200);

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.resize", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.window-resize", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        ctrl.destroy();
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.update", updateParallax);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.resize", updateParallax);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.window-resize", updateParallax);
    });
}

/**
 * 初始化視差滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
async function initParallaxScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollParallaxOptions = {}
) {
    const { ueParallaxController } = await import("@stone/uemo-editor-utils/lib/parallax-controller");

    const useOptions = Object.assign(defaultScrollOptions.parallax, options);

    if (params.scroller) {
        ueParallaxController.updateScrollContainer(params.scroller);
    }

    const ctrl = ueParallaxController.createElement([dom], {
        speed: parseFloat(useOptions.speed),
    });

    const updateParallax = _debounce(() => {
        ctrl.update();
    }, 200);

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.resize", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.window-resize", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        ctrl.destroy();
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.update", updateParallax);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.resize", updateParallax);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.window-resize", updateParallax);
    });
}

/**
 * 初始化圖片視差滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
async function initImageParallaxScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollImageParallaxOptions = {}
) {
    const { Ukiyo } = await import("@stone/uemo-editor-utils/lib/ukiyojs");

    const useOptions = Object.assign(defaultScrollOptions["image-parallax"], options);

    $(params.stage).attr("data-image-parallax-mode", useOptions.mode);

    const ctrl = new Ukiyo(dom, {
        scale: 1.5,
        speed: 1.3,
        willChange: true,
        externalRAF: false,
        wrapperClass: $pageStyle["js-image-parallax"],
    });

    const updateParallax = _debounce(() => {
        ctrl.reset();
    }, 200);

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.resize", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.window-resize", updateParallax);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        ctrl.destroy();
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.update", updateParallax);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.resize", updateParallax);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.window-resize", updateParallax);
    });
}

/**
 * 初始化單個元素的滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 */
export function initScrollEffect(dom: HTMLElement, params: UeScrollEffectFactoryDomParams) {
    $(params.stage).removeData("scroll-effect");
    const scrollEffectParams = $(params.stage).data("scroll-effect") as UeElScrollEffectSettingPanelValue;

    $(dom).addClass($pageStyle["js-scroll-container"]);
    $(params.stage).addClass($pageStyle["js-scroll-effect"]);

    switch (scrollEffectParams.type) {
        case "opacity":
            initOpacityScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "rotate":
            initRotateScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "scale":
            initScaleScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "translate":
            initTranslateScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "sticky":
            initStickyScrollEffect(dom, params, scrollEffectParams.options);
            break;
        case "fixed":
            initFixedScrollEffect(dom, params, scrollEffectParams.options).catch((error) => {
                console.error(error);
            });
            break;
        case "parallax":
            initParallaxScrollEffect(dom, params, scrollEffectParams.options).catch((error) => {
                console.error(error);
            });
            break;
        case "image-parallax":
            initImageParallaxScrollEffect(dom, params, scrollEffectParams.options).catch((error) => {
                console.error(error);
            });
            break;
        default:
            break;
    }

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        $(dom).removeClass($pageStyle["js-scroll-container"]);
        $(params.stage).removeClass($pageStyle["js-scroll-effect"]);
    });
}
