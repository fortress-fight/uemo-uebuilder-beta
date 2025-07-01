/*
 * @Description: lottie 工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-06-14 01:17:15
 */

import type { Editor } from "@tiptap/core";
import type { Selection, NodeSelection } from "@tiptap/pm/state";

import type { LottieAttrs } from "../src";

import { isNodeSelection, findParentNode } from "@tiptap/core";
import { getNodeDom } from "../../../utils/tiptap-utils";

/**
 * 判断是否是 lottie
 */
export function isLottieNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "lottie";
}

/**
 * 获取 lottie
 */
export function getLottie(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "lottie")(selection);
}

export function getLottieAttrs(editor?: Editor) {
    return editor?.getAttributes("lottie") as LottieAttrs;
}

export function playLottieAnimation(editor: Editor, attr: LottieAttrs) {
    // 获取选中文本的 DOM 节点
    const dom = getNodeDom(editor);
    if (!(dom instanceof HTMLElement)) return;

    const parentDom = dom.parentElement;
    if (!parentDom) return;

    // eslint-disable-next-line
    console.log("parentDom", parentDom, attr);
}
