/*
 * @Description: 表格工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 14:01:58
 */
import type { NodeSelection } from "@tiptap/pm/state";
import type { Editor, KeyboardShortcutCommand } from "@tiptap/core";
import type { Fragment, Node as ProsemirrorNode, NodeType, Schema } from "@tiptap/pm/model";

import type { TableAttrs, TableCellAttrs } from "../src";

import { Selection } from "@tiptap/pm/state";
import { CellSelection, inSameTable, isInTable as _isInTable } from "@tiptap/pm/tables";
import { isNodeSelection, findParentNode, findParentNodeClosestToPos } from "@tiptap/core";

/**
 * 获取最近的表格
 */
export function getClosestTable(editor?: Editor | Selection) {
    const selection = editor instanceof Selection ? editor : editor?.state.selection;

    if (!selection) return null;

    if (isTableNode(selection)) {
        return {
            node: selection.node,
            pos: selection.$from.pos,
            start: selection.$from.pos,
            depth: selection.$from.depth,
        };
    }

    return findParentNode((node) => node.type.spec.tableRole === "table")(selection);
}

/**
 * 判断是否在表格中
 */
export function isTableNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.spec.tableRole === "table";
}

export function isInTable(editor?: Editor) {
    if (!editor) return false;
    return _isInTable(editor.state);
}

/**
 * 获取表格属性
 */
export function getTableAttrs(editor?: Editor) {
    return editor?.getAttributes("table") as TableAttrs;
}

/**
 * @description 获取单元格节点
 */
export function getClosestTableCellNode(editor?: Editor | Selection) {
    const selection = editor instanceof Selection ? editor : editor?.state.selection;

    if (!selection) return null;

    if (isTableNode(selection)) {
        return {
            node: selection.node,
            pos: selection.$from.pos,
            start: selection.$from.pos,
            depth: selection.$from.depth,
        };
    }

    return findParentNode((node) => ["cell", "header_cell"].includes(node.type.spec.tableRole))(selection);
}

/**
 * 获取单元格属性
 */
export function getTableCellAttrs(editor?: Editor) {
    return editor?.getAttributes("tableCell") as TableCellAttrs;
}

/**
 * 判断是否在表格单元格中
 */
export function isTableCellNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && ["cell", "header_cell"].includes(selection.node.type.spec.tableRole);
}

/**
 * @description 获取表格节点类型
 */
export function getTableNodeTypes(schema: Schema): Record<string, NodeType> {
    if (schema.cached.tableNodeTypes) {
        return schema.cached.tableNodeTypes;
    }

    const roles: Record<string, NodeType> = {};

    Object.keys(schema.nodes).forEach((type) => {
        const nodeType = schema.nodes[type];

        if (nodeType.spec.tableRole) {
            roles[nodeType.spec.tableRole] = nodeType;
        }
    });

    schema.cached.tableNodeTypes = roles;

    return roles;
}

/**
 * @description 创建单元格
 */
export function createCell(
    cellType: NodeType,
    cellContent?: Fragment | ProsemirrorNode | ProsemirrorNode[]
): ProsemirrorNode | null | undefined {
    if (cellContent) {
        return cellType.createChecked(null, cellContent);
    }

    return cellType.createAndFill();
}

/**
 * @description 创建表格
 */
export function createTable(
    schema: Schema,
    rowsCount: number,
    colsCount: number,
    withHeaderRow: boolean,
    cellContent?: Fragment | ProsemirrorNode | ProsemirrorNode[]
): ProsemirrorNode {
    const types = getTableNodeTypes(schema);
    const headerCells: ProsemirrorNode[] = [];
    const cells: ProsemirrorNode[] = [];

    for (let index = 0; index < colsCount; index += 1) {
        const cell = createCell(types.cell, cellContent);

        if (cell) {
            cells.push(cell);
        }

        if (withHeaderRow) {
            const headerCell = createCell(types.header_cell, cellContent);

            if (headerCell) {
                headerCells.push(headerCell);
            }
        }
    }

    const rows: ProsemirrorNode[] = [];

    for (let index = 0; index < rowsCount; index += 1) {
        rows.push(types.row.createChecked(null, withHeaderRow && index === 0 ? headerCells : cells));
    }

    return types.table.createChecked(null, rows);
}

/**
 * @description 是否为单元格选择
 */
export function isCellSelection(value: unknown): value is CellSelection {
    return value instanceof CellSelection;
}

/**
 * @description 删除表格
 */
export const deleteTableWhenAllCellsSelected: KeyboardShortcutCommand = ({ editor }) => {
    const { selection } = editor.state;

    if (!isCellSelection(selection)) {
        return false;
    }

    let cellCount = 0;
    const table = findParentNodeClosestToPos(selection.ranges[0].$from, (node) => {
        return node.type.name === "table";
    });

    table?.node.descendants((node) => {
        if (node.type.name === "table") {
            return false;
        }

        if (["tableCell", "tableHeader"].includes(node.type.name)) {
            cellCount += 1;
        }
    });

    const allCellsSelected = cellCount === selection.ranges.length;

    if (!allCellsSelected) {
        return false;
    }

    editor.commands.deleteTable();

    return true;
};

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

export function getTableSelectionInfo(editor?: Editor) {
    const selection = editor?.state.selection;
    let result = { row: false, col: false };

    if (!selection) return result;

    const { $from, $to } = selection;
    if (!inSameTable($from, $to)) return result;

    const selectTable = selection instanceof CellSelection;

    if (selectTable) {
        result = {
            row: selection.isRowSelection(),
            col: selection.isColSelection(),
        };
    }

    return result;
}

/**
 * 判断是否为表格节点
 */
export function selectionIsTableNode(editor?: Editor) {
    const selection = editor?.state.selection;
    if (!isCellSelection(selection)) return false;

    const tableSelectionInfo = getTableSelectionInfo(editor);
    return isInTable(editor) && tableSelectionInfo.row && tableSelectionInfo.col;
}

/**
 * 获取表格节点矩形
 */
export function getTableNodeRect(editor?: Editor) {
    const node = getClosestTable(editor);
    if (!node || !editor) {
        return null;
    }

    const dom = editor.view.nodeDOM(node.pos) as HTMLElement;
    const rect = dom.getBoundingClientRect();

    return rect;
}

export function getTableCellNodeRect(editor?: Editor) {
    const selection = editor?.state.selection;
    if (!isCellSelection(selection) || !editor) return null;

    const { $anchorCell, $headCell } = selection;

    const from = $headCell.pos > $anchorCell.pos ? $anchorCell.pos : $headCell.pos;
    const to = $headCell.pos > $anchorCell.pos ? $headCell.pos : $anchorCell.pos;

    const fromDom = editor.view.nodeDOM(from) as HTMLElement;
    const toDom = editor.view.nodeDOM(to) as HTMLElement;

    if (!fromDom || !toDom) return;

    const fromRect = fromDom.getBoundingClientRect();
    const toRect = toDom.getBoundingClientRect();

    return {
        x: fromRect.left,
        y: fromRect.top,
        left: fromRect.left,
        top: fromRect.top,
        width: Math.max(
            Math.abs(toRect.right - fromRect.left),
            Math.abs(fromRect.right - toRect.left),
            fromRect.width,
            toRect.width
        ),
        height: Math.max(
            Math.abs(toRect.bottom - fromRect.top),
            Math.abs(fromRect.bottom - toRect.top),
            fromRect.height,
            toRect.height
        ),
    } as DOMRect;
}
