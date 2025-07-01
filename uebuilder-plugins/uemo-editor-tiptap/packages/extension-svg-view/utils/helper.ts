/*
 * @Description: svgView 工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-06-12 00:16:34
 */

import type { Editor } from "@tiptap/core";
import type { Selection, NodeSelection } from "@tiptap/pm/state";

import type { SvgViewerAttrs } from "../src";

import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否是 svgView
 */
export function isSvgViewNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "svgView";
}

/**
 * 获取 svgView
 */
export function getSvgView(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "svgView")(selection);
}

export function getSvgViewAttrs(editor?: Editor) {
    return editor?.getAttributes("svgView") as SvgViewerAttrs;
}
