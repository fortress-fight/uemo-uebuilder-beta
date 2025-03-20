/*
 * @Description: spline背景设置控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 00:49:15
 */
import type { App } from "vue";

import UeElBackgroundSplineSetting from "./Main.vue";

UeElBackgroundSplineSetting.install = (app: App) => {
    if (!UeElBackgroundSplineSetting.name) return;
    app.component(UeElBackgroundSplineSetting.name, UeElBackgroundSplineSetting);
};

export type UeElBackgroundSplineSettingValue = {
    url: string;
    effect?: "normal" | "parallax" | "sticky";
};
export interface UeElBackgroundSplineSettingBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundSplineSettingInstance = InstanceType<typeof UeElBackgroundSplineSetting>;

export default UeElBackgroundSplineSetting;
