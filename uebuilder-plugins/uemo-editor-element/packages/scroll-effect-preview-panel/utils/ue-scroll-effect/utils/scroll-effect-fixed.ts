/*
 * @Description: 固定滾動效果
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 15:31:25
 */

import type { ScrollFixedOptions } from "../../../../scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";

import { defaultScrollOptions } from "../../../../scroll-effect-setting-panel/utils/helper";
import { ScrollEffectEventEventBus } from "./event-bus";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

/**
 * 初始化固定滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
export async function initFixedScrollEffect(
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
