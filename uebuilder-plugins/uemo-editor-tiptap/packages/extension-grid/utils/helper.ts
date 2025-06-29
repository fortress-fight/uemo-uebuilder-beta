/*
 * @Description: grid 工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-06-30 01:45:35
 */

import type { Editor } from "@tiptap/core";
import type { Slice } from "@tiptap/pm/model";
import type { EditorView } from "@tiptap/pm/view";
import type { Selection, EditorState } from "@tiptap/pm/state";

import type { GridGroupAttrs, GridItemAttrs } from "../src";

import { NodeSelection } from "@tiptap/pm/state";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
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

/**
 * 获取 grid 属性
 */
export function getGridItemAttrs(editor?: Editor) {
    return editor?.getAttributes("gridItem") as GridItemAttrs;
}

/**
 * 处理 dom 插入
 * 禁止在网格项中插入 gridItem 和 tableCell 节点
 */
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

/**
 * 交换网格项
 */
export function swapGridItem(editor: Editor, origin: number, target: number) {
    const view = editor.view;
    const tr = view.state.tr;
    const { doc } = tr;

    const gridGroupInfo = getClosestGridGroup(editor);
    if (!gridGroupInfo) return;

    const { node, start } = gridGroupInfo;

    const currentNodeJSON = node.toJSON();
    const targetGridItem = currentNodeJSON.content[target];
    const originGridItem = currentNodeJSON.content[origin];

    const newContent = currentNodeJSON.content.map((item: any, index: number) => {
        if (index === origin) {
            return {
                type: targetGridItem.type,
                attrs: {
                    ...targetGridItem.attrs,
                    gridArea: originGridItem.attrs.gridArea,
                    mdGridArea: originGridItem.attrs.mdGridArea,
                },
                content: targetGridItem.content,
            };
        } else if (index === target) {
            return {
                type: originGridItem.type,
                attrs: {
                    ...originGridItem.attrs,
                    gridArea: targetGridItem.attrs.gridArea,
                    mdGridArea: targetGridItem.attrs.mdGridArea,
                },
                content: originGridItem.content,
            };
        } else {
            return item;
        }
    });

    const newNode = ProseMirrorNode.fromJSON(editor.schema, {
        type: currentNodeJSON.type,
        attrs: currentNodeJSON.attrs,
        content: newContent,
    });

    tr.setSelection(NodeSelection.create(doc, start)).replaceSelectionWith(newNode);
    view.dispatch(tr);
}
