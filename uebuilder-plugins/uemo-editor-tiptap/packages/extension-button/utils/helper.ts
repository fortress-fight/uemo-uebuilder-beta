import type { Editor } from "@tiptap/core";
import type { EditorState } from "@tiptap/pm/state";

import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否在按钮行中
 */
export function isInButtonRow(state: EditorState) {
    const $head = state.selection.$head;
    for (let d = $head.depth; d > 0; d--) {
        if ($head.node(d).type.name == "buttonRow") {
            return true;
        }
    }
    return false;
}

/**
 * 判断是否是按钮行
 */
export function isButtonRow(editor?: Editor) {
    const selection = editor?.state.selection;

    return selection && isNodeSelection(selection) && selection.node.type.name === "buttonRow";
}

/**
 * 获取按钮行
 */
export function getButtonRow(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "buttonRow")(selection);
}
