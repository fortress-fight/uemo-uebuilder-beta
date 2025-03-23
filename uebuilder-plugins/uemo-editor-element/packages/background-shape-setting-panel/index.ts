/*
 * @Description: 背景图形控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 16:52:36
 */
import type { App } from "vue";

import UeElBackgroundShapeSettingPanel from "./Main.vue";

UeElBackgroundShapeSettingPanel.install = (app: App) => {
    if (!UeElBackgroundShapeSettingPanel.name) return;
    app.component(UeElBackgroundShapeSettingPanel.name, UeElBackgroundShapeSettingPanel);
};

export interface UeElBackgroundShapeSettingPanelPanelValue {
    name: string;
    pos?: string;
    mirroring?: boolean;
    color?: string;
    opacity?: number;
    height?: string;
}

export interface UeElBackgroundShapeSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundShapeSettingPanelInstance = InstanceType<typeof UeElBackgroundShapeSettingPanel>;

export default UeElBackgroundShapeSettingPanel;
