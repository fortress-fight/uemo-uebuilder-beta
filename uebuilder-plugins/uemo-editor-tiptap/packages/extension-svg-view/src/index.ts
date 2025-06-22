/*
 * @Description: svgView 扩展
 * @Author: F-Stone
 * @LastEditTime: 2025-06-16 00:29:25
 */
export type SvgViewerAttrs = {
    url?: string;

    ratio?: string;
    align?: UE_EL_UTIL.ALIGN;
    color?: string;

    width?: string;
    background?: string;

    w?: string;
    h?: string;

    // 设计属性
    border?: UE_EL_UTIL.BorderValue;

    padding?: string;
    shadow?: string;
    radius?: string;

    scrollEffect?: UE_TIPTAP_UNIT.SCROLL_EFFECT_VALUE;

    md: {
        width?: string;
    };
};

export type InsertSvgViewerData = {
    data?: { w: number; h: number };
    source: string;
};

export * from "./svg-view";
