/*
 * @Description: 入场效果控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 15:34:19
 */
import type { App } from "vue";

import UeElEnterAnimateSetting from "./Main.vue";

UeElEnterAnimateSetting.install = (app: App) => {
    if (!UeElEnterAnimateSetting.name) return;
    app.component(UeElEnterAnimateSetting.name, UeElEnterAnimateSetting);
};

export interface UeElEnterAnimateSettingBaseProps {
    disable?: boolean;
}
export type UeElEnterAnimateSettingInstance = InstanceType<typeof UeElEnterAnimateSetting>;

export default UeElEnterAnimateSetting;
