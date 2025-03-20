/*
 * @Description: 背景图片控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 02:21:04
 */
import type { App } from "vue";

import UeElBackgroundImageSetting from "./Main.vue";

UeElBackgroundImageSetting.install = (app: App) => {
    if (!UeElBackgroundImageSetting.name) return;
    app.component(UeElBackgroundImageSetting.name, UeElBackgroundImageSetting);
};

export type UeElBackgroundImageSettingValue = {
    translate?: string;
    image: string;
    effect?: "normal" | "parallax" | "fixed" | "scroll";
    align?: UE_EL_UTIL.ALIGN;
    opacity?: number;
    size?: "repeat" | "cover" | "normal" | "contain";
    scrollEffect?: UE_EL_UTIL.SCROLL_EFFECT;
};
export interface UeElBackgroundImageSettingBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundImageSettingInstance = InstanceType<typeof UeElBackgroundImageSetting>;

export default UeElBackgroundImageSetting;
