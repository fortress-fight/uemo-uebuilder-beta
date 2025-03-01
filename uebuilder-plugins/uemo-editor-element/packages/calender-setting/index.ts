/*
 * @Description: 日期控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 18:51:25
 */
import type { App } from "vue";

import UeElCalenderSetting from "./Main.vue";

UeElCalenderSetting.install = (app: App) => {
    if (!UeElCalenderSetting.name) return;
    app.component(UeElCalenderSetting.name, UeElCalenderSetting);
};

export interface UeElCalenderSettingBaseProps {
    format?: string;
}
export type UeElCalenderSettingInstance = InstanceType<typeof UeElCalenderSetting>;

export default UeElCalenderSetting;
