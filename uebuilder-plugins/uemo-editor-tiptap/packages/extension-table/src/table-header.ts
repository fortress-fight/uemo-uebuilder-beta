/*
 * @Description: 表格头
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 12:26:00
 */
import { mergeAttributes, Node } from "@tiptap/core";

export interface TableHeaderOptions {
    HTMLAttributes: Record<string, any>;
}
export const TableHeader = Node.create<TableHeaderOptions>({
    name: "tableHeader",

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    content: "block+",
    draggable: false,

    addAttributes() {
        return {
            backgroundColor: {
                default: null,
                parseHTML: (element) => element.style.backgroundColor?.replace(/['"]+/g, ""),
                renderHTML: (attributes) => {
                    if (!attributes.backgroundColor) {
                        return {};
                    }

                    return {
                        style: `background-color: ${attributes.backgroundColor}`,
                    };
                },
            },
            colspan: {
                default: 1,
            },
            rowspan: {
                default: 1,
            },
            colwidth: {
                default: null,
                parseHTML: (element) => {
                    const colwidth = element.getAttribute("colwidth");
                    const value = colwidth ? [parseInt(colwidth, 10)] : null;

                    return value;
                },
            },
        };
    },

    tableRole: "header_cell",

    isolating: true,

    parseHTML() {
        return [{ tag: "th", context: "tableRow/" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["th", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
});
