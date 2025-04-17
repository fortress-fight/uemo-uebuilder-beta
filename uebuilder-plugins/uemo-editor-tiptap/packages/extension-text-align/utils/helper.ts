import type { TextAlignAttr } from "../src";

/**
 * 文本对齐扩展的配置选项
 */
export interface TextAlignOptions {
    types: string[];
    alignments: string[];
    defaultAlignment: string;
}

/**
 * 从元素中解析文本对齐方式
 * @param element - HTML元素
 * @param options - 配置选项
 * @returns 解析后的对齐方式
 */
export const parseTextAlignFromElement = (element: HTMLElement, options: TextAlignOptions): string => {
    const alignment = element.style.textAlign || options.defaultAlignment;
    return options.alignments.includes(alignment) ? alignment : options.defaultAlignment;
};

/**
 * 从元素中解析移动端文本对齐方式
 * @param element - HTML元素
 * @returns 解析后的移动端对齐方式
 */
export const parseMoTextAlignFromElement = (element: HTMLElement): string => {
    return element.getAttribute("data-mo-align") || "";
};

/**
 * 渲染文本对齐HTML属性
 * @param attributes - 文本对齐属性
 * @param defaultAlignment - 默认对齐方式
 * @returns HTML属性对象
 */
export const renderTextAlignAttributes = (
    attributes: TextAlignAttr,
    defaultAlignment: string
): Record<string, string> => {
    if (attributes.textAlign === defaultAlignment) {
        return {};
    }

    return {
        style: `text-align: ${attributes.textAlign}`,
    };
};

/**
 * 渲染移动端文本对齐HTML属性
 * @param attributes - 文本对齐属性
 * @returns HTML属性对象
 */
export const renderMoTextAlignAttributes = (attributes: TextAlignAttr): Record<string, string> => {
    if (!attributes.moTextAlign || attributes.moTextAlign === attributes.textAlign) {
        return {};
    }

    return {
        "data-mo-align": `${attributes.moTextAlign}`,
    };
};
