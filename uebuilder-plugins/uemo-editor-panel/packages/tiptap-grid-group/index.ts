/*
 * @Description: 网格组编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-28 17:39:14
 */
import type { App } from "vue";

import UeEditorPanelTiptapGridGroup from "./Main.vue";

UeEditorPanelTiptapGridGroup.install = (app: App) => {
    if (!UeEditorPanelTiptapGridGroup.name) return;
    app.component(UeEditorPanelTiptapGridGroup.name, UeEditorPanelTiptapGridGroup);
};

export interface UeEditorPanelTiptapGridGroupBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapGridGroupInstance = InstanceType<typeof UeEditorPanelTiptapGridGroup>;

export default UeEditorPanelTiptapGridGroup;
