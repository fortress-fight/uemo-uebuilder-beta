/*
 * @Description: 字号控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-16 12:19:36
 */
import type { App } from "vue";

import UeElFontSizeSetting from "./Main.vue";

UeElFontSizeSetting.install = (app: App) => {
    if (!UeElFontSizeSetting.name) return;
    app.component(UeElFontSizeSetting.name, UeElFontSizeSetting);
};

export interface UeElFontSizeSettingBaseProps {
    disabled?: boolean;
}
export type UeElFontSizeSettingInstance = InstanceType<typeof UeElFontSizeSetting>;

export default UeElFontSizeSetting;
