/*
 * @Description: 分割线
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 01:58:53
 */

export type HrRuleAttrs = {
    type?: "line" | "block";
    height?: string;
    mdHeight?: string;
    color?: string;
    lineType?: "solid" | "dotted" | "dashed";
};

export * from "./hr-rule";
