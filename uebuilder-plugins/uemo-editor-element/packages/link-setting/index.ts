/*
 * @Description: 链接属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 17:26:53
 */
import type { App } from "vue";

import UeElLinkSetting from "./Main.vue";

UeElLinkSetting.install = (app: App) => {
    if (!UeElLinkSetting.name) return;
    app.component(UeElLinkSetting.name, UeElLinkSetting);
};

export interface UeElLinkSettingBaseProps {
    disable?: boolean;
}
export type UeElLinkSettingInstance = InstanceType<typeof UeElLinkSetting>;

export default UeElLinkSetting;
