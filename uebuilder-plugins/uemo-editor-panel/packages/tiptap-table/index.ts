/*
 * @Description: Tiptap表格编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 13:14:15
 */
import type { App } from "vue";

import UeEditorPanelTiptapTable from "./Main.vue";

UeEditorPanelTiptapTable.install = (app: App) => {
    if (!UeEditorPanelTiptapTable.name) return;
    app.component(UeEditorPanelTiptapTable.name, UeEditorPanelTiptapTable);
};

export interface UeEditorPanelTiptapTableBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapTableInstance = InstanceType<typeof UeEditorPanelTiptapTable>;

export default UeEditorPanelTiptapTable;
