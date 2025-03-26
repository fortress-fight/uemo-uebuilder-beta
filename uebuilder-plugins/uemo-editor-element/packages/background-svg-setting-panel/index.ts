/*
 * @Description: 背景SVG控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-26 03:20:23
 */
import type { App } from "vue";
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../background-setting-group";

import UeElBackgroundSvgSettingPanel from "./Main.vue";

UeElBackgroundSvgSettingPanel.install = (app: App) => {
    if (!UeElBackgroundSvgSettingPanel.name) return;
    app.component(UeElBackgroundSvgSettingPanel.name, UeElBackgroundSvgSettingPanel);
};

export type UeElBackgroundSvgSettingPanelValue = UE_EL_BACKGROUND_PARAM_MAP["svg"];

export interface UeElBackgroundSvgSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundSvgSettingPanelInstance = InstanceType<typeof UeElBackgroundSvgSettingPanel>;

export default UeElBackgroundSvgSettingPanel;
