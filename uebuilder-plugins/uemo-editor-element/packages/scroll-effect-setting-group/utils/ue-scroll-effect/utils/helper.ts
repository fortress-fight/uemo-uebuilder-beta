import type {
    ScrollBaseOptions,
    ScrollOpacityOptions,
    ScrollRotateOptions,
    ScrollScaleOptions,
    ScrollTranslateOptions,
    ScrollStickyOptions,
    UeElScrollEffectSettingPanelValue,
} from "~/packages/scroll-effect-setting-panel";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { gsap, ScrollTrigger } from "@stone/uemo-editor-utils/lib/gsap";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

import $pageStyle from "../app.module.scss";
import { ScrollEffectEventEventBus } from "./event-bus";

/**
 * 滚动效果工厂DOM参数接口
 */
export type UeScrollEffectFactoryDomParams = {
    /** 舞台元素 */
    stage: HTMLElement;
    /** 滚动容器元素 */
    scroller?: HTMLElement;
    /** 是否开启调试模式 */
    debugger?: boolean;
};

const DEFAULT_START = "top bottom";
const DEFAULT_END = "bottom bottom";

function updateScrollMarkerText(start: string, end: string) {
    const [tStart, cStart] = start.split(" ");
    const [tEnd, cEnd] = end.split(" ");
    const textMap: Record<string, string> = { top: "顶部", center: "中间", bottom: "底部" };

    $(".gsap-marker-scroller-start")
        .text("窗口" + textMap[cStart] + "【起始】")
        .css({ width: "auto", "border-width": "0px 0px 2px" });
    $(".gsap-marker-scroller-end")
        .text("窗口" + textMap[cEnd] + "【结束】")
        .css({ width: "auto", "border-width": "2px 0px 0px" });
    $(".gsap-marker-start")
        .text("目标" + textMap[tStart] + "【起始】")
        .css({ width: "auto", "border-width": "0px 0px 2px" });
    $(".gsap-marker-end")
        .text("目标" + textMap[tEnd] + "【结束】")
        .css({ width: "auto", "border-width": "2px 0px 0px" });
}

/**
 * 获取滚动效果的触发参数
 * @param dom - 目标DOM元素
 * @param params - 滚动效果参数
 * @returns ScrollTrigger的静态变量配置
 */
function getScrollEffectParams(
    dom: HTMLElement,
    params: {
        options: ScrollBaseOptions;
        scroller?: HTMLElement;
        debugger?: boolean;
    }
): ScrollTrigger.StaticVars {
    const { startPos, endPos, startPosDis, endPosDis, triggerMode, triggerDelay, triggerDuration, triggerEase } =
        params.options;

    // 设置默认的起始和结束位置
    const start = startPos || DEFAULT_START;
    const end = endPos || DEFAULT_END;

    // 计算带有偏移量的起始和结束位置
    const startParam = startPosDis ? `${start}+=${startPosDis}` : start;
    const endParam = endPosDis ? `${end}+=${endPosDis}` : end;

    // 创建基础滚动触发参数
    const scrollTriggerParam: ScrollTrigger.StaticVars = {
        trigger: dom,
        start: startParam,
        end: endParam,
        scrub: 0.8,
        scroller: params.scroller,
    };

    // 创建进度动画
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
        // 进入离开模式的配置
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

    // 默认滚动模式的配置
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
 * 创建滚动效果
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
        options: ScrollBaseOptions;
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

        const start = startPos || DEFAULT_START;
        const end = endPos || DEFAULT_END;

        updateScrollMarkerText(start, end);
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
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.visible", debounceResizeCallbackVisible);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", resizeCallBack);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.window-resize", debounceResizeCallback);

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        scrollControl.kill();

        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.resize", debounceResizeCallback);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.visible", debounceResizeCallbackVisible);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.update", resizeCallBack);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.window-resize", debounceResizeCallback);
    });

    return { scrollControl };
}

/**
 * 初始化透明度滚动效果
 * @param dom - 目标DOM元素
 * @param params - 初始化参数
 * @param options - 滚动效果参数
 */
function initOpacityScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollOpacityOptions = {}
) {
    $(dom).css({
        "--scroll-start": options.opacityStart || "0",
        "--scroll-end": options.opacityEnd || "1",
    });
    createScrollEffect(dom, { scroller: params.scroller, options, debugger: params.debugger });

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        $(dom).css({ "--scroll-start": "", "--scroll-end": "" });
    });
}

/**
 * 初始化旋转滚动效果
 * @param dom - 目标DOM元素
 * @param params - 初始化参数
 * @param options - 滚动效果参数
 */
function initRotateScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollRotateOptions = {}
) {
    const axis = options.axis || "x-b";
    $(dom).attr("data-axis", axis);

    $(dom).css({
        "--scroll-opacity-start": options.opacityStart || "",
        "--scroll-opacity-end": options.opacityEnd || "",
        "--scroll-start": options.start || "60deg",
        "--scroll-end": options.end || "0deg",
    });

    createScrollEffect(dom, { scroller: params.scroller, options, debugger: params.debugger });

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
 * 初始化缩放滚动效果
 * @param dom - 目标DOM元素
 * @param params - 初始化参数
 * @param options - 滚动效果参数
 */
function initScaleScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollScaleOptions = {}
) {
    $(dom).css({
        "--scroll-opacity-start": options.opacityStart || "",
        "--scroll-opacity-end": options.opacityEnd || "",
        "--scroll-start": options.start || "0.5",
        "--scroll-end": options.end || "1",
    });

    createScrollEffect(dom, { scroller: params.scroller, options, debugger: params.debugger });

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
 * 初始化平移滚动效果
 * @param dom - 目标DOM元素
 * @param params - 初始化参数
 * @param options - 滚动效果参数
 */
function initTranslateScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollTranslateOptions = {}
) {
    $(dom).css({
        "--scroll-opacity-start": options.opacityStart || "0",
        "--scroll-opacity-end": options.opacityEnd || "1",
        "--scroll-x-start": options.xStart || "-50px",
        "--scroll-x-end": options.xEnd || "0px",
        "--scroll-y-start": options.yStart || "0px",
        "--scroll-y-end": options.yEnd || "0px",
    });

    createScrollEffect(dom, { scroller: params.scroller, options, debugger: params.debugger });

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
 * 初始化粘性滚动效果
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
    const stickyOption = Object.assign({ padding: "0px" }, options);

    function getPaddingArr() {
        const arr = stickyOption.padding.split(/\s+/);
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

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", () => {
        ctrl.refresh();
    });
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        ctrl.kill();
    });
}

/**
 * 初始化单个元素的滚动效果
 * @param dom - 目标DOM元素
 * @param params - 初始化参数
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
        default:
            break;
    }

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        $(dom).removeClass($pageStyle["js-scroll-container"]);
        $(params.stage).removeClass($pageStyle["js-scroll-effect"]);
    });
}
