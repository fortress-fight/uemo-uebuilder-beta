/*
 * @Description: 颜色控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 18:37:22
 */
import type { App } from "vue";
import type { Placement } from "@stone/uemo-editor-utils/lib/floating-ui";

import UeElColorSetting from "./Main.vue";

UeElColorSetting.install = (app: App) => {
    if (!UeElColorSetting.name) return;
    app.component(UeElColorSetting.name, UeElColorSetting);
};

export interface UeElColorSettingBaseProps {
    type?: UE_EL_UTIL.ColorType | "mixin";
    placement?: Placement;
    disable?: boolean;
    disableOpacity?: boolean;
    defaultValue?: string;
}
export type UeElColorSettingInstance = InstanceType<typeof UeElColorSetting>;

export default UeElColorSetting;
