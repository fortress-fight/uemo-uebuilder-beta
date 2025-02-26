/*
 * @Description: Align设置
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 03:42:42
 */
import type { App } from "vue";

import UeElAlignSetting from "./Main.vue";

UeElAlignSetting.install = (app: App) => {
    if (!UeElAlignSetting.name) return;
    app.component(UeElAlignSetting.name, UeElAlignSetting);
};

export type UeElAlignSettingOption = { icon: { name: string; size: number }; label: string };

export interface UeElAlignSettingBaseProps {
    type?: "x" | "y" | "xy";
    disable?: boolean;
    defaultValue?: UE_EL_UTIL.ALIGN;
}
export type UeElAlignSettingInstance = InstanceType<typeof UeElAlignSetting>;

export default UeElAlignSetting;
