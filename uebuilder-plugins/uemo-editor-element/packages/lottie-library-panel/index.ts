/*
 * @Description: Lottie 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-11 12:20:26
 */
import type { App } from "vue";

import UeElLottieLibraryPanel from "./Main.vue";

UeElLottieLibraryPanel.install = (app: App) => {
    if (!UeElLottieLibraryPanel.name) return;
    app.component(UeElLottieLibraryPanel.name, UeElLottieLibraryPanel);
};

export interface UeElLottieLibraryPanelBaseProps {
    type?: "iconPanel" | "normalPanel";
}
export type UeElLottieLibraryPanelInstance = InstanceType<typeof UeElLottieLibraryPanel>;

export default UeElLottieLibraryPanel;
