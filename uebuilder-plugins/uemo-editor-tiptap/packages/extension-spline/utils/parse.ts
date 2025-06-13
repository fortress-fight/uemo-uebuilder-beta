/*
 * @Description: 解析 spline 元素
 * @Author: F-Stone
 * @LastEditTime: 2025-06-13 09:10:36
 */

import type { SplineAttrs } from "../src";

import $pageStyle from "../../../src/app.module.scss";
import { parseBorderStyle } from "../../../utils/tiptap-helper";

export function parseSpline(el: HTMLElement): SplineAttrs | false {
    if (!(el instanceof HTMLElement)) return false;

    const splineBoxDom = el.querySelector<HTMLElement>("." + $pageStyle["spline-box"])!;

    const splineStyle = splineBoxDom.style;

    return {
        url: el.getAttribute("data-url") || "",
        ratio: el.getAttribute("data-ratio") || "",
        align: el.style.textAlign as UE_EL_UTIL.ALIGN_X | undefined,
        radius: splineStyle.borderRadius,
        w: splineStyle.getPropertyValue("--spline-w"),
        h: splineStyle.getPropertyValue("--spline-h"),
        width: splineStyle.width,
        border: parseBorderStyle(splineStyle),
        shadow: splineStyle.boxShadow,
        background: splineStyle.background || splineStyle.backgroundColor,
    };
}
