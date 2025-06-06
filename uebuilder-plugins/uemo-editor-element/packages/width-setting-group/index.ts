/*
 * @Description: 宽度控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 15:46:05
 */
import type { App } from "vue";

import UeElWidthSettingGroup from "./Main.vue";

UeElWidthSettingGroup.install = (app: App) => {
    if (!UeElWidthSettingGroup.name) return;
    app.component(UeElWidthSettingGroup.name, UeElWidthSettingGroup);
};

export interface UeElWidthSettingGroupBaseProps {
    title?: string;
    defaultValue?: string;
    numberInputProps?: UE_EL_COMPONENT.UeElNumberInputProps;
}
export type UeElWidthSettingGroupInstance = InstanceType<typeof UeElWidthSettingGroup>;

export default UeElWidthSettingGroup;
