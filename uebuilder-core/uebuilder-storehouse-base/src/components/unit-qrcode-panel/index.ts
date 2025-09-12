/*
 * @Description: 二维码面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:37:10
 */
import type { App } from "vue";

import UnitQrcodePanel from "./Main.vue";

UnitQrcodePanel.install = (app: App) => {
    if (!UnitQrcodePanel.name) return;
    app.component(UnitQrcodePanel.name, UnitQrcodePanel);
};

export interface UnitQrcodePanelBaseProps {
    disabled?: boolean;
}
export type UnitQrcodePanelInstance = InstanceType<typeof UnitQrcodePanel>;

export default UnitQrcodePanel;
