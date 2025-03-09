/*
 * @Description: 社交分享资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 15:16:11
 */
import type { App } from "vue";

import "@stone/uemo-share-icon-font/fonts/ue-share-base64.scss";
import UeElShareIconLibraryPanel from "./Main.vue";

UeElShareIconLibraryPanel.install = (app: App) => {
    if (!UeElShareIconLibraryPanel.name) return;
    app.component(UeElShareIconLibraryPanel.name, UeElShareIconLibraryPanel);
};

export interface UeElShareIconLibraryPanelBaseProps {
    disabled?: boolean;
}
export type UeElShareIconLibraryPanelInstance = InstanceType<typeof UeElShareIconLibraryPanel>;

export default UeElShareIconLibraryPanel;
