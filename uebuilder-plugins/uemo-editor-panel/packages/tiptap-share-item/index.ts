/*
 * @Description: 社交分享项编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 03:10:46
 */
import type { App } from "vue";

import UeEditorPanelTiptapShareItem from "./Main.vue";

UeEditorPanelTiptapShareItem.install = (app: App) => {
    if (!UeEditorPanelTiptapShareItem.name) return;
    app.component(UeEditorPanelTiptapShareItem.name, UeEditorPanelTiptapShareItem);
};

export interface UeEditorPanelTiptapShareItemBaseProps {
    disable?: boolean;
}
export type UeEditorPanelTiptapShareItemInstance = InstanceType<typeof UeEditorPanelTiptapShareItem>;

export default UeEditorPanelTiptapShareItem;
