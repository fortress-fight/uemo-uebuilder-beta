/*
 * @Description: 图库库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 17:08:09
 */
import type { App } from "vue";

import UeElIconLibraryPanel from "./Main.vue";

UeElIconLibraryPanel.install = (app: App) => {
    if (!UeElIconLibraryPanel.name) return;
    app.component(UeElIconLibraryPanel.name, UeElIconLibraryPanel);
};

export interface UeElIconLibraryPanelBaseProps {
    disable?: boolean;
}
export type UeElIconLibraryPanelInstance = InstanceType<typeof UeElIconLibraryPanel>;

export default UeElIconLibraryPanel;
