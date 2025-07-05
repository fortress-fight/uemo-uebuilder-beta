import type { EffectTextAttrs } from "../src";

export function parseEffectText(dom: HTMLElement): EffectTextAttrs {
    const domStyle = dom.style;

    const align = dom.getAttribute("data-align") || "";
    const moAlign = dom.getAttribute("data-mo-align") || "";

    const content = dom.innerText.trim();

    const lineHeight = domStyle.lineHeight?.replace(/['"]+/g, "");
    const fontWeight = domStyle.fontWeight?.replace(/['"]+/g, "");
    const fontSize = domStyle.fontSize;
    const fontFamily = domStyle.fontFamily?.replace(/['"]+/g, "");
    const fontStyle = domStyle.fontStyle?.replace(/['"]+/g, "");
    const textColor = domStyle.getPropertyValue("--effect-text-text-color") || "#333";
    const width = domStyle.width;

    let scrollEffect = null;
    try {
        const scrollEffectConfig = dom.getAttribute("data-scroll-effect");

        scrollEffect = scrollEffectConfig
            ? JSON.parse(dom.getAttribute("data-scroll-effect") || "{}")
            : { type: "effect-1", options: { triggerMode: "enter" } };
    } catch (error) {
        console.error(error);
    }

    return {
        content,
        textColor,
        lineHeight,
        fontWeight: /^(bold(er)?|[5-9]\d{2,})$/.test(fontWeight),
        fontSize,
        fontStyle,
        align,
        moAlign,

        width,
        fontFamily: fontFamily === "inherit" ? "" : fontFamily,
        scrollEffect,
    };
}
