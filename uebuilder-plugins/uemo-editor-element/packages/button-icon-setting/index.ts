/*
 * @Description: 按钮图标属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 11:40:15
 */
import type { App } from "vue";

import UeElButtonIconSetting from "./Main.vue";

UeElButtonIconSetting.install = (app: App) => {
    if (!UeElButtonIconSetting.name) return;
    app.component(UeElButtonIconSetting.name, UeElButtonIconSetting);
};

export type UeElButtonIconSettingType = "static" | "lottie" | "svg";
export type UeElButtonIconSettingValue = {
    source: string;
    name?: string;
    color?: string;
    size?: string;
    space?: string;
};

export interface UeElButtonIconSettingBaseProps {
    disable?: boolean;
}
export type UeElButtonIconSettingInstance = InstanceType<typeof UeElButtonIconSetting>;

export default UeElButtonIconSetting;
