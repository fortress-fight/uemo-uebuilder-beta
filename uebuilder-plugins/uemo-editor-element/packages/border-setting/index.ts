/*
 * @Description: 边框控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 00:18:22
 */
import type { App } from "vue";

import UeElBorderSetting from "./Main.vue";

UeElBorderSetting.install = (app: App) => {
    if (!UeElBorderSetting.name) return;
    app.component(UeElBorderSetting.name, UeElBorderSetting);
};

export interface UeElBorderSettingBaseProps {
    disable?: boolean;
    colorType?: UE_EL_UTIL.ColorType;
    defaultValue?: UE_EL_UTIL.BorderValue;
}
export type UeElBorderSettingInstance = InstanceType<typeof UeElBorderSetting>;

export default UeElBorderSetting;
