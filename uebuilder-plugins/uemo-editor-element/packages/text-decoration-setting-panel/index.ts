/*
 * @Description: 文字装饰效果控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 16:56:10
 */
import type { App } from "vue";

import UeElTextDecorationSettingPanel from "./Main.vue";

UeElTextDecorationSettingPanel.install = (app: App) => {
    if (!UeElTextDecorationSettingPanel.name) return;
    app.component(UeElTextDecorationSettingPanel.name, UeElTextDecorationSettingPanel);
};

export interface UeElTextDecorationSettingPanelPanelValue {
    svgName?: string;
    color?: string;
    width?: string;
    animate?: boolean;
    ease?: string;
    pointer?: string;
    delay?: string;
    duration?: string;
    preview?: boolean;
}

export interface UeElTextDecorationSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElTextDecorationSettingPanelInstance = InstanceType<typeof UeElTextDecorationSettingPanel>;

export default UeElTextDecorationSettingPanel;
