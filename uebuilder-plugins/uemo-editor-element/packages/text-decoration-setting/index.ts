/*
 * @Description: 文字装饰效果控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 18:42:17
 */
import type { App } from "vue";

import UeElTextDecorationSetting from "./Main.vue";

UeElTextDecorationSetting.install = (app: App) => {
    if (!UeElTextDecorationSetting.name) return;
    app.component(UeElTextDecorationSetting.name, UeElTextDecorationSetting);
};

export interface UeElTextDecorationSettingValue {
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

export interface UeElTextDecorationSettingBaseProps {
    disabled?: boolean;
}
export type UeElTextDecorationSettingInstance = InstanceType<typeof UeElTextDecorationSetting>;

export default UeElTextDecorationSetting;
