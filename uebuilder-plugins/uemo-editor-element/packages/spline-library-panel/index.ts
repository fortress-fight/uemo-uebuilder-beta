/*
 * @Description: spline资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-07 15:21:52
 */
import type { App } from "vue";

import UeElSplineLibraryPanel from "./Main.vue";

UeElSplineLibraryPanel.install = (app: App) => {
    if (!UeElSplineLibraryPanel.name) return;
    app.component(UeElSplineLibraryPanel.name, UeElSplineLibraryPanel);
};

export type SplineType = "bg" | "zujian";

export interface UeElSplineLibraryPanelBaseProps {
    type?: SplineType;
}
export type UeElSplineLibraryPanelInstance = InstanceType<typeof UeElSplineLibraryPanel>;

export default UeElSplineLibraryPanel;
