import type { Editor } from "@tiptap/core";

import type { CounterNumberAttrs } from "../src";

import { Selection } from "@tiptap/pm/state";
import { isNodeSelection } from "@tiptap/core";
import $ from "@stone/uemo-editor-utils/lib/jquery";

import { getNodeDom } from "../../../utils/tiptap-utils";

/**
 * 判断是否是计数器节点
 */
export function isCounterNumberNode(editor?: Editor | Selection) {
    const selection = editor instanceof Selection ? editor : editor?.state.selection;

    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "counterNumber";
}

/**
 * 获取计数器属性
 */
export function getCounterNumberAttrs(editor?: Editor) {
    return editor?.getAttributes("counterNumber") as CounterNumberAttrs;
}

/**
 * 播放计数器数字动画
 */
export function playCounterNumberAnimation(editor: Editor) {
    // 获取选中文本的 DOM 节点
    const dom = getNodeDom(editor);
    if (!(dom instanceof HTMLElement)) return;

    const parentDom = dom.parentElement;
    if (!parentDom) return;

    $(dom).trigger("animate-play");
}
