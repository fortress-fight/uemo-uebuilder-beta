/*
 * @Description: 通用编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 00:45:31
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
    withOperate?: boolean;
    withClose?: boolean;
    withDragger?: boolean;
    maxHeight?: string;
    confirm?: { text: string };
    operateName?: "confirmWithCancel" | "confirm";
}
export type UeElEditorPanelInstance = InstanceType<typeof UeElEditorPanel>;

export default UeElEditorPanel;
