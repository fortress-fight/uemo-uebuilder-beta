/*
 * @Description: 行高扩展辅助函数
 * @Author: F-Stone
 * @LastEditTime: 2025-04-30 12:49:07
 */
import type { Editor } from "@tiptap/core";
import type { LineHeightAttrs } from "../src";

/**
 * 从元素中解析行高值
 * @param element - HTML元素
 * @returns 解析后的行高值
 */
export const parseLineHeightFromElement = (element: HTMLElement): string | null => {
    // 获取元素自身的行高
    let useLineHeight = element.style.lineHeight?.replace(/['"]+/g, "");

    // 如果没有行高设置，检查子元素
    if (!useLineHeight) {
        const spanChildren = element.querySelectorAll("span");
        let maxLineHeight: number | null = null;

        // 遍历所有span子元素，找出最大的行高值
        spanChildren.forEach((span) => {
            const lineHeight = span.style.lineHeight?.replace(/['"]+/g, "");
            if (lineHeight) {
                const lineHeightValue = parseFloat(lineHeight);
                if (maxLineHeight === null || lineHeightValue > maxLineHeight) {
                    maxLineHeight = lineHeightValue;
                    useLineHeight = lineHeight;
                }
            }
        });
    }

    return useLineHeight || null;
};
/**
 * 渲染行高HTML属性
 * @param attributes - 行高属性
 * @returns HTML属性对象
 */
export const renderLineHeightAttributes = (attributes: LineHeightAttrs): Record<string, string> => {
    if (!attributes.lineHeight) {
        return {};
    }

    return {
        style: `line-height: ${attributes.lineHeight}`,
    };
};

export function getLineHeightAttr(editor: Editor): LineHeightAttrs {
    return editor?.getAttributes("textStyle");
}
