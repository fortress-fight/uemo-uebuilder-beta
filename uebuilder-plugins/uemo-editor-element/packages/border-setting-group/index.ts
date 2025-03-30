/*
 * @Description: 边框控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:28:50
 */
import type { App } from "vue";

import UeElBorderSettingGroup from "./Main.vue";

UeElBorderSettingGroup.install = (app: App) => {
    if (!UeElBorderSettingGroup.name) return;
    app.component(UeElBorderSettingGroup.name, UeElBorderSettingGroup);
};

export interface UeElBorderSettingGroupBaseProps {
    title?: string;
    colorType?: UE_EL_UTIL.ColorType;
    defaultValue?: UE_EL_UTIL.BorderValue;
}
export type UeElBorderSettingGroupInstance = InstanceType<typeof UeElBorderSettingGroup>;

export default UeElBorderSettingGroup;
