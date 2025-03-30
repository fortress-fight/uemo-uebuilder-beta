/*
 * @Description: 网格属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-20 13:55:57
 */
import type { App } from "vue";

import UeElGridLayoutSetting from "./Main.vue";

UeElGridLayoutSetting.install = (app: App) => {
    if (!UeElGridLayoutSetting.name) return;
    app.component(UeElGridLayoutSetting.name, UeElGridLayoutSetting);
};

export interface UeElGridLayoutSettingBaseProps {
    type?: "desktop" | "mobile";
    withReplace?: boolean | "custom";
    enableZIndexMode?: boolean;
}
export type UeElGridLayoutSettingInstance = InstanceType<typeof UeElGridLayoutSetting>;

export default UeElGridLayoutSetting;
