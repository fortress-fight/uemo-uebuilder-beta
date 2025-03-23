/*
 * @Description: 文字装饰效果控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 16:56:10
 */
import type { App } from "vue";

import UeElTextDecorationPanelSetting from "./Main.vue";

UeElTextDecorationPanelSetting.install = (app: App) => {
    if (!UeElTextDecorationPanelSetting.name) return;
    app.component(UeElTextDecorationPanelSetting.name, UeElTextDecorationPanelSetting);
};

export interface UeElTextDecorationPanelSettingPanelValue {
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

export interface UeElTextDecorationPanelSettingBaseProps {
    disabled?: boolean;
}
export type UeElTextDecorationPanelSettingInstance = InstanceType<typeof UeElTextDecorationPanelSetting>;

export default UeElTextDecorationPanelSetting;
