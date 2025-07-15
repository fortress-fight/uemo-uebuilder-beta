/*
 * @Description: 表格
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 12:39:10
 */
export interface TableAttrs {
    tableBorder: boolean;
    tableBorderColor: string;
    minWidth: string;
}

export interface TableCellAttrs {
    backgroundColor: string | null;
    align: "left" | "center" | "right" | null;
    valign: "top" | "middle" | "bottom" | null;
    colspan: number;
    rowspan: number;
    colwidth: number[] | null;
}

export * from "./table";
export * from "./table-header";
export * from "./table-row";
export * from "./table-cell";
