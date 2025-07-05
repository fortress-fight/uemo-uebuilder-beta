import type { Editor } from "@tiptap/core";

import type { EffectTextAttrs } from "../src";

import { Selection } from "@tiptap/pm/state";
import { isNodeSelection } from "@tiptap/core";

/**
 * 判断是否是图片
 */
export function isEffectTextNode(editor?: Editor | Selection) {
    const selection = editor instanceof Selection ? editor : editor?.state.selection;

    if (!selection) return null;

    return isNodeSelection(selection) && selection.node.type.name === "effectText";
}

/**
 * 获取特效文本属性
 */
export function getEffectTextAttrs(editor?: Editor) {
    return editor?.getAttributes("effectText") as EffectTextAttrs;
}
