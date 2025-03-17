/*
 * @Description: 资源文件预览组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 03:33:56
 */
import type { App } from "vue";

import UeElResourcePreview from "./Main.vue";

UeElResourcePreview.install = (app: App) => {
    if (!UeElResourcePreview.name) return;
    app.component(UeElResourcePreview.name, UeElResourcePreview);
};

export function isResourcePreviewType(
    type: string
): type is "icon" | "lottie" | "svg" | "shareIcon" | "textDecoration" | "buttonHoverEffect" {
    return ["icon", "lottie", "svg", "shareIcon", "textDecoration", "buttonHoverEffect"].includes(type);
}

export function isResourcePreviewAttrs(attrs?: string | Record<string, any>): attrs is UE_EL_UTIL.ResourceIconAttrs {
    return typeof attrs === "undefined" || typeof attrs === "string" || ("name" in attrs && "source" in attrs);
}

export interface UeElResourcePreviewBaseProps {
    type: "icon" | "lottie" | "svg" | "shareIcon" | "textDecoration" | "buttonHoverEffect";
    attrs?: string | UE_EL_UTIL.ResourceIconAttrs;
}
export type UeElResourcePreviewInstance = InstanceType<typeof UeElResourcePreview>;

export default UeElResourcePreview;
