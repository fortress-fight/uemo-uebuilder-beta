/*
 * @Description: 滚动效果预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 13:39:06
 */
import type { App } from "vue";

import UeElScrollEffectPreviewPanel from "./Main.vue";

UeElScrollEffectPreviewPanel.install = (app: App) => {
    if (!UeElScrollEffectPreviewPanel.name) return;
    app.component(UeElScrollEffectPreviewPanel.name, UeElScrollEffectPreviewPanel);
};

export interface UeElScrollEffectPreviewPanelBaseProps {
    disabled?: boolean;
}
export type UeElScrollEffectPreviewPanelInstance = InstanceType<typeof UeElScrollEffectPreviewPanel>;

export default UeElScrollEffectPreviewPanel;
