/*
 * @Description: 颜色选择器面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 01:41:15
 */
import type { App } from "vue";

import UeElColorPickerPanel from "./Main.vue";

UeElColorPickerPanel.install = (app: App) => {
    if (!UeElColorPickerPanel.name) return;
    app.component(UeElColorPickerPanel.name, UeElColorPickerPanel);
};

export interface UeElColorPickerPanelBaseProps {
    defaultValue?: string;
    disableOpacity?: boolean;
}
export type UeElColorPickerPanelInstance = InstanceType<typeof UeElColorPickerPanel>;

export default UeElColorPickerPanel;
