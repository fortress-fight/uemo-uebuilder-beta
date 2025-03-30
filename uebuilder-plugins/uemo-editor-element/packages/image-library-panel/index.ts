/*
 * @Description: 图片资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-13 16:21:56
 */
import type { App } from "vue";
import type { UE_AI_PLUGIN } from "~/packages/ai-plugin";

import UeElImageLibraryPanel from "./Main.vue";

UeElImageLibraryPanel.install = (app: App) => {
    if (!UeElImageLibraryPanel.name) return;
    app.component(UeElImageLibraryPanel.name, UeElImageLibraryPanel);
};

export type UeAIPluginParams = UE_AI_PLUGIN;
export type UNSPLASH_IMAGE = {
    src: string;
    author: string;
    width: number;
    height: number;
    regularImgUrl: string;
    link: string;
    authorLink: string;
    downloadLocation: string;
    isActive?: boolean;
};

export interface UeElImageLibraryPanelBaseProps {
    disable?: boolean;
}
export type UeElImageLibraryPanelInstance = InstanceType<typeof UeElImageLibraryPanel>;

export default UeElImageLibraryPanel;
