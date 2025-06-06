/*
 * @Description: SvgIcon 扩展
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 15:19:32
 */

export type SvgIconAttrs = {
    name: string;
    source: string;

    // 内容信息
    color: string;
    align?: UE_EL_UTIL.ALIGN_X;
    width?: string;
    padding?: string;

    // 设计属性
    border?: UE_EL_UTIL.BorderValue;
    shadow?: string;
    radius?: string;
    background?: string;
};

export * from "./svg-icon";
