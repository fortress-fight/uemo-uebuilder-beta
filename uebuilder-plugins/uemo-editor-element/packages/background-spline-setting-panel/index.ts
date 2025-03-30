/*
 * @Description: spline背景设置控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 18:10:43
 */
import type { App } from "vue";

import UeElBackgroundSplineSettingPanel from "./Main.vue";

UeElBackgroundSplineSettingPanel.install = (app: App) => {
    if (!UeElBackgroundSplineSettingPanel.name) return;
    app.component(UeElBackgroundSplineSettingPanel.name, UeElBackgroundSplineSettingPanel);
};

export type UeElBackgroundSplineSettingPanelValue = {
    url: string;
    effect?: "normal" | "parallax" | "sticky";
};
export interface UeElBackgroundSplineSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundSplineSettingPanelInstance = InstanceType<typeof UeElBackgroundSplineSettingPanel>;

export default UeElBackgroundSplineSettingPanel;
