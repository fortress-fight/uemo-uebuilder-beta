/*
 * @Description: 纵向排版控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 02:25:34
 */
import type { App } from "vue";

import UeElAlignItemSetting from "./Main.vue";

UeElAlignItemSetting.install = (app: App) => {
    if (!UeElAlignItemSetting.name) return;
    app.component(UeElAlignItemSetting.name, UeElAlignItemSetting);
};

export interface UeElAlignItemSettingBaseProps {
    disable?: boolean;
    defaultValue?: string;
    enableOptions?: string[];
}
export type UeElAlignItemSettingInstance = InstanceType<typeof UeElAlignItemSetting>;

export default UeElAlignItemSetting;
