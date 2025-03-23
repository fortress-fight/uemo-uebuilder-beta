/*
 * @Description: 背景图片控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 16:42:53
 */
import type { App } from "vue";

import UeElBackgroundImageSettingPanel from "./Main.vue";

UeElBackgroundImageSettingPanel.install = (app: App) => {
    if (!UeElBackgroundImageSettingPanel.name) return;
    app.component(UeElBackgroundImageSettingPanel.name, UeElBackgroundImageSettingPanel);
};

export type UeElBackgroundImageSettingPanelValue = {
    translate?: string;
    image: string;
    effect?: "normal" | "parallax" | "fixed" | "scroll";
    align?: UE_EL_UTIL.ALIGN;
    opacity?: number;
    size?: "repeat" | "cover" | "normal" | "contain";
    scrollEffect?: UE_EL_UTIL.SCROLL_EFFECT;
};
export interface UeElBackgroundImageSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundImageSettingPanelInstance = InstanceType<typeof UeElBackgroundImageSettingPanel>;

export default UeElBackgroundImageSettingPanel;
