import type { Editor } from "@tiptap/core";

import { isInTable } from "@tiptap/pm/tables";
import { isNodeSelection } from "@tiptap/core";

import { getTableNode } from "../../../utils/tiptap-utils";
import { isInButtonRow, getButtonRow } from "../../extension-button/utils/helper";

// /**
//  * NOTE 【已废弃】在指定位置插入新行
//  * @deprecated 使用 `insertNewLine` 命令代替
//  * @param editor - 编辑器实例
//  * @param pos - 插入位置，"before" 表示在目标前插入，"after" 表示在目标后插入
//  * @returns 是否插入成功
//  */
// export function insertNewLine(editor: Editor, pos: "before" | "after"): boolean {
//     const targetPosInfo = getTargetPositionInfo(editor);

//     if (!targetPosInfo) return false;

//     const targetPos = pos === "before" ? targetPosInfo.start : targetPosInfo.end;
//     return editor.chain().focus().insertContentAt(targetPos, { type: "paragraph" }).run();
// }

/**
 * 获取目标位置信息
 */
export function getTargetPositionInfo(editor: Editor): { start: number; end: number } | null {
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
