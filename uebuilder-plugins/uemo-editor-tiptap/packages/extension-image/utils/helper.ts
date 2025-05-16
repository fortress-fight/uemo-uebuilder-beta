import type { Editor } from "@tiptap/core";
import type { Selection, NodeSelection } from "@tiptap/pm/state";

import type { ImageAttrs } from "../src";

import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否是图片
 */
export function isImageNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "image";
}

/**
 * 获取按钮行
 */
export function getImage(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "image")(selection);
}

export function getImageAttrs(editor?: Editor) {
    return editor?.getAttributes("image") as ImageAttrs;
}
