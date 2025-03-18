/*
 * @Description: 资源设置组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 11:00:39
 */
import type { App } from "vue";

import UeElResourceSetting from "./Main.vue";

UeElResourceSetting.install = (app: App) => {
    if (!UeElResourceSetting.name) return;
    app.component(UeElResourceSetting.name, UeElResourceSetting);
};

export type ResourceValue =
    | string
    | UE_EL_UTIL.ResourceButtonItem["attrs"]
    | UE_EL_UTIL.ResourceIconAttrs
    | UE_EL_UTIL.ResourceSvgAttrs;

export interface UeElResourceSettingBaseProps {
    removable?: boolean;
    type:
        | "button"
        | "image"
        | "svg"
        | "lottie"
        | "video"
        | "spline"
        | "icon"
        | "shareIcon"
        | "textDecoration"
        | "buttonHoverEffect";
}
export type UeElResourceSettingInstance = InstanceType<typeof UeElResourceSetting>;

export default UeElResourceSetting;
