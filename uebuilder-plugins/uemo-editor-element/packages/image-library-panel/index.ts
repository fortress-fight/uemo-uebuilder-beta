/*
 * @Description: 图片资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-12 19:06:24
 */
import type { App } from "vue";

import UeElImageLibraryPanel from "./Main.vue";

UeElImageLibraryPanel.install = (app: App) => {
    if (!UeElImageLibraryPanel.name) return;
    app.component(UeElImageLibraryPanel.name, UeElImageLibraryPanel);
};

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
