/*
 * @Description: 网页设置面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 01:17:29
 */
import type { App } from "vue";

import UeElWebSettingPanel from "./Main.vue";

UeElWebSettingPanel.install = (app: App) => {
    if (!UeElWebSettingPanel.name) return;
    app.component(UeElWebSettingPanel.name, UeElWebSettingPanel);
};

export interface UeElWebSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElWebSettingPanelInstance = InstanceType<typeof UeElWebSettingPanel>;

export default UeElWebSettingPanel;
