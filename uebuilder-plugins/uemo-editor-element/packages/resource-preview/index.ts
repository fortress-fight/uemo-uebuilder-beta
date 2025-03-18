/*
 * @Description: 资源文件预览组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 12:49:34
 */
import type { App } from "vue";

import UeElResourcePreview from "./Main.vue";

interface ResourceParam {
    icon: UE_EL_UTIL.ResourceIconAttrs;
    svg: UE_EL_UTIL.ResourceSvgAttrs;
    lottie: string;
    shareIcon: string;
    textDecoration: string;
    buttonHoverEffect: string;
    image: string;
}

export type UeElResourcePreviewType = keyof ResourceParam;

UeElResourcePreview.install = (app: App) => {
    if (!UeElResourcePreview.name) return;
    app.component(UeElResourcePreview.name, UeElResourcePreview);
};

const ResourcePreviewTypeList: UeElResourcePreviewType[] = [
    "icon",
    "lottie",
    "svg",
    "shareIcon",
    "textDecoration",
    "buttonHoverEffect",
    "image",
];

export function isResourcePreviewType(type: string): type is UeElResourcePreviewType {
    return ResourcePreviewTypeList.includes(type as UeElResourcePreviewType);
}

export function isResourcePreviewAttrs(
    type: string,
    attrs?: string | Record<string, any>
): attrs is UE_EL_UTIL.ResourceIconAttrs {
    if (!isResourcePreviewType(type)) return false;
    return typeof attrs === "undefined" || typeof attrs === "string" || "source" in attrs;
}

export interface UeElResourcePreviewBaseProps<T extends UeElResourcePreviewType = UeElResourcePreviewType> {
    type: T;
    attrs?: ResourceParam[T];
}

export type UeElResourcePreviewInstance = InstanceType<typeof UeElResourcePreview>;

export default UeElResourcePreview;
