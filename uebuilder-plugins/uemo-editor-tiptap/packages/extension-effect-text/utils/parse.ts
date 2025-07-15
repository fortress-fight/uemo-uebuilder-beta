import type { EffectTextAttrs, ScrollEffectV3 } from "../src";

import { defaultEffectTextAttrs } from "../src/effect-text";

function transformScrollEffect(
    scrollEffect: ScrollEffectV3 | EffectTextAttrs["scrollEffect"]
): EffectTextAttrs["scrollEffect"] {
    if ("effectType" in scrollEffect) {
        return scrollEffect;
    } else {
        const options = scrollEffect.options;

        return {
            effectType: scrollEffect.type,
            ...options,
            triggerMode: options.triggerMode === "enter" ? "enter-leaver" : options.triggerMode,
        };
    }
}

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

    let scrollEffect: EffectTextAttrs["scrollEffect"] = defaultEffectTextAttrs.scrollEffect;

    try {
        const scrollEffectConfig = dom.getAttribute("data-scroll-effect");

        if (scrollEffectConfig) {
            scrollEffect = transformScrollEffect(JSON.parse(scrollEffectConfig));
        }
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
