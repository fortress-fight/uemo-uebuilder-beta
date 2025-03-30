/*
 * @Description: 投影控制器组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 02:51:58
 */
import type { App } from "vue";

import UeElBoxShadowSettingGroup from "./Main.vue";

UeElBoxShadowSettingGroup.install = (app: App) => {
    if (!UeElBoxShadowSettingGroup.name) return;
    app.component(UeElBoxShadowSettingGroup.name, UeElBoxShadowSettingGroup);
};

export interface UeElBoxShadowSettingGroupBaseProps {
    title?: string;
    value?: string;
    disable?: boolean;
    defaultValue?: string;
}
export type UeElBoxShadowSettingGroupInstance = InstanceType<typeof UeElBoxShadowSettingGroup>;

export default UeElBoxShadowSettingGroup;
