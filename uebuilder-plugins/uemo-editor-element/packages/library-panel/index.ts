/*
 * @Description: 资源库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-07 03:47:39
 */
import type { App } from "vue";

import UeElLibraryPanel from "./Main.vue";

UeElLibraryPanel.install = (app: App) => {
    if (!UeElLibraryPanel.name) return;
    app.component(UeElLibraryPanel.name, UeElLibraryPanel);
};

export interface UeElLibraryPanelBaseProps {
    theme?: string;
    panelSize?: "small" | "normal" | "large";
    defaultCard?: string;
    minHeight?: string;
    maxHeight?: string;
    draggable?: boolean;
    cards: { title: string; icon?: string; iconSize?: number; name: string }[];
}
export type UeElLibraryPanelInstance = InstanceType<typeof UeElLibraryPanel>;

export default UeElLibraryPanel;
