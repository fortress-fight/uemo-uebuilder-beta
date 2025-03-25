/*
 * @Description: 滚动效果属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-26 01:27:43
 */
import type { App } from "vue";
import type { UeElScrollEffectSettingPanelValue } from "../scroll-effect-setting-panel";

import UeElScrollEffectSettingGroup from "./Main.vue";

UeElScrollEffectSettingGroup.install = (app: App) => {
    if (!UeElScrollEffectSettingGroup.name) return;
    app.component(UeElScrollEffectSettingGroup.name, UeElScrollEffectSettingGroup);
};

export interface UeElScrollEffectSettingGroupBaseProps {
    defaultValue?: UeElScrollEffectSettingPanelValue;
    allowRemove?: boolean;
    enableType?: string[];
}
export type UeElScrollEffectSettingGroupInstance = InstanceType<typeof UeElScrollEffectSettingGroup>;

export default UeElScrollEffectSettingGroup;
