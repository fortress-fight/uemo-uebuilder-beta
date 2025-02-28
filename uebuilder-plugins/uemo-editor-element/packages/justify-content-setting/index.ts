/*
 * @Description: 横向排版控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 04:56:49
 */
import type { App } from "vue";

import UeElJustifyContentSetting from "./Main.vue";

UeElJustifyContentSetting.install = (app: App) => {
    if (!UeElJustifyContentSetting.name) return;
    app.component(UeElJustifyContentSetting.name, UeElJustifyContentSetting);
};

export interface UeElJustifyContentSettingBaseProps {
    disable?: boolean;
    defaultValue?: string;
    enableOptions?: string[];
}
export type UeElJustifyContentSettingInstance = InstanceType<typeof UeElJustifyContentSetting>;

export default UeElJustifyContentSetting;
