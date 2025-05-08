/*
 * @Description: tiptap 按钮组编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:52:23
 */
import type { App } from "vue";

import UeEditorPanelTiptapButtonRow from "./Main.vue";

UeEditorPanelTiptapButtonRow.install = (app: App) => {
    if (!UeEditorPanelTiptapButtonRow.name) return;
    app.component(UeEditorPanelTiptapButtonRow.name, UeEditorPanelTiptapButtonRow);
};

export interface UeEditorPanelTiptapButtonRowBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapButtonRowInstance = InstanceType<typeof UeEditorPanelTiptapButtonRow>;

export default UeEditorPanelTiptapButtonRow;
