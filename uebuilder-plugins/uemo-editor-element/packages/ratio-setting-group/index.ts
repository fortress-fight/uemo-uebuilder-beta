/*
 * @Description: 比例调节组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 14:53:18
 */
import type { App } from "vue";

import UeElRatioSettingGroup from "./Main.vue";

UeElRatioSettingGroup.install = (app: App) => {
    if (!UeElRatioSettingGroup.name) return;
    app.component(UeElRatioSettingGroup.name, UeElRatioSettingGroup);
};

export interface UeElRatioSettingGroupBaseProps {
    defaultValue?: string;
}
export type UeElRatioSettingGroupInstance = InstanceType<typeof UeElRatioSettingGroup>;

export default UeElRatioSettingGroup;
