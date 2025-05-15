/*
 * @Description: 尺寸调节组
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 15:27:26
 */
import type { App } from "vue";

import UeElSizeSettingGroup from "./Main.vue";

UeElSizeSettingGroup.install = (app: App) => {
    if (!UeElSizeSettingGroup.name) return;
    app.component(UeElSizeSettingGroup.name, UeElSizeSettingGroup);
};

export interface UeElSizeSettingGroupBaseProps {
    disabled?: boolean;
}
export interface UeElSizeSettingGroupValue {
    mode?: "ratio" | "height" | "customRatio";
    width?: string;
    ratio?: string;
    height?: string;
}
export type UeElSizeSettingGroupInstance = InstanceType<typeof UeElSizeSettingGroup>;

export default UeElSizeSettingGroup;
