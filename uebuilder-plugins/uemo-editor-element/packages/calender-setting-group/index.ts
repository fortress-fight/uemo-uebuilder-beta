/*
 * @Description: 日历控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:57:44
 */
import type { App } from "vue";

import UeElCalenderSettingGroup from "./Main.vue";

UeElCalenderSettingGroup.install = (app: App) => {
    if (!UeElCalenderSettingGroup.name) return;
    app.component(UeElCalenderSettingGroup.name, UeElCalenderSettingGroup);
};

export interface UeElCalenderSettingGroupBaseProps {
    title?: string;
    value?: string;
    disable?: boolean;
}
export type UeElCalenderSettingGroupInstance = InstanceType<typeof UeElCalenderSettingGroup>;

export default UeElCalenderSettingGroup;
