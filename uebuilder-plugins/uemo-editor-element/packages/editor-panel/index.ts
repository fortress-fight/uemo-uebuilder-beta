/*
 * @Description: 通用编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-22 02:01:48
 */
import type { App } from "vue";

import UeElEditorPanel from "./Main.vue";

UeElEditorPanel.install = (app: App) => {
    if (!UeElEditorPanel.name) return;
    app.component(UeElEditorPanel.name, UeElEditorPanel);
};

export interface UeElEditorPanelBaseProps {
    title?: string;
    tag?: string;
    isOperationEnabled?: boolean;
    withClose?: boolean;
    withDragger?: boolean;
    maxHeight?: string;
    confirm?: { text: string };
    actionMode?: "confirm" | "confirmWithCancel";
}
export type UeElEditorPanelInstance = InstanceType<typeof UeElEditorPanel>;

export default UeElEditorPanel;
