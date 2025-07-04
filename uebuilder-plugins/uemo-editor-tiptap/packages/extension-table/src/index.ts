/*
 * @Description: 表格
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 16:00:01
 */
export interface TableAttrs {
    tableBorder: boolean;
    tableBorderColor: string;
    minWidth: string;
}

export interface TableCellAttrs {
    backgroundColor: string | null;
    align: string | null;
    valign: string | null;
    colspan: number;
    rowspan: number;
    colwidth: number[] | null;
}

export * from "./table";
export * from "./table-header";
export * from "./table-row";
export * from "./table-cell";
