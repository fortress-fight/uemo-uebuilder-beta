/*
 * @Description: 表格单元格
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 12:27:16
 */
import type { Slice } from "@tiptap/pm/model";
import type { EditorView } from "@tiptap/pm/view";

import { mergeAttributes, Node } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

import { isInTable } from "@tiptap/pm/tables";
export interface TableCellOptions {
    HTMLAttributes: Record<string, any>;
}

function disableTableInSelf(view: EditorView, _event: any, slice: Slice) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { state, dispatch } = view;
    if (!isInTable(state)) {
        return false;
    }
    if (!slice.size) {
        return false;
    }

    const { selection, tr } = state;

    const { content } = slice;

    const insertNode: any[] = [];

    content.nodesBetween(0, content.size, (node, _pos) => {
        const name = node.type.name;
        if (name === "gridItem" || name === "tableCell") {
            node.content.forEach((n) => {
                insertNode.push(n);
            });
            return false;
        }
    });

    if (insertNode.length) {
        tr.replaceWith(selection.from, selection.to, insertNode);
        tr.setMeta("paste", true);
        dispatch(tr);
        return true;
    }

    return false;
}

export const TableCell = Node.create<TableCellOptions>({
    name: "tableCell",
    tableRole: "cell",
    isolating: true,
    content: "block+",
    draggable: false,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

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
            align: {
                default: null,
                parseHTML: (element) => {
                    const align = element.style.textAlign;
                    return align ? align : null;
                },
                renderHTML: (attributes) => {
                    if (!attributes.align) {
                        return {};
                    }

                    return {
                        style: `text-align: ${attributes.align}`,
                    };
                },
            },
            valign: {
                default: null,
                parseHTML: (element) => {
                    const valign = element.style.verticalAlign;
                    return valign ? valign : null;
                },
                renderHTML: (attributes) => {
                    if (!attributes.valign) {
                        return {};
                    }

                    return {
                        style: `vertical-align: ${attributes.valign}`,
                    };
                },
            },
            colspan: {
                default: 1,
                parseHTML: (element) => {
                    const colspan = element.getAttribute("colspan");
                    return colspan === "undefined" ? null : Number(colspan) || null;
                },
            },
            rowspan: {
                default: 1,
                parseHTML: (element) => {
                    const rowspan = element.getAttribute("rowspan");
                    return rowspan === "undefined" ? null : Number(rowspan) || null;
                },
            },
            colwidth: {
                default: null,
                parseHTML: (element) => {
                    const colwidth = element.getAttribute("width") || element.getAttribute("colwidth");
                    // const width  = element.getAttribute("width");
                    const value = colwidth ? colwidth.split(",").map((e) => parseInt(e, 10)) : null;

                    return value;
                },
                renderHTML: (attributes) => {
                    if (!attributes.colwidth) {
                        return {};
                    }

                    let width = 0;
                    attributes.colwidth.forEach((item: number) => {
                        width = width + item;
                    });

                    // style: width ? `width: ${width}px` : "",
                    return {
                        colwidth: attributes.colwidth,
                    };
                },
            },
        };
    },

    // addPasteRules() {
    //     return [
    //         new PasteRule({
    //             find: /.+/,
    //             handler: ({ state, range, match }) => {
    //                 console.log("aa ", state, range, match);
    //             },
    //         }),
    //     ];
    // },

    parseHTML() {
        return [{ tag: "td", context: "tableRow/" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["td", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    addProseMirrorPlugins() {
        const plugins: Plugin[] = [
            new Plugin({
                key: new PluginKey("handleTableEvent"),
                props: {
                    handlePaste: (view, event, slice) => {
                        return disableTableInSelf(view, event, slice);
                    },
                    handleDrop: (view, event, slice) => {
                        return disableTableInSelf(view, event, slice);
                    },
                },
            }),
        ];

        return plugins;
    },
});
