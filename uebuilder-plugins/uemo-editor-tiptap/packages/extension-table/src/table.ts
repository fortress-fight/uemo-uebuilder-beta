import type { EditorView, NodeView } from "@tiptap/pm/view";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import type { ParentConfig } from "@tiptap/core";
import type { TableAttrs } from "./index";

import { callOrReturn, getExtensionField, mergeAttributes, Node } from "@tiptap/core";
import { TextSelection, Plugin, PluginKey } from "@tiptap/pm/state";
import { createColGroup } from "../utils/create-col-group";
import {
    addColumnAfter,
    addColumnBefore,
    addRowAfter,
    addRowBefore,
    CellSelection,
    columnResizing,
    deleteColumn,
    deleteRow,
    deleteTable,
    fixTables,
    goToNextCell,
    mergeCells,
    setCellAttr,
    splitCell,
    tableEditing,
    toggleHeader,
    toggleHeaderCell,
    isInTable,
} from "@tiptap/pm/tables";

import { getTableView } from "../view/table-view";
import { deleteTableWhenAllCellsSelected, createTable, getClosestTableCellNode } from "../utils/helper";
import { getClosestTable } from "../utils/helper";

import { selectNode, selectNodeInner } from "../../../utils/tiptap-utils";

import $pageStyle from "../../../src/app.module.scss";

export interface TableOptions {
    /**
     * HTML attributes for the table element.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>;

    initFixed: boolean;

    /**
     * Enables the resizing of tables.
     * @default false
     * @example true
     */
    resizable: boolean;

    /**
     * The width of the resize handle.
     * @default 5
     * @example 10
     */
    handleWidth: number;

    /**
     * The minimum width of a cell.
     * @default 25
     * @example 50
     */
    cellMinWidth: number;

    /**
     * The node view to render the table.
     * @default TableView
     */
    View: (new (node: ProseMirrorNode, cellMinWidth: number, view: EditorView) => NodeView) | null;

    /**
     * Enables the resizing of the last column.
     * @default true
     * @example false
     */
    lastColumnResizable: boolean;

    /**
     * Allow table node selection.
     * @default false
     * @example true
     */
    allowTableNodeSelection: boolean;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        table: {
            updateTableAttrs: (attrs: Partial<TableAttrs>) => ReturnType;

            setCellAlign: (param: "left" | "center" | "right") => ReturnType;
            setCellVAlign: (param: "top" | "middle" | "bottom") => ReturnType;
            resetColWidth: () => ReturnType;
            toggleTableBorder: () => ReturnType;
            insertTable: (options?: { rows?: number; cols?: number; withHeaderRow?: boolean }) => ReturnType;
            addColumnBefore: () => ReturnType;
            addColumnAfter: () => ReturnType;
            deleteColumn: () => ReturnType;
            addRowBefore: () => ReturnType;
            addRowAfter: () => ReturnType;
            deleteRow: () => ReturnType;
            deleteTable: () => ReturnType;
            mergeCells: () => ReturnType;
            splitCell: () => ReturnType;
            toggleHeaderColumn: () => ReturnType;
            toggleHeaderRow: () => ReturnType;
            toggleHeaderCell: () => ReturnType;
            mergeOrSplit: () => ReturnType;
            setCellAttribute: (name: string, value: any) => ReturnType;
            goToNextCell: () => ReturnType;
            goToPreviousCell: () => ReturnType;
            fixTables: () => ReturnType;
            setCellSelection: (position: { anchorCell: number; headCell?: number }) => ReturnType;
        };
    }

    interface NodeConfig<Options, Storage> {
        /**
         * Table Role
         */
        tableRole?:
            | string
            | ((this: {
                  name: string;
                  options: Options;
                  storage: Storage;
                  parent: ParentConfig<NodeConfig<Options>>["tableRole"];
              }) => string);
    }
}

// 当添加表格时，自动进行修复
const FixTablesPlugin = new Plugin({
    key: new PluginKey("fixTables"),
    appendTransaction: (_transactions, _oldState, newState) => {
        const tr = fixTables(newState);
        if (tr) {
            return tr;
        }
        return null;
    },
});

