/*
 * @Description: 颜色选择器面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 15:40:26
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
    defaultValue?: string;
    disableOpacity?: boolean;
    defaultGradientColor?: string;
    defaultRadialGradientColor?: string;
}
export type UeElColorPickerPanelInstance = InstanceType<typeof UeElColorPickerPanel>;

export default UeElColorPickerPanel;
