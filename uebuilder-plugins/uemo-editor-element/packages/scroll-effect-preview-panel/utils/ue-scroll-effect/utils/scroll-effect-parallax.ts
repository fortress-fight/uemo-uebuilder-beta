/*
 * @Description: 視差滾動效果
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 15:31:59
 */

import type { ScrollParallaxOptions } from "../../../../scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";

import { defaultScrollOptions } from "../../../../scroll-effect-setting-panel/utils/helper";
import { ScrollEffectEventEventBus } from "./event-bus";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

/**
 * 初始化視差滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
export async function initParallaxScrollEffect(
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
