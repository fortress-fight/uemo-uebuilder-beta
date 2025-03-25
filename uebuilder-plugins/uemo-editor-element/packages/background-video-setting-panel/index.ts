/*
 * @Description: 背景视频控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-26 03:07:35
 */
import type { App } from "vue";
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../background-setting-group";

import UeElBackgroundVideoSettingPanel from "./Main.vue";

UeElBackgroundVideoSettingPanel.install = (app: App) => {
    if (!UeElBackgroundVideoSettingPanel.name) return;
    app.component(UeElBackgroundVideoSettingPanel.name, UeElBackgroundVideoSettingPanel);
};

export type UeElBackgroundVideoSettingPanelValue = UE_EL_BACKGROUND_PARAM_MAP["video"];

export interface UeElBackgroundVideoSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundVideoSettingPanelInstance = InstanceType<typeof UeElBackgroundVideoSettingPanel>;

export default UeElBackgroundVideoSettingPanel;
