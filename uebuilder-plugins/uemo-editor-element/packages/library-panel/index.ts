/*
 * @Description: 资源库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 16:14:07
 */
import type { App } from "vue";

import UeElLibraryPanel from "./Main.vue";

export type UeElLibraryPanelCategory = { name: string; value: string; active?: boolean };

export type UeElLibraryPanelCard = {
    minHeight?: string;
    maxHeight?: string;
    search?: { placeholder?: string };
    category?: UeElLibraryPanelCategory[];
};

export type UeElLibraryPanelCardParam = {
    name: string;
    title: string;
    icon?: string;
    disabled?: boolean;
    iconSize?: number;
    category?: UeElLibraryPanelCategory[];
    search?: { placeholder?: string };
};

UeElLibraryPanel.install = (app: App) => {
    if (!UeElLibraryPanel.name) return;
    app.component(UeElLibraryPanel.name, UeElLibraryPanel);
};

export interface UeElLibraryPanelBaseProps {
    theme?: string;
    loading?: boolean;
    panelSize?: "small" | "normal" | "large";
    defaultCard?: string;
    minHeight?: string;
    maxHeight?: string;
    draggable?: boolean;
    cards: UeElLibraryPanelCardParam[];
}
export type UeElLibraryPanelInstance = InstanceType<typeof UeElLibraryPanel>;

export default UeElLibraryPanel;
