/*
 * @Description: 偏移属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 03:18:49
 */
import type { App } from "vue";

import UeElTranslateSetting from "./Main.vue";

UeElTranslateSetting.install = (app: App) => {
    if (!UeElTranslateSetting.name) return;
    app.component(UeElTranslateSetting.name, UeElTranslateSetting);
};

export interface UeElTranslateSettingBaseProps {
    disable?: boolean;
}
export type UeElTranslateSettingInstance = InstanceType<typeof UeElTranslateSetting>;

export default UeElTranslateSetting;
