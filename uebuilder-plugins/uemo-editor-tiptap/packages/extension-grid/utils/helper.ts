/*
 * @Description: grid 工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-06-23 02:09:16
 */

import type { Editor } from "@tiptap/core";
import type { Slice } from "@tiptap/pm/model";
import type { EditorView } from "@tiptap/pm/view";
import type { Selection, NodeSelection, EditorState } from "@tiptap/pm/state";

import type { GridGroupAttrs } from "../src";

import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否是 grid
 */
export function isGridGroupNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "gridGroup";
}

/**
 * 获取 grid
 */
export function getClosestGridGroup(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    if (isGridGroupNode(selection)) {
        return {
            node: selection.node,
            pos: selection.$from.pos,
            start: selection.$from.pos,
            depth: selection.$from.depth,
        };
    }

    return findParentNode((node) => node.type.name === "gridGroup")(selection);
}

/**
 * 获取 grid 属性
 */
export function getGridGroupAttrs(editor?: Editor) {
    return editor?.getAttributes("gridGroup") as GridGroupAttrs;
}

/**
 * 判断是否在网格组中
 */
export function isInGridGroup(state: EditorState): boolean {
    const $head = state.selection.$head;
    for (let d = $head.depth; d > 0; d--) {
        if ($head.node(d).type.name == "gridGroup") {
            return true;
        }
    }
    return false;
}

/**
 * 判断是否是网格项
 */
export function isGridItemNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "gridItem";
}

/**
 * 判断是否在网格项中
 */
export function isInGridItem(state: EditorState): boolean {
    const $head = state.selection.$head;
    for (let d = $head.depth; d > 0; d--) {
        if ($head.node(d).type.name == "gridItem") {
            return true;
        }
    }
    return false;
}

/**
 * 获取最近的网格项
 */
export function getClosestGridItem(editor: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    if (isGridItemNode(selection)) {
        return {
            start: selection.$from.pos,
            node: selection.node,
            pos: selection.$from.pos,
            depth: selection.$from.depth,
        };
    }

    return findParentNode((node) => node.type.name === "gridItem")(selection);
}

export function dealDomInsetHandler(view: EditorView, slice: Slice) {
    const { state } = view;

    if (!isInGridItem(state)) return false;
    if (!slice.size) return false;

    const { selection, tr } = state;
    const { content } = slice;

    const insertNode: any[] = [];

    content.nodesBetween(0, content.size, (node) => {
        const name = node.type.name;
        if (name === "gridItem" || name === "tableCell") {
            node.content.forEach((n) => {
                insertNode.push(n);
            });
            return false;
        }
    });

    if (insertNode.length) {
        tr.replaceWith(selection.from, selection.to, insertNode);
        tr.setMeta("paste", true);
        view.dispatch(tr);
        return true;
    }

    return false;
}
