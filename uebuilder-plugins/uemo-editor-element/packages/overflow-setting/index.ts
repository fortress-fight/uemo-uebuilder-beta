/*
 * @Description: 裁切设置
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 02:59:59
 */
import type { App } from "vue";

import UeElOverflowSetting from "./Main.vue";

UeElOverflowSetting.install = (app: App) => {
    if (!UeElOverflowSetting.name) return;
    app.component(UeElOverflowSetting.name, UeElOverflowSetting);
};

export interface UeElOverflowSettingBaseProps {
    disable?: boolean;
}
export type UeElOverflowSettingInstance = InstanceType<typeof UeElOverflowSetting>;

export default UeElOverflowSetting;
