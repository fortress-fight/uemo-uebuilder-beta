/*
 * @Description: SvgView 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-12 00:46:37
 */
import type { App } from "vue";

import UeEditorPanelTiptapSvgView from "./Main.vue";

UeEditorPanelTiptapSvgView.install = (app: App) => {
    if (!UeEditorPanelTiptapSvgView.name) return;
    app.component(UeEditorPanelTiptapSvgView.name, UeEditorPanelTiptapSvgView);
};

export interface UeEditorPanelTiptapSvgViewBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapSvgViewInstance = InstanceType<typeof UeEditorPanelTiptapSvgView>;

export default UeEditorPanelTiptapSvgView;
