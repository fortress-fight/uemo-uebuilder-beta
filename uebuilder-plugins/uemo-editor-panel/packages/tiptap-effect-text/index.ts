/*
 * @Description: 特效文字的编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 13:07:22
 */
import type { App } from "vue";

import UeEditorPanelTiptapEffectText from "./Main.vue";

UeEditorPanelTiptapEffectText.install = (app: App) => {
    if (!UeEditorPanelTiptapEffectText.name) return;
    app.component(UeEditorPanelTiptapEffectText.name, UeEditorPanelTiptapEffectText);
};

export interface UeEditorPanelTiptapEffectTextBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapEffectTextInstance = InstanceType<typeof UeEditorPanelTiptapEffectText>;

export default UeEditorPanelTiptapEffectText;
