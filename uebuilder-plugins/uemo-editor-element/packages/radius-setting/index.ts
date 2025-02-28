/*
 * @Description: 圆角控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 04:15:14
 */
import type { App } from "vue";

import UeElRadiusSetting from "./Main.vue";

UeElRadiusSetting.install = (app: App) => {
    if (!UeElRadiusSetting.name) return;
    app.component(UeElRadiusSetting.name, UeElRadiusSetting);
};

export interface UeElRadiusSettingBaseProps {
    disable?: boolean;
    defaultValue?: string;
    units?: UE_EL_UTIL.NumInputUnit[];
    limit?: UE_EL_UTIL.NumInputLimit;
}
export type UeElRadiusSettingInstance = InstanceType<typeof UeElRadiusSetting>;

export default UeElRadiusSetting;
