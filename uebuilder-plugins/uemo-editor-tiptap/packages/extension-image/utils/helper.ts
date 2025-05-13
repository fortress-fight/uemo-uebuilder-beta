import type { Selection, NodeSelection } from "@tiptap/pm/state";

import { isNodeSelection } from "@tiptap/core";

/**
 * 判断是否是图片
 */
export function isImageNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "image";
}
