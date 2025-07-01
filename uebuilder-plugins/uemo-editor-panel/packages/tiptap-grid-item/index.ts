/*
 * @Description: 网格单元编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-29 03:19:51
 */
import type { App } from "vue";

import UeEditorPanelTiptapGridItem from "./Main.vue";

UeEditorPanelTiptapGridItem.install = (app: App) => {
    if (!UeEditorPanelTiptapGridItem.name) return;
    app.component(UeEditorPanelTiptapGridItem.name, UeEditorPanelTiptapGridItem);
};

export interface UeEditorPanelTiptapGridItemBaseProps {
    disable?: boolean;
}
export type UeEditorPanelTiptapGridItemInstance = InstanceType<typeof UeEditorPanelTiptapGridItem>;

export default UeEditorPanelTiptapGridItem;
