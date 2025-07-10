/*
 * @Description: 循环文字预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:23:55
 */
import type { App } from "vue";

import UeElLoopTextPreviewPanel from "./Main.vue";

UeElLoopTextPreviewPanel.install = (app: App) => {
    if (!UeElLoopTextPreviewPanel.name) return;
    app.component(UeElLoopTextPreviewPanel.name, UeElLoopTextPreviewPanel);
};

export interface UeElLoopTextPreviewPanelBaseProps {
    disabled?: boolean;
}
export type UeElLoopTextPreviewPanelInstance = InstanceType<typeof UeElLoopTextPreviewPanel>;

export default UeElLoopTextPreviewPanel;
