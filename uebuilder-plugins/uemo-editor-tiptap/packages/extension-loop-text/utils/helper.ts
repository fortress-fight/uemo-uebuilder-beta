/*
 * @Description: 跑马灯文本工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 16:27:31
 */
import type { Editor } from "@tiptap/core";

import type { LoopTextAttrs } from "../src";

import { Selection } from "@tiptap/pm/state";
import { isNodeSelection } from "@tiptap/core";
import $ from "@stone/uemo-editor-utils/lib/jquery";

import { getNodeDom } from "../../../utils/tiptap-utils";

/**
 * 判断是否是跑马灯文本节点
 */
export function isLoopTextNode(editor?: Editor | Selection) {
    const selection = editor instanceof Selection ? editor : editor?.state.selection;

    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "loopText";
}

/**
 * 获取跑马灯文本属性
 */
export function getLoopTextAttrs(editor?: Editor) {
    return editor?.getAttributes("loopText") as LoopTextAttrs;
}

/**
 * 播放跑马灯文本动画
 */
export function playLoopTextAnimation(editor: Editor) {
    // 获取选中文本的 DOM 节点
    const dom = getNodeDom(editor);
    if (!(dom instanceof HTMLElement)) return;

    const parentDom = dom.parentElement;
    if (!parentDom) return;

    $(dom).trigger("animate-play");
}
