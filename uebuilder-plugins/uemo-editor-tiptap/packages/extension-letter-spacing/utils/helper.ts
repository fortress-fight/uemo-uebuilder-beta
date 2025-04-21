/*
 * @Description: 字间距辅助函数
 * @Author: F-Stone
 * @LastEditTime: 2025-04-22 00:58:38
 */
import type { Editor } from "@tiptap/core";
import type { LetterSpacingAttr } from "../src";

/**
 * 获取字间距属性
 * @param editor - 编辑器实例
 * @returns 字间距属性
 */
export function getLetterSpacingAttr(editor: Editor): LetterSpacingAttr {
    return editor.getAttributes("textStyle");
}
