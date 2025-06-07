/*
 * @Description: Frame 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 13:51:35
 */
import type { App } from "vue";

import UeEditorPanelTiptapFrame from "./Main.vue";

UeEditorPanelTiptapFrame.install = (app: App) => {
    if (!UeEditorPanelTiptapFrame.name) return;
    app.component(UeEditorPanelTiptapFrame.name, UeEditorPanelTiptapFrame);
};

export interface UeEditorPanelTiptapFrameBaseProps {
    disable?: boolean;
}
export type UeEditorPanelTiptapFrameInstance = InstanceType<typeof UeEditorPanelTiptapFrame>;

export default UeEditorPanelTiptapFrame;
