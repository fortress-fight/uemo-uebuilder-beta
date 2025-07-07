/*
 * @Description: Tiptap计数器编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-08 02:17:35
 */
import type { App } from "vue";

import UeEditorPanelTiptapCounterNumber from "./Main.vue";

UeEditorPanelTiptapCounterNumber.install = (app: App) => {
    if (!UeEditorPanelTiptapCounterNumber.name) return;
    app.component(UeEditorPanelTiptapCounterNumber.name, UeEditorPanelTiptapCounterNumber);
};

export interface UeEditorPanelTiptapCounterNumberBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapCounterNumberInstance = InstanceType<typeof UeEditorPanelTiptapCounterNumber>;

export default UeEditorPanelTiptapCounterNumber;
