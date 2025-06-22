/*
 * @Description: 网格布局工具
 * @Author: F-Stone
 * @LastEditTime: 2025-06-15 23:58:59
 */

/**
 * 网格布局信息
 */
export type GridInfo = {
    colTemplate: string;
    rowTemplate: string;
    subColInfo: (string | undefined)[];
};

// 添加辅助函数处理模板转换
function formatSegment(v: string): string {
    if (v === "auto") return v;
    if (v.includes("px")) return v;
    return `${v}fr`;
}

/*
 * 获取网格布局信息
 * @param grid 网格布局字符串
 * @returns 网格布局信息
 */
export function getGridInfo(grid?: string): GridInfo {
    const result: GridInfo = { colTemplate: "initial", rowTemplate: "initial", subColInfo: [] };

    if (!grid) return result;

    const [gridInfo, subColInfo] = grid.split(":");
    const [rowInfo, colInfo] = gridInfo.split(",");

    if (rowInfo != "initial") {
        result.rowTemplate = rowInfo.split("-").map(formatSegment).join(" ");
    }

    if (colInfo != "initial") {
        result.colTemplate = colInfo.split("-").map(formatSegment).join(" ");
    }

    if (subColInfo != "initial") {
        result.subColInfo = subColInfo.split(",").map((item) => {
            return item.replaceAll("/", " / ");
        });
    }

    return result;
}

/**
 * 获取网格布局 CSS 字符串
 * @param gridInfo 网格布局信息
 * @returns 网格布局 CSS 字符串
 */
export function getGridCss(gridInfo: GridInfo) {
    const { colTemplate, rowTemplate, subColInfo: subColInfoArr } = gridInfo;

    const rowInfo = rowTemplate.split(" ").join("-").replaceAll("fr", "");
    const colInfo = colTemplate.split(" ").join("-").replaceAll("fr", "");
    const subColInfo = subColInfoArr.join(",").replaceAll(" ", "");

    return `${rowInfo},${colInfo}:${subColInfo}`;
}

/**
 * 获取行网格区域
 * @param length 长度
 * @param auto 是否自动
 * @returns 行网格区域
 */
export function getGridArea(length: number, auto = false) {
    const arr = new Array(length).fill(auto ? "auto" : 1);
    return arr.join("-") + ",1:" + arr.map((_, index) => `${index + 1}/1/${index + 2}/2`).join(",");
}
