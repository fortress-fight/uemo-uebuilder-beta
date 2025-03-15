/*
 * @Description: 字体库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 00:34:15
 */
import type { App } from "vue";

import UeElFontFamilyLibraryPanel from "./Main.vue";

UeElFontFamilyLibraryPanel.install = (app: App) => {
    if (!UeElFontFamilyLibraryPanel.name) return;
    app.component(UeElFontFamilyLibraryPanel.name, UeElFontFamilyLibraryPanel);
};

export interface UeElFontFamilyLibraryPanelBaseProps {
    disabled?: boolean;
}
export type UeElFontFamilyLibraryPanelInstance = InstanceType<typeof UeElFontFamilyLibraryPanel>;

export default UeElFontFamilyLibraryPanel;
