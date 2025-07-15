/*
 * @Description: 縮放滾動效果
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 15:32:13
 */

import type { ScrollScaleOptions } from "../../../../scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";

import { defaultScrollOptions } from "../../../../scroll-effect-setting-panel/utils/helper";
import { ScrollEffectEventEventBus } from "./event-bus";
import { createScrollEffect } from "./helper";

/**
 * 初始化縮放滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
export function initScaleScrollEffect(
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
