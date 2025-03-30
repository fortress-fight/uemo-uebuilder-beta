/*
 * @Description: SVG库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 02:43:18
 */
import type { App } from "vue";

import UeElSvgLibraryPanel from "./Main.vue";

UeElSvgLibraryPanel.install = (app: App) => {
    if (!UeElSvgLibraryPanel.name) return;
    app.component(UeElSvgLibraryPanel.name, UeElSvgLibraryPanel);
};

export interface UeElSvgLibraryPanelBaseProps {
    disabled?: boolean;
}
export type UeElSvgLibraryPanelInstance = InstanceType<typeof UeElSvgLibraryPanel>;

export default UeElSvgLibraryPanel;
