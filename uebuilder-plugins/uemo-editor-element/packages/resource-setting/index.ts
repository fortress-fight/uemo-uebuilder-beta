/*
 * @Description: 资源设置组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 01:02:45
 */
import type { App } from "vue";

import UeElResourceSetting from "./Main.vue";

UeElResourceSetting.install = (app: App) => {
    if (!UeElResourceSetting.name) return;
    app.component(UeElResourceSetting.name, UeElResourceSetting);
};

export type UeElResourceSettingType =
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

export type UeElResourceSettingEmitParams = {
    image: { type: "focus"; data: { pos: string } };
    button: never;
    svg: never;
    lottie: never;
    video: never;
    spline: never;
    icon: never;
    shareIcon: never;
    textDecoration: never;
    buttonHoverEffect: never;
};

export type UeElResourceSettingValue = {
    button: UE_EL_UTIL.ResourceButtonItem["attrs"];
    icon: UE_EL_UTIL.ResourceIconAttrs;
    svg: UE_EL_UTIL.ResourceSvgAttrs;
    lottie: string;
    video: string;
    spline: string;
    shareIcon: string;
    textDecoration: string;
    buttonHoverEffect: string;
    image: string;
};

export interface UeElResourceSettingBaseProps<T extends UeElResourceSettingType = UeElResourceSettingType> {
    type: T;
    removable?: boolean;
    libraryAttrs?: { type: UE_EL_UTIL.LottieLibraryType };
    popPanelProps?: UE_EL_COMPONENT.UeElPopPanelProps;
    enhance?: {
        image: {
            focus: { enable: boolean; pos: string };
        };
        button: undefined;
        svg: undefined;
        lottie: undefined;
        video: undefined;
        spline: undefined;
        icon: undefined;
        shareIcon: undefined;
        textDecoration: undefined;
        buttonHoverEffect: undefined;
    }[T];
}
export type UeElResourceSettingInstance = InstanceType<typeof UeElResourceSetting>;

export default UeElResourceSetting;
