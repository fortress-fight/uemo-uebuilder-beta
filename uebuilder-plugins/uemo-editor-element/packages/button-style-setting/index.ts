/*
 * @Description: 按钮样式设置控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 18:08:37
 */
import type { App } from "vue";

import UeElButtonStyleSetting from "./Main.vue";

UeElButtonStyleSetting.install = (app: App) => {
    if (!UeElButtonStyleSetting.name) return;
    app.component(UeElButtonStyleSetting.name, UeElButtonStyleSetting);
};

export interface UeElButtonStyleSettingBaseProps {
    theme?: string;
    disable?: boolean;
}
export type UeElButtonStyleSettingInstance = InstanceType<typeof UeElButtonStyleSetting>;

export default UeElButtonStyleSetting;
