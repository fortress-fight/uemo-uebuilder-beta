/*
 * @Description: 背景属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-24 01:15:05
 */
import type { App } from "vue";
import type { UeElScrollEffectSettingPanelValue } from "../scroll-effect-setting-panel";

import UeElBackgroundSettingGroup from "./Main.vue";

UeElBackgroundSettingGroup.install = (app: App) => {
    if (!UeElBackgroundSettingGroup.name) return;
    app.component(UeElBackgroundSettingGroup.name, UeElBackgroundSettingGroup);
};

export type TYPE_BG_TYPE = keyof UE_EL_BACKGROUND_PARAM_MAP;
export type TYPE_BG_TYPE_PARAM = {
    [key in TYPE_BG_TYPE]: { limit: number; data: UE_EL_BACKGROUND_PARAM_MAP[key] };
};

export type UE_EL_BACKGROUND_PARAM_MAP = {
    color: string | { color: string; opacity?: number };
    image: {
        width?: string;
        height?: string;
        translate?: string;
        image: string;
        effect?: "normal" | "parallax" | "fixed" | "scroll";
        align?: UE_EL_UTIL.ALIGN;
        opacity?: number;
        size?: "repeat" | "cover" | "normal" | "contain";
        scrollEffect?: UeElScrollEffectSettingPanelValue;
    };
    video: {
        video: string;
        scrollEffect?: UeElScrollEffectSettingPanelValue;
    };
    blur: {
        color: string;
        blur: string;
    };
    shape: {
        name: string;
        pos?: string;
        mirroring?: boolean;
        color?: string;
        opacity?: number;
        height?: string;
    };
    spline: {
        url: string;
        poster?: string;
        effect?: "normal" | "parallax" | "sticky";
        type?: string;
        w?: number;
        h?: number;
    };
    svg: {
        url: string;
        translate?: string;
        opacity?: number;
        effect?: "normal" | "sticky" | "scroll";
        align?: UE_EL_UTIL.ALIGN;
        size?: "custom" | "cover" | "normal" | "contain";
        strokeColor?: string;
        fillColor?: string;
        width?: string;
        natureWidth?: number;
        natureHeight?: number;

        scrollEffect?: UeElScrollEffectSettingPanelValue;
    };
};

/**
 * @description 背景参数
 */
type BACKGROUND_VALUE<T extends keyof UE_EL_BACKGROUND_PARAM_MAP> = {
    id: string;
    type: T;
    value: UE_EL_BACKGROUND_PARAM_MAP[T];
};

export type UeElBackgroundSettingGroupValue = BACKGROUND_VALUE<TYPE_BG_TYPE>[];

export interface UeElBackgroundSettingGroupBaseProps {
    enableType?: TYPE_BG_TYPE[];
    typeParam?: TYPE_BG_TYPE_PARAM;
}
export type UeElBackgroundSettingGroupInstance = InstanceType<typeof UeElBackgroundSettingGroup>;

export default UeElBackgroundSettingGroup;
