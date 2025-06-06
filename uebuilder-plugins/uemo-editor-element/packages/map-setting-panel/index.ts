/*
 * @Description: 地图设置面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 01:17:05
 */
import type { App } from "vue";

import UeElMapSettingPanel from "./Main.vue";

UeElMapSettingPanel.install = (app: App) => {
    if (!UeElMapSettingPanel.name) return;
    app.component(UeElMapSettingPanel.name, UeElMapSettingPanel);
};

export interface UeElMapSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElMapSettingPanelInstance = InstanceType<typeof UeElMapSettingPanel>;

export default UeElMapSettingPanel;
