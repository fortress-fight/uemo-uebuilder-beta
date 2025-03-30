/*
 * @Description: 外间距控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 03:04:23
 */
import type { App } from "vue";

import UeElMarginSetting from "./Main.vue";

UeElMarginSetting.install = (app: App) => {
    if (!UeElMarginSetting.name) return;
    app.component(UeElMarginSetting.name, UeElMarginSetting);
};

export interface UeElMarginSettingBaseProps {
    disable?: boolean;
    type?: "x" | "y" | "xy";
    defaultValue?: string;
    units?: UE_EL_UTIL.NumInputUnit[];
    limit?: UE_EL_UTIL.NumInputLimit;
}
export type UeElMarginSettingInstance = InstanceType<typeof UeElMarginSetting>;

export default UeElMarginSetting;
