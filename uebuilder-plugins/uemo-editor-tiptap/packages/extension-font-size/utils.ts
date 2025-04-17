import $pageStyle from "../../src/app.module.scss";

/**
 * 从元素中获取字体大小值
 * @param el - HTML元素
 * @returns 字体大小值或null
 */
export const getFontSizeFromElement = (el: HTMLElement): string | null => {
    const elStyle = el.style;
    const parentEl = el.parentElement;

    let fontSize = elStyle.fontSize || elStyle.getPropertyValue("--font-size");

    if (parentEl?.nodeName.toLowerCase() === "span") {
        const parentStyle = parentEl.style;
        fontSize =
            elStyle.fontSize ||
            elStyle.getPropertyValue("--font-size") ||
            parentStyle.fontSize ||
            parentStyle.getPropertyValue("--font-size");
    }

    return fontSize || null;
};

/**
 * 渲染字体大小HTML属性
 * @param fontSize - 字体大小值
 * @returns HTML属性对象
 */
export const renderFontSizeAttributes = (fontSize: string): Record<string, any> => {
    if (!fontSize) {
        return {};
    }

    if (fontSize.endsWith("px")) {
        const fontSizeNumber = parseInt(fontSize);
        const className = `text-${fontSizeNumber}`;
        return {
            class: $pageStyle[className as keyof typeof $pageStyle],
            style: `--font-size: ${fontSize}`,
        };
    }

    return {
        "data-font-size": fontSize,
        style: `--font-size: ${fontSize}`,
    };
};
