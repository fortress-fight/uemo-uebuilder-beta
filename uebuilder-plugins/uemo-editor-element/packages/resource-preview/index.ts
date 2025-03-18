/**
 * @file 资源文件预览组件
 * @description 提供资源文件预览功能，支持多种资源类型（图标、SVG、Lottie等）
 * @author F-Stone
 * @lastEditTime 2025-03-18 12:49:34
 */

import type { App } from "vue";
import UeElResourcePreview from "./Main.vue";

/**
 * 资源参数类型定义
 * @interface ResourceParam
 */
interface ResourceParam {
    /** 图标资源属性 */
    icon: UE_EL_UTIL.ResourceIconAttrs;
    /** SVG资源属性 */
    svg: UE_EL_UTIL.ResourceSvgAttrs;
    /** Lottie动画资源 */
    lottie: string;
    /** 分享图标资源 */
    shareIcon: string;
    /** 文本装饰资源 */
    textDecoration: string;
    /** 按钮悬停效果资源 */
    buttonHoverEffect: string;
    /** 图片资源 */
    image: string;
}

/**
 * 资源预览增强类型
 * @interface ResourcePreviewEnhance
 */
interface ResourcePreviewEnhance {
    image: {
        focus: { enable: boolean; pos: string };
    };
    icon: undefined;
    lottie: undefined;
    svg: undefined;
    shareIcon: undefined;
    textDecoration: undefined;
    buttonHoverEffect: undefined;
}

/**
 * 资源预览触发类型
 * @interface ResourcePreviewEmits
 */
export interface ResourcePreviewEmitsParams {
    icon: never;
    svg: never;
    lottie: never;
    shareIcon: never;
    textDecoration: never;
    buttonHoverEffect: never;
    image: { type: "focus"; data: { pos: string } };
}

/** 资源预览类型 */
export type UeElResourcePreviewType = keyof ResourceParam;

/** 资源预览类型列表 */
const RESOURCE_PREVIEW_TYPES: UeElResourcePreviewType[] = [
    "icon",
    "lottie",
    "svg",
    "shareIcon",
    "textDecoration",
    "buttonHoverEffect",
    "image",
] as const;

/**
 * 检查是否为有效的资源预览类型
 * @param type - 待检查的类型字符串
 * @returns 是否为有效的资源预览类型
 */
export function isResourcePreviewType(type: string): type is UeElResourcePreviewType {
    return RESOURCE_PREVIEW_TYPES.includes(type as UeElResourcePreviewType);
}

/**
 * 检查是否为有效的资源预览属性
 * @param type - 资源类型
 * @param attrs - 资源属性
 * @returns 是否为有效的资源预览属性
 */
export function isResourcePreviewAttrs(
    type: string,
    attrs?: string | Record<string, any>
): attrs is UE_EL_UTIL.ResourceIconAttrs {
    if (!isResourcePreviewType(type)) return false;
    return typeof attrs === "undefined" || typeof attrs === "string" || "source" in attrs;
}

/**
 * 资源预览组件基础属性接口
 * @interface UeElResourcePreviewBaseProps
 * @template T - 资源类型
 */
export interface UeElResourcePreviewBaseProps<T extends UeElResourcePreviewType = UeElResourcePreviewType> {
    /** 资源类型 */
    type: T;
    /** 资源属性 */
    attrs?: ResourceParam[T];
    /** 资源预览增强类型 */
    enhance?: ResourcePreviewEnhance[T];
}

/** 资源预览组件实例类型 */
export type UeElResourcePreviewInstance = InstanceType<typeof UeElResourcePreview>;

/**
 * 安装资源预览组件
 * @param app - Vue应用实例
 */
UeElResourcePreview.install = (app: App) => {
    if (!UeElResourcePreview.name) return;
    app.component(UeElResourcePreview.name, UeElResourcePreview);
};

export default UeElResourcePreview;
