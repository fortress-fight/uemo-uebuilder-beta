/*
 * @Description: 按钮hover效果属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 02:21:29
 */
import type { App } from "vue";

import UeElButtonHoverEffectSetting from "./Main.vue";

UeElButtonHoverEffectSetting.install = (app: App) => {
    if (!UeElButtonHoverEffectSetting.name) return;
    app.component(UeElButtonHoverEffectSetting.name, UeElButtonHoverEffectSetting);
};

export interface UeElButtonHoverEffectSettingBaseProps {
    disabled?: boolean;
}
export type UeElButtonHoverEffectSettingInstance = InstanceType<typeof UeElButtonHoverEffectSetting>;

export default UeElButtonHoverEffectSetting;
