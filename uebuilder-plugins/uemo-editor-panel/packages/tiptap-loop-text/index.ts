/*
 * @Description: Tiptap循环文字编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-10 15:27:11
 */
import type { App } from "vue";

import UeEditorPanelTiptapLoopText from "./Main.vue";

UeEditorPanelTiptapLoopText.install = (app: App) => {
    if (!UeEditorPanelTiptapLoopText.name) return;
    app.component(UeEditorPanelTiptapLoopText.name, UeEditorPanelTiptapLoopText);
};

export interface UeEditorPanelTiptapLoopTextBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapLoopTextInstance = InstanceType<typeof UeEditorPanelTiptapLoopText>;

export default UeEditorPanelTiptapLoopText;
