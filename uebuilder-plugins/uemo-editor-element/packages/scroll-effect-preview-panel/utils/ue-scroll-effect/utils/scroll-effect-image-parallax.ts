/*
 * @Description: 圖片視差滾動效果
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 15:31:43
 */

import type { ScrollImageParallaxOptions } from "../../../../scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

import $pageStyle from "../app.module.scss";
import { ScrollEffectEventEventBus } from "./event-bus";
import { defaultScrollOptions } from "../../../../scroll-effect-setting-panel/utils/helper";

/**
 * 初始化圖片視差滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
export async function initImageParallaxScrollEffect(
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
