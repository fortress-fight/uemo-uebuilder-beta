/*
 * @Description: 按钮样式属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 16:57:25
 */
import type { App } from "vue";

import UeElButtonStyleSettingPanel from "./Main.vue";

UeElButtonStyleSettingPanel.install = (app: App) => {
    if (!UeElButtonStyleSettingPanel.name) return;
    app.component(UeElButtonStyleSettingPanel.name, UeElButtonStyleSettingPanel);
};

export interface UeElButtonStyleSettingPanelPanelValue {
    color?: string;
    animation?: string;
    background?: string;
    radius?: string;
    border?: { width: string; color: string; style: string };
    shadow?: string;
}

export interface UeElButtonStyleSettingPanelPanelBaseProps {
    mode?: "normal" | "hover";
    theme?: string;
    title?: string;
    disabled?: boolean;
}
export type UeElButtonStyleSettingPanelInstance = InstanceType<typeof UeElButtonStyleSettingPanel>;

export default UeElButtonStyleSettingPanel;
