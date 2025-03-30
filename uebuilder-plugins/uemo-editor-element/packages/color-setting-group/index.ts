/*
 * @Description: 颜色控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-22 01:19:53
 */
import type { App } from "vue";

import UeElColorSettingGroup from "./Main.vue";

UeElColorSettingGroup.install = (app: App) => {
    if (!UeElColorSettingGroup.name) return;
    app.component(UeElColorSettingGroup.name, UeElColorSettingGroup);
};

export interface UeElColorSettingGroupBaseProps {
    title?: string;
    type?: UE_EL_UTIL.ColorType | "mixin";
    enableOper?: boolean;
    defaultValue?: string;
}
export type UeElColorSettingGroupInstance = InstanceType<typeof UeElColorSettingGroup>;

export default UeElColorSettingGroup;
