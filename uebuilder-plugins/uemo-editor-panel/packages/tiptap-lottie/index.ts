/*
 * @Description: Tiptap Lottie 操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-14 15:05:05
 */
import type { App } from "vue";

import UeEditorPanelTiptapLottie from "./Main.vue";

UeEditorPanelTiptapLottie.install = (app: App) => {
    if (!UeEditorPanelTiptapLottie.name) return;
    app.component(UeEditorPanelTiptapLottie.name, UeEditorPanelTiptapLottie);
};

export interface UeEditorPanelTiptapLottieBaseProps {
    disable?: boolean;
}
export type UeEditorPanelTiptapLottieInstance = InstanceType<typeof UeEditorPanelTiptapLottie>;

export default UeEditorPanelTiptapLottie;
