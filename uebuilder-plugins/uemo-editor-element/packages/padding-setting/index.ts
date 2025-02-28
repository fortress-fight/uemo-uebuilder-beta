/*
 * @Description: 内间距控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 03:59:19
 */
import type { App } from "vue";

import UeElPaddingSetting from "./Main.vue";

UeElPaddingSetting.install = (app: App) => {
    if (!UeElPaddingSetting.name) return;
    app.component(UeElPaddingSetting.name, UeElPaddingSetting);
};

export interface UeElPaddingSettingBaseProps {
    disable?: boolean;
    type?: "x" | "y" | "xy";
    defaultValue?: string;
    units?: UE_EL_UTIL.NumInputUnit[];
    limit?: UE_EL_UTIL.NumInputLimit;
}
export type UeElPaddingSettingInstance = InstanceType<typeof UeElPaddingSetting>;

export default UeElPaddingSetting;
