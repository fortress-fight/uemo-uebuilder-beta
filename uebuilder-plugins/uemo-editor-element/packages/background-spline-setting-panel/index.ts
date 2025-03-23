/*
 * @Description: spline背景设置控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 16:54:15
 */
import type { App } from "vue";

import UeElBackgroundSplinePanelSetting from "./Main.vue";

UeElBackgroundSplinePanelSetting.install = (app: App) => {
    if (!UeElBackgroundSplinePanelSetting.name) return;
    app.component(UeElBackgroundSplinePanelSetting.name, UeElBackgroundSplinePanelSetting);
};

export type UeElBackgroundSplinePanelSettingPanelValue = {
    url: string;
    effect?: "normal" | "parallax" | "sticky";
};
export interface UeElBackgroundSplinePanelSettingBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundSplinePanelSettingInstance = InstanceType<typeof UeElBackgroundSplinePanelSetting>;

export default UeElBackgroundSplinePanelSetting;
