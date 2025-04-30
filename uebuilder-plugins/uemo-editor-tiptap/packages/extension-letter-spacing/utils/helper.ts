/*
 * @Description: 字间距辅助函数
 * @Author: F-Stone
 * @LastEditTime: 2025-04-30 12:49:30
 */
import type { Editor } from "@tiptap/core";
import type { LetterSpacingAttrs } from "../src";

/**
 * 获取字间距属性
 * @param editor - 编辑器实例
 * @returns 字间距属性
 */
export function getLetterSpacingAttr(editor: Editor): LetterSpacingAttrs {
    return editor.getAttributes("textStyle");
}
