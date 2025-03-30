/*
 * @Description: 图形资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-07 12:29:34
 */
import type { App } from "vue";

import UeElShapeLibraryPanel from "./Main.vue";

UeElShapeLibraryPanel.install = (app: App) => {
    if (!UeElShapeLibraryPanel.name) return;
    app.component(UeElShapeLibraryPanel.name, UeElShapeLibraryPanel);
};

export interface UeElShapeLibraryPanelBaseProps {
    disable?: boolean;
}
export type UeElShapeLibraryPanelInstance = InstanceType<typeof UeElShapeLibraryPanel>;

export default UeElShapeLibraryPanel;
