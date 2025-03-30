/*
 * @Description: Lottie 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 13:34:25
 */
import type { App } from "vue";

import UeElLottieLibraryPanel from "./Main.vue";

UeElLottieLibraryPanel.install = (app: App) => {
    if (!UeElLottieLibraryPanel.name) return;
    app.component(UeElLottieLibraryPanel.name, UeElLottieLibraryPanel);
};

export interface UeElLottieLibraryPanelBaseProps {
    type?: UE_EL_UTIL.LottieLibraryType;
}
export type UeElLottieLibraryPanelInstance = InstanceType<typeof UeElLottieLibraryPanel>;

export default UeElLottieLibraryPanel;
