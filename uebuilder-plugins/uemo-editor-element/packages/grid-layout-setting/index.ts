/*
 * @Description: 网格属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 01:08:13
 */
import type { App } from "vue";

import UeElGridLayoutSetting from "./Main.vue";

UeElGridLayoutSetting.install = (app: App) => {
    if (!UeElGridLayoutSetting.name) return;
    app.component(UeElGridLayoutSetting.name, UeElGridLayoutSetting);
};

export interface UeElGridLayoutSettingBaseProps {
    type?: "desktop" | "mobile";
    withReplace?: boolean;
    enableZIndexMode?: boolean;
}
export type UeElGridLayoutSettingInstance = InstanceType<typeof UeElGridLayoutSetting>;

export default UeElGridLayoutSetting;
