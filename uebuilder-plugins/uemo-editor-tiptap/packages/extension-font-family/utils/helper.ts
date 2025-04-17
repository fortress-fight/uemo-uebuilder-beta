import type { FontFamilyAttr } from "../src/index";

/**
 * 从元素中解析字体家族
 * @param el - HTML元素
 * @returns 解析后的字体家族名称或undefined
 */
export const parseFontFamilyFromElement = (el: HTMLElement): string | undefined => {
    let fontFamily = el.style.fontFamily;
    const parentEl = el.parentElement;

    // 检查父元素是否为span标签
    if (parentEl?.nodeName.toLowerCase() === "span") {
        fontFamily = fontFamily || parentEl.style.fontFamily;
    }

    // 处理多个字体的情况
    if (fontFamily?.includes(",")) {
        fontFamily = fontFamily.split(",")[0];
    }

    // 清理字体名称
    const result = fontFamily?.replace(/['"]+/g, "").trim();
    return !result || result === "inherit" ? undefined : result;
};

/**
 * 渲染字体家族HTML属性
 * @param attributes - 字体家族属性
 * @returns HTML属性对象
 */
export const renderFontFamilyAttributes = (attributes: FontFamilyAttr): Record<string, string> => {
    if (!attributes.fontFamily) {
        return {};
    }

    return {
        style: `font-family: ${attributes.fontFamily}`,
    };
};
