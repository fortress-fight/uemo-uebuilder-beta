import type { ScrollBaseOptions } from "../../../../../packages/scroll-effect-setting-panel";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import { gsap, ScrollTrigger } from "@stone/uemo-editor-utils/lib/gsap";

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

export function updateScrollMarkerText(start: string, end: string) {
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
 * 創建默認的滾動效果進度動畫
 * @param dom - 目標DOM元素
 * @returns 進度動畫
 */
function defaultScrollSTAnimation(
    dom: HTMLElement,
    options: MakeRequired<ScrollBaseOptions, "startPos" | "endPos">
): gsap.core.Timeline {
    const { triggerDelay, triggerDuration, triggerEase } = options;

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

    if (options.triggerMode === "enter-leaver") {
        // 進入離開模式的配置
        const delayValue = triggerDelay ? parseFloat(triggerDelay) : 0;
        const duration = triggerDuration ? parseFloat(triggerDuration) : 1;
        const ease = triggerEase || "power3.out";

        return gsap.timeline().to(progressAnimation, {
            ease,
            duration,
            time: progressAnimation.duration(),
            delay: delayValue,
            repeatDelay: delayValue,
        });
    } else {
        return gsap.timeline().to(progressAnimation, {
            time: progressAnimation.duration(),
            duration: 2,
            ease: "none",
        });
    }
}

/**
 * 創建滾動效果觸發器
 * @param dom - 目標DOM元素
 * @param params - 滾動效果參數
 * @returns ScrollTrigger的靜態變量配置
 */
function createScrollEffectST(
    dom: HTMLElement,
    params: {
        options: MakeRequired<ScrollBaseOptions, "startPos" | "endPos">;
        scroller?: HTMLElement;
        debugger?: boolean;
        animation?: gsap.core.Timeline;
    }
): { refresh: () => void; destroy: () => void } {
    const { startPos, endPos, startPosDis, endPosDis, triggerMode } = params.options;

    // 計算帶有偏移量的起始和結束位置
    const startParam = startPosDis ? `${startPos}+=${startPosDis}` : startPos;
    const endParam = endPosDis ? `${endPos}+=${endPosDis}` : endPos;

    // 創建基礎滾動觸發參數
    let scrollTriggerParam: ScrollTrigger.StaticVars = {
        trigger: dom,
        start: startParam,
        end: endParam,
        scrub: 0.8,
        scroller: params.scroller,
        onRefreshInit: () => {
            $(dom).addClass(`${$pageStyle["js-disable-scroll-effect"]}`);
        },
        onRefresh: () => {
            $(dom).removeClass(`${$pageStyle["js-disable-scroll-effect"]}`);
        },
    };

    // 創建進度動畫
    const animation = params.animation || defaultScrollSTAnimation(dom, params.options);

    if (triggerMode === "enter-leaver") {
        scrollTriggerParam = {
            ...scrollTriggerParam,
            scrub: false,
            animation,
            toggleActions: "play none none reverse",
        };
    } else {
        // 默認滾動模式的配置
        scrollTriggerParam = {
            ...scrollTriggerParam,
            animation,
        };
    }

    if (params.debugger) {
        scrollTriggerParam.markers = {
            startColor: "#ff740e",
            endColor: "#2c48ff",
            fontSize: "14px",
            fontWeight: "bold",
            indent: 0,
        };
    }

    // FIXME: `${$pageStyle["js-disable-scroll-effect"]}` 用于解决在初始化时，元素已经产生位移，导致滚动触发位置与预期不符的问题。这种方式并非是最佳方式，最佳方式是通过外部层来进行触发位置的计算，目前缺少外部层级，所以暂时采用这种方式。
    $(dom).addClass(`${$pageStyle["js-disable-scroll-effect"]}`);
    const scrollControl = ScrollTrigger.create(scrollTriggerParam);
    $(dom).removeClass(`${$pageStyle["js-disable-scroll-effect"]}`);

    const resetSt = ScrollTrigger.create({ trigger: dom, onLeaveBack: () => scrollControl.animation?.pause(0) });

    return {
        refresh: () => {
            resetSt.refresh();
            scrollControl.refresh();
        },
        destroy: () => {
            resetSt.kill();
            scrollControl.kill();
        },
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
export function createScrollEffect(
    dom: HTMLElement,
    params: {
        options: MakeRequired<ScrollBaseOptions, "startPos" | "endPos">;
        scroller?: HTMLElement;
        debugger?: boolean;
        animation?: gsap.core.Timeline;
    }
) {
    const scrollEffectST = createScrollEffectST(dom, params);

    if (params.debugger) {
        const { endPos, startPos } = params.options;

        updateScrollMarkerText(startPos, endPos);
    }

    function resizeCallBack() {
        requestAnimationFrame(() => {
            scrollEffectST.refresh();
        });
    }

    const debounceResizeCallback = _debounce(resizeCallBack, 200);

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.resize", debounceResizeCallback);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.update", resizeCallBack);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.window-resize", debounceResizeCallback);
    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        scrollEffectST.destroy();

        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.resize", debounceResizeCallback);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.update", resizeCallBack);
        ScrollEffectEventEventBus.unbind($(dom), "ue.scroll-effect.window-resize", debounceResizeCallback);
    });
}
