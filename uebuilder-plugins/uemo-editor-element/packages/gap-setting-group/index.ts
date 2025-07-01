/*
 * @Description: 间隔控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 02:53:16
 */
import type { App } from "vue";

import UeElGapSettingGroup from "./Main.vue";

UeElGapSettingGroup.install = (app: App) => {
    if (!UeElGapSettingGroup.name) return;
    app.component(UeElGapSettingGroup.name, UeElGapSettingGroup);
};

export interface UeElGapSettingGroupBaseProps {
    title?: string;
    defaultValue?: string;
    gapSettingProps?: UE_EL_COMPONENT.UeElGapSettingProps;
}
export type UeElGapSettingGroupInstance = InstanceType<typeof UeElGapSettingGroup>;

export default UeElGapSettingGroup;
