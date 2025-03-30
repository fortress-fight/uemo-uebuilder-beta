/*
 * @Description: 字体属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 11:29:05
 */
import type { App } from "vue";

import UeElFontFamilySetting from "./Main.vue";

UeElFontFamilySetting.install = (app: App) => {
    if (!UeElFontFamilySetting.name) return;
    app.component(UeElFontFamilySetting.name, UeElFontFamilySetting);
};

export interface UeElFontFamilySettingBaseProps {
    disable?: boolean;
}
export type UeElFontFamilySettingInstance = InstanceType<typeof UeElFontFamilySetting>;

export default UeElFontFamilySetting;
