/*
 * @Description: Tiptap 图片编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 10:34:49
 */
import type { App } from "vue";

import UeEditorPanelTiptapImage from "./Main.vue";

UeEditorPanelTiptapImage.install = (app: App) => {
    if (!UeEditorPanelTiptapImage.name) return;
    app.component(UeEditorPanelTiptapImage.name, UeEditorPanelTiptapImage);
};

export interface UeEditorPanelTiptapImageBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapImageInstance = InstanceType<typeof UeEditorPanelTiptapImage>;

export default UeEditorPanelTiptapImage;
