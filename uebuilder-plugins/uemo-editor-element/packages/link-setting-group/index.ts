/*
 * @Description: 链接属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 17:34:03
 */
import type { App } from "vue";

import UeElLinkSettingGroup from "./Main.vue";
import type { UeElLinkSettingPanelValue } from "../link-setting-panel";

UeElLinkSettingGroup.install = (app: App) => {
    if (!UeElLinkSettingGroup.name) return;
    app.component(UeElLinkSettingGroup.name, UeElLinkSettingGroup);
};

export interface UeElLinkSettingGroupBaseProps {
    disabled?: boolean;
    defaultValue?: UeElLinkSettingPanelValue;
}
export type UeElLinkSettingGroupInstance = InstanceType<typeof UeElLinkSettingGroup>;

export default UeElLinkSettingGroup;
