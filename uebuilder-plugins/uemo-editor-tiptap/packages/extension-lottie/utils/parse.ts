/*
 * @Description: 解析 lottie 元素
 * @Author: F-Stone
 * @LastEditTime: 2025-06-14 01:09:49
 */

import type { LottieAttrs } from "../src";

import $pageStyle from "../../../src/app.module.scss";
import { parseBorderStyle } from "../../../utils/tiptap-helper";

function isJSONString(str = "") {
    try {
        return JSON.parse(str);
    } catch (_error) {
        return str;
    }
}

export function parseLottie(el: HTMLElement): LottieAttrs | false {
    if (!(el instanceof HTMLElement)) return false;

    const lottieBoxDom = el.querySelector<HTMLElement>("." + $pageStyle["lottie-box"])!;
    const lottieViewer = el.querySelector<HTMLElement>("." + $pageStyle["lottie-viewer"])!;

    const lottieBoxStyle = lottieBoxDom.style;
    const lottieViewerStyle = lottieViewer.style;
    const dataTrigger = el.getAttribute("data-trigger");
    const triggerInfo = dataTrigger ? isJSONString(dataTrigger) : undefined;

    return {
        url: el.getAttribute("data-url") || "",
        trigger: triggerInfo || undefined,
        align: el.style.textAlign as UE_EL_UTIL.ALIGN_X | undefined,
        radius: lottieBoxStyle.borderRadius,
        color: lottieBoxStyle.color,
        w: lottieBoxStyle.getPropertyValue("--lottie-w"),
        h: lottieBoxStyle.getPropertyValue("--lottie-h"),
        width: lottieBoxStyle.width,
        border: parseBorderStyle(lottieBoxStyle),
        shadow: lottieBoxStyle.boxShadow,
        padding: lottieViewerStyle.padding,
        background: lottieBoxStyle.background || lottieBoxStyle.backgroundColor,
    };
}
