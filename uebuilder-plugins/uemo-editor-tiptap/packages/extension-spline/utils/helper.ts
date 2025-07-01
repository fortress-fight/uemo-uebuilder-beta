/*
 * @Description: spline 工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-06-13 09:18:45
 */

import type { Editor } from "@tiptap/core";
import type { Selection, NodeSelection } from "@tiptap/pm/state";

import type { SplineAttrs } from "../src";

import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否是 spline
 */
export function isSplineNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "spline";
}

/**
 * 获取 spline
 */
export function getSpline(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "spline")(selection);
}

export function getSplineAttrs(editor?: Editor) {
    return editor?.getAttributes("spline") as SplineAttrs;
}
