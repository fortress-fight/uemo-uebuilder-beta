/*
 * @Description: 表格行
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 12:26:36
 */
import { mergeAttributes, Node } from "@tiptap/core";

export interface TableRowOptions {
    HTMLAttributes: Record<string, any>;
}

export const TableRow = Node.create<TableRowOptions>({
    name: "tableRow",

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    content: "(tableCell | tableHeader)*",

    tableRole: "row",
    draggable: false,

    parseHTML() {
        return [{ tag: "tr", context: "table/" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["tr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
});
