import type { SvgIconAttrs } from "../src";

import $pageStyle from "../../../src/app.module.scss";
import { parseBorderStyle } from "../../../utils/tiptap-helper";

/**
 * 解析图片元素样式
 * @param imgItem - 图片元素
 * @returns 图片样式相关属性
 */
export function parseSvgIcon(svgIcon: HTMLElement): SvgIconAttrs | false {
    if (!(svgIcon instanceof HTMLElement)) return false;

    const svgIconBoxDom = svgIcon.querySelector("." + $pageStyle["svg-icon-box"])!;
    const svgIconViewerDom = svgIcon.querySelector("." + $pageStyle["svg-icon-viewer"]);

    if (!svgIconBoxDom || !svgIconViewerDom) return false;

    const svgIconStyle = svgIcon.style;
    const svgIconBoxStyle = (svgIconBoxDom as HTMLElement).style;

    return {
        name: svgIconViewerDom?.getAttribute("name") || "",
        source: svgIconViewerDom?.getAttribute("data-source") || "",

        align: svgIconStyle.textAlign as UE_EL_UTIL.ALIGN_X,
        color: svgIconBoxStyle.color || "#333",
        radius: svgIconBoxStyle.borderRadius,
        width: svgIconBoxStyle.width,
        border: parseBorderStyle(svgIconBoxStyle),
        shadow: svgIconBoxStyle.boxShadow,
        padding: svgIconBoxStyle.padding,
        background: svgIconBoxStyle.background,
    };
}
