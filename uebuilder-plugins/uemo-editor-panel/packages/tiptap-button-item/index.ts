/*
 * @Description: Tiptap 按钮编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 02:05:22
 */
import type { App } from "vue";

import UeEditorPanelTiptapButtonItem from "./Main.vue";

UeEditorPanelTiptapButtonItem.install = (app: App) => {
    if (!UeEditorPanelTiptapButtonItem.name) return;
    app.component(UeEditorPanelTiptapButtonItem.name, UeEditorPanelTiptapButtonItem);
};

export interface UeEditorPanelTiptapButtonItemBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapButtonItemInstance = InstanceType<typeof UeEditorPanelTiptapButtonItem>;

export default UeEditorPanelTiptapButtonItem;
