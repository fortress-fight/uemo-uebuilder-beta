/*
 * @Description: 文字设置组
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 17:47:05
 */
import type { App } from "vue";

import UeElTextSettingGroup from "./Main.vue";

UeElTextSettingGroup.install = (app: App) => {
    if (!UeElTextSettingGroup.name) return;
    app.component(UeElTextSettingGroup.name, UeElTextSettingGroup);
};

export interface UeElTextSettingGroupBaseProps {
    title?: string;
    disableOper?: boolean;
    defaultValue?: string;
}
export type UeElTextSettingGroupInstance = InstanceType<typeof UeElTextSettingGroup>;

export default UeElTextSettingGroup;
