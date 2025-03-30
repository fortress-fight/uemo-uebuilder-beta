/*
 * @Description: 颜色选择器面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-25 12:24:43
 */
import type { App } from "vue";

import UeElColorPickerPanel from "./Main.vue";

UeElColorPickerPanel.install = (app: App) => {
    if (!UeElColorPickerPanel.name) return;
    app.component(UeElColorPickerPanel.name, UeElColorPickerPanel);
};

export type GradientPoint = {
    color: string;
    position: string;
    id: string;
};

export interface UeElColorPickerPanelBaseProps {
    type?: UE_EL_UTIL.ColorType | "mixin";
    pureColor?: boolean | UE_EL_UTIL.ColorType[];
    defaultValue?: string;
    defaultGradientColor?: string;
    defaultRadialGradientColor?: string;
}
export type UeElColorPickerPanelInstance = InstanceType<typeof UeElColorPickerPanel>;

export default UeElColorPickerPanel;
