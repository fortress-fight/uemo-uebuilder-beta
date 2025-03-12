/*
 * @Description: 视频库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-12 14:17:41
 */
import type { App } from "vue";
import type { Video } from "@stone/uemo-editor-utils/lib/pexels";

import UeElVideoLibraryPanel from "./Main.vue";

UeElVideoLibraryPanel.install = (app: App) => {
    if (!UeElVideoLibraryPanel.name) return;
    app.component(UeElVideoLibraryPanel.name, UeElVideoLibraryPanel);
};

export type PEXELS_VIDEO = {
    link: string;
    thumb: string;
    userUrl: string;
    userName: string;
    width: number;
    height: number;
    files: Video["video_files"];
    links: string[];
};

export interface UeElVideoLibraryPanelBaseProps {
    disable?: boolean;
}
export type UeElVideoLibraryPanelInstance = InstanceType<typeof UeElVideoLibraryPanel>;

export default UeElVideoLibraryPanel;
