import type { SvgViewerAttrs } from "../src";

import { parseBorderStyle } from "../../../utils/tiptap-helper";
import $pageStyle from "../../../src/app.module.scss";

/**
 * 解析 svgView
 * @param el 元素
 * @returns 解析后的 svgView 属性
 */
export function parseSvgView(el: HTMLElement): SvgViewerAttrs | false {
    if (!(el instanceof HTMLElement)) return false;

    const svgViewer = el.querySelector<HTMLElement>("ue-svg-viewer");
    const source = svgViewer?.getAttribute("src") || "";
    if (!source) return false;

    const frameBoxDom = el.querySelector<HTMLElement>("." + $pageStyle["svg-viewer-box"])!;

    const scrollEffect = el.getAttribute("data-scroll-effect-param");

    const boxStyle = frameBoxDom.style;
    const padding = el.style.getPropertyValue("--padding") || boxStyle.padding;
    const color = svgViewer?.getAttribute("fill-color") || svgViewer?.getAttribute("stroke-color") || "";
    const width = boxStyle.width || boxStyle?.getPropertyValue("--width") || "100px";
    const mdWidth = boxStyle.getPropertyValue("--md-width") || undefined;

    return {
        url: source,
        w: boxStyle.getPropertyValue("--svg-w"),
        h: boxStyle.getPropertyValue("--svg-h"),

        padding,
        color,
        width,
        align: el.style.textAlign as UE_EL_UTIL.ALIGN_X | undefined,
        radius: boxStyle.borderRadius,
        border: parseBorderStyle(boxStyle),
        shadow: boxStyle.boxShadow,
        background: boxStyle.background,

        scrollEffect: scrollEffect ? JSON.parse(scrollEffect) : undefined,

        md: { width: mdWidth },
    };
}
