import type { Editor } from "@tiptap/core";

import type { CounterNumberAttrs } from "../src";

import { Selection } from "@tiptap/pm/state";
import { isNodeSelection } from "@tiptap/core";

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
