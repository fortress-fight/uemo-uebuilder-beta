/*
 * @Description: Spline 操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-13 10:29:50
 */
import type { App } from "vue";

import UeEditorPanelTiptapSpline from "./Main.vue";

UeEditorPanelTiptapSpline.install = (app: App) => {
    if (!UeEditorPanelTiptapSpline.name) return;
    app.component(UeEditorPanelTiptapSpline.name, UeEditorPanelTiptapSpline);
};

export interface UeEditorPanelTiptapSplineBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapSplineInstance = InstanceType<typeof UeEditorPanelTiptapSpline>;

export default UeEditorPanelTiptapSpline;
