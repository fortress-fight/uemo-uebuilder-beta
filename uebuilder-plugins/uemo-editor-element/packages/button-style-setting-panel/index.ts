/*
 * @Description: 按钮样式属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 18:09:13
 */
import type { App } from "vue";

import UeElButtonStyleSettingPanel from "./Main.vue";

UeElButtonStyleSettingPanel.install = (app: App) => {
    if (!UeElButtonStyleSettingPanel.name) return;
    app.component(UeElButtonStyleSettingPanel.name, UeElButtonStyleSettingPanel);
};

export interface UeElButtonStyleSettingPanelValue {
    color?: string;
    animation?: string;
    background?: string;
    radius?: string;
    border?: { width: string; color: string; style: string };
    shadow?: string;
}

export interface UeElButtonStyleSettingPanelBaseProps {
    mode?: "normal" | "hover";
    theme?: string;
    title?: string;
    disabled?: boolean;
}
export type UeElButtonStyleSettingPanelInstance = InstanceType<typeof UeElButtonStyleSettingPanel>;

export default UeElButtonStyleSettingPanel;
