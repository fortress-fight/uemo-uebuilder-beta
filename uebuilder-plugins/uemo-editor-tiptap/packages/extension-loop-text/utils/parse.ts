/*
 * @Description: 解析跑马灯文本属性
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 16:51:07
 */
import type { LoopTextAttrs } from "../src";

import $pageStyle from "../../../src/app.module.scss";

export function parseLoopTextAttr(dom: HTMLElement): LoopTextAttrs {
    const theme = dom.getAttribute("data-theme") || "NO01";
    const effect = dom.getAttribute("data-effect") || "normal";
    const delay = dom.getAttribute("data-delay") || "2.4";
    const align = dom.getAttribute("data-align") || "";
    const moAlign = dom.getAttribute("data-mo-align") || "";

    const prefixDom = dom.querySelector<HTMLElement>("." + $pageStyle["loop-text--prefix"]);
    const prefix = prefixDom
        ? {
              type: (prefixDom.getAttribute("data-type") as any) || "text",
              value: prefixDom.getAttribute("data-value") || "",
          }
        : undefined;

    const suffixDom = dom.querySelector<HTMLElement>("." + $pageStyle["loop-text--suffix"]);
    const suffix = suffixDom
        ? {
              type: (suffixDom.getAttribute("data-type") as any) || "text",
              value: suffixDom.getAttribute("data-value") || "",
          }
        : undefined;

    const loopTextList = Array.from(dom.querySelectorAll("." + $pageStyle["loop-text-item"])).map((item) => {
        const id = item.getAttribute("data-id") || "";
        const textDom = item.querySelector<HTMLElement>("." + $pageStyle["loop-text-item-text"]);
        const title = textDom?.textContent || "";

        return { id, title };
    });

    const domStyle = dom.style;
    const lineHeight = domStyle.lineHeight?.replace(/['"]+/g, "");
    const fontWeight = domStyle.fontWeight?.replace(/['"]+/g, "");
    const fontSize = domStyle.fontSize;
    const fontFamily = domStyle.fontFamily?.replace(/['"]+/g, "");
    const fontStyle = domStyle.fontStyle?.replace(/['"]+/g, "");
    const textColor = domStyle.getPropertyValue("--loop-text-text-color") || "#333";
    const width = domStyle.width;

    return {
        theme,
        effect,
        delay,
        prefix,
        suffix,
        body: loopTextList,
        textColor,
        lineHeight,
        fontWeight: /^(bold(er)?|[5-9]\d{2,})$/.test(fontWeight) || undefined,
        fontSize,
        fontStyle,
        align,
        moAlign,

        width,
        fontFamily: fontFamily === "inherit" ? undefined : fontFamily,
    };
}
