import type { Editor } from "@tiptap/core";
import type { Selection, NodeSelection } from "@tiptap/pm/state";

import type { DividerBlockAttrs } from "../src";

import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否是分割块
 */
export function isDividerBlockNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "dividerBlock";
}

/**
 * 获取分割块
 */
export function getDividerBlock(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "dividerBlock")(selection);
}

export function getDividerBlockAttrs(editor?: Editor) {
    return editor?.getAttributes("dividerBlock") as DividerBlockAttrs;
}
