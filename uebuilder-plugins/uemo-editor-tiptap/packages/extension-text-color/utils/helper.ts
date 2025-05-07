import type { TextColorAttrs } from "../src";

/**
 * 从元素中解析颜色值
 * @param element - HTML元素
 * @returns 解析后的颜色值
 */
export const parseColorFromElement = (element: HTMLElement): string | undefined => {
    const style = element.style;

    if (style.backgroundImage) {
        return style.backgroundImage;
    }

    return style.color?.replace(/['"]+/g, "");
};

/**
 * 渲染颜色HTML属性
 * @param attributes - 颜色属性
 * @returns HTML属性对象
 */
export const renderColorAttributes = (attributes: TextColorAttrs): Record<string, string> => {
    if (!attributes.color) {
        return {};
    }

    if (attributes.color.includes("gradient")) {
        return {
            "data-clip": "text",
            style: `background-image: ${attributes.color};`,
        };
    }

    return {
        style: `color: ${attributes.color}`,
    };
};
