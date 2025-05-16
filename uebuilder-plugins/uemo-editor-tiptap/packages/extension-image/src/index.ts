/*
 * @Description: 图片属性
 * @Author: F-Stone
 * @LastEditTime: 2025-05-16 14:09:17
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
    shadow?: string;
    imageMask?: string;
    radius?: string;
    border?: UE_EL_UTIL.BorderValue;
    imageLink?: UE_EL_UTIL.LinkValue;
    background?: string;
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
