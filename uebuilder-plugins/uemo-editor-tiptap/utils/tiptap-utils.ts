import type { Editor } from "@tiptap/core";
import type { EditorState, Selection } from "@tiptap/pm/state";
import type { Node as ProsemirrorNode } from "@tiptap/pm/model";

import { isInTable } from "@tiptap/pm/tables";
import { isNodeSelection } from "@tiptap/core";

import { isInButtonRow, getButtonRow } from "../packages/extension-button/utils/helper";

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
 * 判断是否存在父节点
 */
export function hasParentNode(editor: Editor) {
    const selection = editor.state.selection;
    if (isNodeSelection(selection)) {
        const { from } = selection;
        const parent = editor.state.doc.resolve(from).parent;
        if (parent && parent.type.name != "doc") {
            return true;
        }
    }
    return false;
}

/**
 * 判断是否在表格中
 */
export { isInTable };

/**
 * @description 获取表格节点
 */
export function getTableNode(selection: Selection) {
    const $pos = selection.$anchor;
    let tableNode: ProsemirrorNode | undefined = undefined;
    let start;
    let end;
    for (let d = $pos.depth; d > 0; d--) {
        const node = $pos.node(d);
        if (node.type.spec.tableRole == "table") {
            start = $pos.before(d);
            end = $pos.after(d);
            tableNode = node;
            break;
        }
    }
    return {
        tableNode,
        start,
        end,
        $pos,
    };
}

/**
 * 在指定位置插入新行
 * @param editor - 编辑器实例
 * @param pos - 插入位置，"before" 表示在目标前插入，"after" 表示在目标后插入
 * @returns 是否插入成功
 */
export function insertNewLine(editor: Editor, pos: "before" | "after"): boolean {
    const targetPosInfo = getTargetPositionInfo(editor);

    if (!targetPosInfo) return false;

    const targetPos = pos === "before" ? targetPosInfo.start : targetPosInfo.end;
    editor.chain().focus().insertContentAt(targetPos, { type: "paragraph" }).run();

    return true;
}

/**
 * 获取目标位置信息
 */
function getTargetPositionInfo(editor: Editor): { start: number; end: number } | null {
    const { selection } = editor.view.state;

    if (isInButtonRow(editor.state)) {
        const buttonRow = getButtonRow(editor);
        if (buttonRow) {
            return {
                start: buttonRow.pos,
                end: buttonRow.pos + buttonRow.node.nodeSize,
            };
        }
    }

    if (isNodeSelection(selection)) {
        return {
            start: selection.$from.pos,
            end: selection.$to.pos,
        };
    }

    if (isInTable(editor.state)) {
        const { tableNode, start, end } = getTableNode(selection);
        if (tableNode && typeof start !== "undefined" && typeof end !== "undefined") {
            return { start, end };
        }
    }

    return null;
}
