/*
 * @Description: 富文本资源库
 * @Author: F-Stone
 * @LastEditTime: 2025-04-29 19:46:35
 */
import type { App } from "vue";

import UeElRichTextLibraryPanel from "./Main.vue";

UeElRichTextLibraryPanel.install = (app: App) => {
    if (!UeElRichTextLibraryPanel.name) return;
    app.component(UeElRichTextLibraryPanel.name, UeElRichTextLibraryPanel);
};

export interface UeElRichTextLibraryPanelBaseProps {
    disable?: boolean;
}
export type UeElRichTextLibraryPanelInstance = InstanceType<typeof UeElRichTextLibraryPanel>;

export default UeElRichTextLibraryPanel;
