/*
 * @Description: 图片属性
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 14:13:23
 */

export type ImageAttrs = {
    src: string;
    sizeMode?: "ratio" | "customRatio" | "height";
    width?: string;
    height?: string;
    ratio?: string;
    imageEffect?: { type: string; options?: Record<string, string | undefined> };
    animate?: string;
    alt?: string;
    title?: string;
    imgW?: string;
    imgH?: string;
    pos?: string;
    align?: UE_EL_UTIL.ALIGN_X;
    imageMask?: string;

    // 设计属性
    border?: UE_EL_UTIL.BorderValue;
    shadow?: string;
    radius?: string;
    background?: string;

    imageLink?: UE_EL_UTIL.LinkValue;
    forbidImageGallery?: boolean;
    style?: string;
    md?: {
        sizeMode?: "ratio" | "customRatio" | "height";
        width?: string;
        height?: string;
        ratio?: string;
        radius?: string;
    };
};

export * from "./image";
