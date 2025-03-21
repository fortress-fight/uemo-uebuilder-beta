/*
 * @Description: 按钮样式属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-22 01:32:49
 */
import type { App } from "vue";

import UeElButtonStyleSetting from "./Main.vue";

UeElButtonStyleSetting.install = (app: App) => {
    if (!UeElButtonStyleSetting.name) return;
    app.component(UeElButtonStyleSetting.name, UeElButtonStyleSetting);
};

export interface UeElButtonStyleSettingValue {
    color?: string;
    animation?: string;
    background?: string;
    radius?: string;
    border?: { width: string; color: string; style: string };
    shadow?: string;
}

export interface UeElButtonStyleSettingBaseProps {
    mode?: "normal" | "hover";
    theme?: string;
    title?: string;
    disabled?: boolean;
}
export type UeElButtonStyleSettingInstance = InstanceType<typeof UeElButtonStyleSetting>;

export default UeElButtonStyleSetting;
