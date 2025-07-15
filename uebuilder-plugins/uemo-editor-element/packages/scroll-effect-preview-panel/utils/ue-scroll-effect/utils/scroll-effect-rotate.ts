/*
 * @Description: 旋轉滾動效果
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 15:32:05
 */

import type { ScrollRotateOptions } from "../../../../scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";

import { defaultScrollOptions } from "../../../../scroll-effect-setting-panel/utils/helper";
import { ScrollEffectEventEventBus } from "./event-bus";
import { createScrollEffect } from "./helper";

/**
 * 初始化旋轉滾動效果
 * @param dom - 目標DOM元素
 * @param params - 初始化參數
 * @param options - 滾動效果參數
 */
export function initRotateScrollEffect(
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
