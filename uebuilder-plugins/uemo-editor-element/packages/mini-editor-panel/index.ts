/*
 * @Description: Mini 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-27 02:28:15
 */
import type { App } from "vue";

import UeElMiniEditorPanel from "./Main.vue";

UeElMiniEditorPanel.install = (app: App) => {
    if (!UeElMiniEditorPanel.name) return;
    app.component(UeElMiniEditorPanel.name, UeElMiniEditorPanel);
};

export interface UeElMiniEditorPanelBaseProps {
    isOperationEnabled?: boolean;
    actionMode?: "confirm" | "confirmWithCancel";
}
export type UeElMiniEditorPanelInstance = InstanceType<typeof UeElMiniEditorPanel>;

export default UeElMiniEditorPanel;
