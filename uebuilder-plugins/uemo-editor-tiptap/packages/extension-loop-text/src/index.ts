/*
 * @Description: 跑马灯文本
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 16:56:10
 */
export type LoopTextAttrs = {
    theme?: string;
    effect?: string;
    width?: string;

    fontFamily?: string;
    fontSize?: string;
    textColor?: string;
    fontWeight?: boolean;
    lineHeight?: string;
    fontStyle?: string;
    align?: string;
    moAlign?: string;

    delay?: string;
    prefix?: { type: "text"; value: string };
    suffix?: { type: "text"; value: string };
    body?: { id: string; title?: string }[];
};

export * from "./loop-text";
