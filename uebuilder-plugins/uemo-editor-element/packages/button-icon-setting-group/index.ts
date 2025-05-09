/*
 * @Description: 按钮图标属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 03:16:58
 */
import type { App } from "vue";
import type { UeElButtonIconSettingValue } from "../button-icon-setting";

import UeElButtonIconSettingGroup from "./Main.vue";

UeElButtonIconSettingGroup.install = (app: App) => {
    if (!UeElButtonIconSettingGroup.name) return;
    app.component(UeElButtonIconSettingGroup.name, UeElButtonIconSettingGroup);
};

export interface UeElButtonIconSettingGroupBaseProps {
    title?: string;
    disabled?: boolean;
    defaultValue?: UeElButtonIconSettingValue;
}
export type UeElButtonIconSettingGroupInstance = InstanceType<typeof UeElButtonIconSettingGroup>;

export default UeElButtonIconSettingGroup;
