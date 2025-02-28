/*
 * @Description: 间隔设置
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 02:30:07
 */
import type { App } from "vue";

import UeElGapSetting from "./Main.vue";

UeElGapSetting.install = (app: App) => {
    if (!UeElGapSetting.name) return;
    app.component(UeElGapSetting.name, UeElGapSetting);
};

export interface UeElGapSettingBaseProps {
    disable?: boolean;
    dir?: "x" | "y" | "xy";
    defaultValue?: string;
    xLimit?: UE_EL_UTIL.NumInputLimit;
    xUnits?: UE_EL_UTIL.NumInputUnits;
    yLimit?: UE_EL_UTIL.NumInputLimit;
    yUnits?: UE_EL_UTIL.NumInputUnits;
}
export type UeElGapSettingInstance = InstanceType<typeof UeElGapSetting>;

export default UeElGapSetting;
