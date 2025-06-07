/*
 * @Description: 尺寸调节组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 18:19:40
 */
import type { App } from "vue";

import UeElSizeSettingGroup from "./Main.vue";

UeElSizeSettingGroup.install = (app: App) => {
    if (!UeElSizeSettingGroup.name) return;
    app.component(UeElSizeSettingGroup.name, UeElSizeSettingGroup);
};

export interface UeElSizeSettingGroupBaseProps {
    disabled?: boolean;
    widthInputProps?: UE_EL_COMPONENT.UeElNumberInputProps;
}
export interface UeElSizeSettingGroupValue {
    mode?: "ratio" | "height" | "customRatio" | "auto";
    width?: string;
    ratio?: string;
    height?: string;
}
export type UeElSizeSettingGroupInstance = InstanceType<typeof UeElSizeSettingGroup>;

export default UeElSizeSettingGroup;
