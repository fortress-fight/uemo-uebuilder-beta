/*
 * @Description: 平移滾動效果
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 15:32:30
 */

import type { ScrollTranslateOptions } from "../../../../scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";

import { createScrollEffect } from "./helper";
import { ScrollEffectEventEventBus } from "./event-bus";
import { defaultScrollOptions } from "../../../../scroll-effect-setting-panel/utils/helper";

/**
 * 初始化平移滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
export function initTranslateScrollEffect(
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
