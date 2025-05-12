/*
 * @Description: 链接属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-05-12 01:26:06
 */
import type { App } from "vue";

import UeElLinkSettingPanel from "./Main.vue";

UeElLinkSettingPanel.install = (app: App) => {
    if (!UeElLinkSettingPanel.name) return;
    app.component(UeElLinkSettingPanel.name, UeElLinkSettingPanel);
};

export type UeElLinkSettingPanelValue = UE_EL_UTIL.LinkValue;

export interface UeElLinkSettingPanelBaseProps {
    title?: string;
    enableTriggerArea?: boolean;
}
export type UeElLinkSettingPanelInstance = InstanceType<typeof UeElLinkSettingPanel>;

export default UeElLinkSettingPanel;
