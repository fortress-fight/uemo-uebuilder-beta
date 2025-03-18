/*
 * @Description: 资源文件预览组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 11:10:27
 */
import type { App } from "vue";

import UeElResourcePreview from "./Main.vue";

UeElResourcePreview.install = (app: App) => {
    if (!UeElResourcePreview.name) return;
    app.component(UeElResourcePreview.name, UeElResourcePreview);
};

type ResourcePreviewType = "icon" | "lottie" | "svg" | "shareIcon" | "textDecoration" | "buttonHoverEffect";

export function isResourcePreviewType(type: string): type is ResourcePreviewType {
    return ["icon", "lottie", "svg", "shareIcon", "textDecoration", "buttonHoverEffect"].includes(type);
}

export function isResourcePreviewAttrs(
    type: string,
    attrs?: string | Record<string, any>
): attrs is UE_EL_UTIL.ResourceIconAttrs {
    if (!isResourcePreviewType(type)) return false;
    return typeof attrs === "undefined" || typeof attrs === "string" || "source" in attrs;
}

export interface UeElResourcePreviewBaseProps {
    type: ResourcePreviewType;
    attrs?: string | UE_EL_UTIL.ResourceIconAttrs | UE_EL_UTIL.ResourceSvgAttrs;
}
export type UeElResourcePreviewInstance = InstanceType<typeof UeElResourcePreview>;

export default UeElResourcePreview;
