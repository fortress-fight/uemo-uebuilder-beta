/*
 * @Description: 按钮 hover
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 17:20:47
 */
import type { App } from "vue";

import UeElButtonHoverEffectLibraryPanel from "./Main.vue";

UeElButtonHoverEffectLibraryPanel.install = (app: App) => {
    if (!UeElButtonHoverEffectLibraryPanel.name) return;
    app.component(UeElButtonHoverEffectLibraryPanel.name, UeElButtonHoverEffectLibraryPanel);
};

export interface UeElButtonHoverEffectLibraryPanelBaseProps {
    disabled?: boolean;
}
export type UeElButtonHoverEffectLibraryPanelInstance = InstanceType<typeof UeElButtonHoverEffectLibraryPanel>;

export default UeElButtonHoverEffectLibraryPanel;
