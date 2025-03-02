/*
 * @Description: 投影控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 22:55:07
 */
import type { App } from "vue";

import UeElBoxShadowSetting from "./Main.vue";

UeElBoxShadowSetting.install = (app: App) => {
    if (!UeElBoxShadowSetting.name) return;
    app.component(UeElBoxShadowSetting.name, UeElBoxShadowSetting);
};

export interface UeElBoxShadowSettingBaseProps {
    disable?: boolean;
    defaultValue?: string;
}
export type UeElBoxShadowSettingInstance = InstanceType<typeof UeElBoxShadowSetting>;

export default UeElBoxShadowSetting;
