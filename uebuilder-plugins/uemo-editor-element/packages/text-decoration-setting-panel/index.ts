/*
 * @Description: 文字装饰效果控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 12:55:48
 */
import type { App } from "vue";

import UeElTextDecorationSettingPanel from "./Main.vue";

UeElTextDecorationSettingPanel.install = (app: App) => {
    if (!UeElTextDecorationSettingPanel.name) return;
    app.component(UeElTextDecorationSettingPanel.name, UeElTextDecorationSettingPanel);
};

export interface UeElTextDecorationSettingPanelValue {
    svgName?: string;
    color?: string;
    width?: string;
    animate?: boolean;
    ease?: string;
    pointer?: string;
    delay?: string;
    duration?: string;
}

export interface UeElTextDecorationSettingPanelBaseProps {
    disabled?: boolean;
}
export type UeElTextDecorationSettingPanelInstance = InstanceType<typeof UeElTextDecorationSettingPanel>;

export default UeElTextDecorationSettingPanel;