export const Table = Node.create<TableOptions>({
    name: "table",

    // @ts-ignore
    addOptions() {
        return {
            HTMLAttributes: {},
            resizable: true,
            initFixed: false,
            handleWidth: 5,
            cellMinWidth: 20,
            View: getTableView,
            lastColumnResizable: false,
            allowTableNodeSelection: false,
        };
    },

    content: "tableRow+",

    tableRole: "table",

    isolating: true,

    group: "block",
    defining: true,

    parseHTML() {
        return [{ tag: "table table", skip: true }, { tag: "table" }];
    },

    renderHTML({ HTMLAttributes, node }) {
        const { colgroup, tableWidth, tableMinWidth } = createColGroup(node, this.options.cellMinWidth);

        return [
            "div",
            { class: $pageStyle["table-scroll-box"] },
            [
                "table",
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                    isEditing: undefined,
                    style: tableWidth
                        ? `--table-drag-min-width: ${tableWidth}`
                        : `--table-drag-min-width: ${tableMinWidth}`,
                    // style: tableWidth ? `width: ${tableWidth}` : `min-width: ${tableMinWidth}`,
                }),
                colgroup,
                ["tbody", 0],
            ],
        ];
    },

    addAttributes() {
        return {
            tableBorder: {
                default: true,
                parseHTML: (element) => {
                    if (
                        element.parentElement?.getAttribute("data-border") ||
                        element.classList.contains($pageStyle["table-hide-border"])
                    ) {
                        return false;
                    }
                },
                renderHTML: (attributes: TableAttrs) => {
                    if (attributes.tableBorder === false) {
                        return { class: $pageStyle["table-hide-border"] };
                    }

                    return {};
                },
            },
            tableBorderColor: {
                default: "#ced4da",
                parseHTML: (element) => {
                    return element.style.getPropertyValue("--table-border-color") || "";
                },
                renderHTML: (attributes: TableAttrs) => {
                    if (attributes.tableBorderColor) {
                        return {
                            style: `--table-border-color: ${attributes.tableBorderColor}`,
                        };
                    }
                    return {};
                },
            },
            minWidth: {
                default: "100px",
                parseHTML: (element) => {
                    return element.style.getPropertyValue("--table-min-width") || element.style.minWidth || "";
                },
                renderHTML: (attributes: TableAttrs) => {
                    if (attributes.minWidth) {
                        return {
                            style: `--table-min-width: ${attributes.minWidth}`,
                        };
                    }
                    return {};
                },
            },
        };
    },

    addCommands() {
        return {
            setCellAlign:
                (align) =>
                ({ editor }) => {
                    editor?.chain().setCellAttribute("align", align).run();
                    return true;
                },

            setCellVAlign:
                (align) =>
                ({ editor }) => {
                    editor?.chain().setCellAttribute("valign", align).run();
                    return true;
                },

            resetColWidth:
                () =>
                ({ tr, view }) => {
                    const { doc } = tr;
                    const tableNodeInfo = getClosestTable(view.state.selection);

                    if (!tableNodeInfo) return true;

                    const { start, node } = tableNodeInfo;

                    // NOTE: 对  Node 添加属性
                    doc.nodesBetween(start, start + node.nodeSize, (node, pos) => {
                        if (node.type.name === "tableCell") {
                            tr.setNodeMarkup(pos, null, {
                                ...node.attrs,
                                colwidth: null,
                            });
                            return false;
                        }
                    });

                    return true;
                },

            toggleTableBorder:
                () =>
                ({ view, editor }) => {
                    const tableNodeInfo = getClosestTable(view.state.selection);

                    if (!tableNodeInfo) return true;

                    const { pos } = tableNodeInfo;

                    selectNode(editor, pos);

                    const currentAttrs = tableNodeInfo.node.attrs as TableAttrs;

                    editor.chain().updateTableAttrs({ tableBorder: !currentAttrs.tableBorder }).run();

                    return true;
                },

            insertTable:
                ({ rows = 3, cols = 3, withHeaderRow = true } = {}) =>
                ({ tr, dispatch, editor }) => {
                    const isTable = tr.selection instanceof CellSelection;

                    if (isTable) return false;
                    if (isInTable(editor.state)) return false;

                    const node = createTable(editor.schema, rows, cols, withHeaderRow);

                    if (dispatch) {
                        const offset = tr.selection.from + 1;
                        tr.replaceSelectionWith(node)
                            .scrollIntoView()
                            .setSelection(TextSelection.near(tr.doc.resolve(offset)));
                    }

                    return true;
                },
            addColumnBefore:
                () =>
                ({ state, dispatch }) => {
                    return addColumnBefore(state, dispatch);
                },
            addColumnAfter:
                () =>
                ({ state, dispatch }) => {
                    return addColumnAfter(state, dispatch);
                },
            deleteColumn:
                () =>
                ({ state, dispatch }) => {
                    return deleteColumn(state, dispatch);
                },
            addRowBefore:
                () =>
                ({ state, dispatch }) => {
                    return addRowBefore(state, dispatch);
                },
            addRowAfter:
                () =>
                ({ state, dispatch }) => {
                    return addRowAfter(state, dispatch);
                },
            deleteRow:
                () =>
                ({ state, dispatch }) => {
                    return deleteRow(state, dispatch);
                },
            deleteTable:
                () =>
                ({ state, dispatch }) => {
                    return deleteTable(state, dispatch);
                },
            mergeCells:
                () =>
                ({ state, dispatch }) => {
                    return mergeCells(state, dispatch);
                },
            splitCell:
                () =>
                ({ state, dispatch }) => {
                    return splitCell(state, dispatch);
                },
            toggleHeaderColumn:
                () =>
                ({ state, dispatch }) => {
                    return toggleHeader("column")(state, dispatch);
                },
            toggleHeaderRow:
                () =>
                ({ state, dispatch }) => {
                    return toggleHeader("row")(state, dispatch);
                },
            toggleHeaderCell:
                () =>
                ({ state, dispatch }) => {
                    return toggleHeaderCell(state, dispatch);
                },
            mergeOrSplit:
                () =>
                ({ state, dispatch }) => {
                    if (mergeCells(state, dispatch)) {
                        return true;
                    }

                    return splitCell(state, dispatch);
                },
            setCellAttribute:
                (name, value) =>
                ({ state, dispatch }) => {
                    return setCellAttr(name, value)(state, dispatch);
                },
            goToNextCell:
                () =>
                ({ state, dispatch }) => {
                    return goToNextCell(1)(state, dispatch);
                },
            goToPreviousCell:
                () =>
                ({ state, dispatch }) => {
                    return goToNextCell(-1)(state, dispatch);
                },
            fixTables:
                () =>
                ({ state, dispatch }) => {
                    if (dispatch) {
                        fixTables(state);
                    }

                    return true;
                },
            setCellSelection:
                (position) =>
                ({ tr, dispatch }) => {
                    if (dispatch) {
                        const selection = CellSelection.create(tr.doc, position.anchorCell, position.headCell);

                        // @ts-ignore
                        tr.setSelection(selection);
                    }

                    return true;
                },
        };
    },

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                if (this.editor.commands.goToNextCell()) return true;
                if (!this.editor.can().addRowAfter()) return false;
                return this.editor.chain().addRowAfter().goToNextCell().run();
            },
            "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
            Backspace: deleteTableWhenAllCellsSelected,
            "Mod-Backspace": deleteTableWhenAllCellsSelected,
            Delete: deleteTableWhenAllCellsSelected,
            "Mod-Delete": deleteTableWhenAllCellsSelected,
            "Mod-a": () => {
                const editor = this.editor;

                // NOTE 选中光标位置单元格的内容
                const tableCellNodeInfo = getClosestTableCellNode(editor);
                if (!tableCellNodeInfo) return false;

                const { pos, node } = tableCellNodeInfo;
                return selectNodeInner(editor, pos, node);

                // NOTE 选中光标位置的单元格
                // const { view } = this.editor;
                // const { state } = view;
                // const { selection } = state;
                // const doc = state.doc,
                //     $cell = cellAround(doc.resolve(selection.from));
                // if (!$cell) return false;
                // view.dispatch(view.state.tr.setSelection(new CellSelection($cell)));

                // return true;
            },
        };
    },

    addProseMirrorPlugins() {
        const isResizable = this.options.resizable && this.editor.isEditable;

        const pluginArr: any[] = [];

        if (isResizable) {
            const resizePlugin = columnResizing({
                handleWidth: this.options.handleWidth,
                cellMinWidth: this.options.cellMinWidth,
                defaultCellMinWidth: this.options.cellMinWidth,
                // @ts-ignore (incorrect type)
                View: this.options.View(this.editor),
                // TODO: PR for @types/prosemirror-tables
                // @ts-ignore (incorrect type)
                lastColumnResizable: true,
            });
            // NOTE 禁止宽度拖拽
            // resizePlugin.props.handleDOMEvents = {};
            pluginArr.push(resizePlugin);
        }

        if (this.options.initFixed) {
            pluginArr.push(FixTablesPlugin);
        }

        return [
            ...pluginArr,
            tableEditing({
                allowTableNodeSelection: this.options.allowTableNodeSelection,
            }),
        ];
    },

    extendNodeSchema(extension) {
        const context = {
            name: extension.name,
            options: extension.options,
            storage: extension.storage,
        };

        return {
            tableRole: callOrReturn(getExtensionField(extension, "tableRole", context)),
        };
    },
});
