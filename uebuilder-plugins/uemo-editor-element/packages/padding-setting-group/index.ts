/*
 * @Description: 内间距控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 16:07:56
 */
import type { App } from "vue";

import UeElPaddingSettingGroup from "./Main.vue";

UeElPaddingSettingGroup.install = (app: App) => {
    if (!UeElPaddingSettingGroup.name) return;
    app.component(UeElPaddingSettingGroup.name, UeElPaddingSettingGroup);
};

export interface UeElPaddingSettingGroupBaseProps {
    title?: string;
    defaultValue?: string;
    paddingSettingProps?: UE_EL_COMPONENT.UeElPaddingSettingProps;
}
export type UeElPaddingSettingGroupInstance = InstanceType<typeof UeElPaddingSettingGroup>;

export default UeElPaddingSettingGroup;
