/*
 * @Description: 视频节点
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 18:25:34
 */

export interface FrameBaseAttrs {
    type: string;
    src: string;

    ratio?: string;
    align?: UE_EL_UTIL.ALIGN_X;
    width?: string;
    height?: string;

    // 设计属性
    border?: UE_EL_UTIL.BorderValue;
    shadow?: string;
    radius?: string;
    background?: string;
}

export interface VideoFrameAttrs extends FrameBaseAttrs {
    type: "video";

    videoPoster?: string;
    playMode?: "auto" | "pop" | "inline";
}

export interface MapFrameAttrs extends FrameBaseAttrs {
    type: "map";

    mapTitle?: string;
    mapDescription?: string;
    mapPosition?: string;
    mapTheme?: string;
    mapScale?: boolean;
    mapBtns?: string[];
    mapDrag?: boolean;
    mapLang?: string;
    pointerTheme?: string;
}

export interface WebFrameAttrs extends FrameBaseAttrs {
    type: "web";
}

export type FrameAttrs = VideoFrameAttrs | MapFrameAttrs | WebFrameAttrs;

export * from "./frame";
