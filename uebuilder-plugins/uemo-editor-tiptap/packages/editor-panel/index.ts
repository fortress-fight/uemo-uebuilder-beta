/*
 * @Description: 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 16:55:47
 */
import type { App } from "vue";

import UeTiptapEditorPanel from "./Main.vue";

UeTiptapEditorPanel.install = (app: App) => {
    if (!UeTiptapEditorPanel.name) return;
    app.component(UeTiptapEditorPanel.name, UeTiptapEditorPanel);
};

export interface UeTiptapEditorPanelBaseProps {
    disable?: boolean;
}
export type UeTiptapEditorPanelInstance = InstanceType<typeof UeTiptapEditorPanel>;

export default UeTiptapEditorPanel;
