/*
 * @Description: 分享项工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 12:04:21
 */
import type { NodeSelection, EditorState } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/core";

import type { ShareItemAttrs, ShareRowAttrs } from "../src";

import { Selection } from "@tiptap/pm/state";
import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否在按钮行中
 */
export function isInShareRowNode(state: EditorState) {
    const $head = state.selection.$head;
    for (let d = $head.depth; d > 0; d--) {
        if ($head.node(d).type.name == "shareRow") {
            return true;
        }
    }
    return false;
}

export function isShareRowNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "shareRow";
}

export function getShareRowAttrs(editor?: Editor) {
    return editor?.getAttributes("shareRow") as ShareRowAttrs;
}

/**
 * 获取分享行
 */
export function getClosestShareRow(editor?: Editor | Selection) {
    const selection = editor instanceof Selection ? editor : editor?.state.selection;

    if (!selection) return null;

    if (isShareRowNode(selection)) {
        return {
            node: selection.node,
            pos: selection.$from.pos,
            start: selection.$from.pos,
            depth: selection.$from.depth,
        };
    }

    return findParentNode((node) => node.type.name === "shareRow")(selection);
}

/**
 * 判断是否是分割块
 */
export function isShareItemNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "shareItem";
}

/**
 * 获取分割块
 */
export function getShareItem(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "shareItem")(selection);
}

export function getShareItemAttrs(editor?: Editor) {
    return editor?.getAttributes("shareItem") as ShareItemAttrs;
}
