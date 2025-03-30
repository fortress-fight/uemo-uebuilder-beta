/*
 * @Description: 网格结构库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 12:08:59
 */
import type { App } from "vue";

import UeElGridLayoutLibraryPanel from "./Main.vue";

UeElGridLayoutLibraryPanel.install = (app: App) => {
    if (!UeElGridLayoutLibraryPanel.name) return;
    app.component(UeElGridLayoutLibraryPanel.name, UeElGridLayoutLibraryPanel);
};

export interface UeElGridLayoutLibraryPanelBaseProps {
    type?: "desktop" | "mobile";
}
export type UeElGridLayoutLibraryPanelInstance = InstanceType<typeof UeElGridLayoutLibraryPanel>;

export default UeElGridLayoutLibraryPanel;
