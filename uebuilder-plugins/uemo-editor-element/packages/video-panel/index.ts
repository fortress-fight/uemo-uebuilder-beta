/*
 * @Description: 视频面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-25 01:51:37
 */
import type { App } from "vue";

import UeElVideoPanel from "./Main.vue";

UeElVideoPanel.install = (app: App) => {
    if (!UeElVideoPanel.name) return;
    app.component(UeElVideoPanel.name, UeElVideoPanel);
};

export interface UeElVideoPanelBaseProps {
    src: string;
    poster?: string;
    loop?: boolean;
    autoplay: boolean;
}
export type UeElVideoPanelInstance = InstanceType<typeof UeElVideoPanel>;

export default UeElVideoPanel;
