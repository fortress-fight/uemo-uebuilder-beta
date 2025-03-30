/*
 * @Description: 圆角控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:43:09
 */
import type { App } from "vue";

import UeElRadiusSettingGroup from "./Main.vue";

UeElRadiusSettingGroup.install = (app: App) => {
    if (!UeElRadiusSettingGroup.name) return;
    app.component(UeElRadiusSettingGroup.name, UeElRadiusSettingGroup);
};

export interface UeElRadiusSettingGroupBaseProps {
    title?: string;
    value?: string;
    disable?: boolean;
    isLock?: boolean;
    defaultValue?: string;
}
export type UeElRadiusSettingGroupInstance = InstanceType<typeof UeElRadiusSettingGroup>;

export default UeElRadiusSettingGroup;
