/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 01:35:33
 */
import type { NodeType } from "@tiptap/pm/model";
import type { Selection, NodeSelection } from "@tiptap/pm/state";
import type { Editor, ExtendedRegExpMatchArray, InputRuleFinder } from "@tiptap/core";

import type { HrRuleAttrs } from "../src";

import { InputRule, callOrReturn, isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 判断是否是分割块
 */
export function isHrRuleNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "hrRule";
}

/**
 * 获取分割块
 */
export function getHrRule(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "hrRule")(selection);
}

export function getHrRuleAttrs(editor?: Editor) {
    return editor?.getAttributes("hrRule") as HrRuleAttrs;
}

/**
 * Build an input rule that adds a node when the
 * matched text is typed into it.
 */
export function customInputRule(config: {
    find: InputRuleFinder;
    type: NodeType;
    getAttributes?: Record<string, any> | ((match: ExtendedRegExpMatchArray) => Record<string, any>) | false | null;
    handle?: (
        editor: Parameters<InputRule["handler"]>[0],
        config: { start: number; end: number; attributes: Record<string, any> }
    ) => void;
}) {
    return new InputRule({
        find: config.find,
        handler: (editor) => {
            const { state, range, match } = editor;
            const attributes = callOrReturn(config.getAttributes, undefined, match) || {};
            const { tr } = state;
            const start = range.from;
            let end = range.to;

            if (match[1]) {
                const offset = match[0].lastIndexOf(match[1]);
                let matchStart = start + offset;

                if (matchStart > end) {
                    matchStart = end;
                } else {
                    end = matchStart + match[1].length;
                }

                // insert last typed character
                const lastChar = match[0][match[0].length - 1];

                tr.insertText(lastChar, start + match[0].length - 1);

                // insert node from input rule
                config.handle?.(editor, {
                    start: matchStart,
                    end,
                    attributes,
                });
            } else if (match[0]) {
                config.handle?.(editor, {
                    start,
                    end,
                    attributes,
                });
            }
        },
    });
}
