/*
 * @Description: 计数器预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-07 01:56:12
 */
import type { App } from "vue";

import UeElCounterNumberPreviewPanel from "./Main.vue";

UeElCounterNumberPreviewPanel.install = (app: App) => {
    if (!UeElCounterNumberPreviewPanel.name) return;
    app.component(UeElCounterNumberPreviewPanel.name, UeElCounterNumberPreviewPanel);
};

export interface UeElCounterNumberPreviewPanelBaseProps {
    disabled?: boolean;
}
export type UeElCounterNumberPreviewPanelInstance = InstanceType<typeof UeElCounterNumberPreviewPanel>;

export default UeElCounterNumberPreviewPanel;
