/*
 * @Description: 设置工具条
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 16:43:28
 */
import type { App } from "vue";

import UeElSettingBar from "./Main.vue";

UeElSettingBar.install = (app: App) => {
    if (!UeElSettingBar.name) return;
    app.component(UeElSettingBar.name, UeElSettingBar);
};

export interface UeElSettingBarBaseProps {
    label?: string;
    title?: string;
    disable?: boolean;
    theme?: "showBorder" | "default";
    infoText?: string;
    infoAlign?: "left" | "center" | "right";
    infoIcon?: UE_EL_UTIL.IconParam;
    placeholder?: string;
}
export type UeElSettingBarInstance = InstanceType<typeof UeElSettingBar>;

export default UeElSettingBar;
