/*
 * @Description: svgIcon 工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 14:34:15
 */

import type { Editor } from "@tiptap/core";
import type { Selection, NodeSelection } from "@tiptap/pm/state";

import type { SvgIconAttrs } from "../src";

import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否是 svgIcon
 */
export function isSvgIconNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "svgIcon";
}

/**
 * 获取 svgIcon
 */
export function getSvgIcon(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "svgIcon")(selection);
}

export function getSvgIconAttrs(editor?: Editor) {
    return editor?.getAttributes("svgIcon") as SvgIconAttrs;
}
