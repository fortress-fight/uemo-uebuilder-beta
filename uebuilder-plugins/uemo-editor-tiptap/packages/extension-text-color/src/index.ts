/*
 * @Description: 文本颜色扩展
 * @Author: F-Stone
 * @LastEditTime: 2025-04-30 14:00:04
 */
import type { Editor } from "@tiptap/core";

/**
 * 文本颜色属性
 */
export type TextColorAttrs = { color?: string | null };

/**
 * 获取文本颜色属性
 * @param editor - 编辑器实例
 * @returns 文本颜色属性
 */
export function getTextColorAttrs(editor: Editor | undefined) {
    if (!editor) return "";

    const textStyle = editor.getAttributes("textStyle") as TextColorAttrs;

    const currentColor = textStyle.color || "";
    if (currentColor.includes("gradient")) {
        editor.view.dom.setAttribute("hight-light-caret", "1");
    } else {
        editor.view.dom.removeAttribute("hight-light-caret");
    }

    if (currentColor) return currentColor;

    const selection = editor.state.selection;
    const dom = editor.view.domAtPos(selection?.from || 0);

    let node: Node | null = dom.node;
    if (node.nodeType === 3) {
        node = node.parentNode;
    }
    if (!node) return "";

    return window?.getComputedStyle(node as HTMLElement).color || "";
}

export * from "./text-color";
