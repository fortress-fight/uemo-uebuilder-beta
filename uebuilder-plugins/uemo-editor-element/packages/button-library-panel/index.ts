/*
 * @Description: 按钮库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 17:19:50
 */
import type { App } from "vue";

import UeElButtonLibraryPanel from "./Main.vue";

UeElButtonLibraryPanel.install = (app: App) => {
    if (!UeElButtonLibraryPanel.name) return;
    app.component(UeElButtonLibraryPanel.name, UeElButtonLibraryPanel);
};

export type UeElButtonIconProps = {
    pos: "before" | "after";
    name: string;
    source: string;
    color?: string;
    space?: string;
    size?: string;
};

export interface UeElButtonLibraryPanelBaseProps {
    disabled?: boolean;
}
export type UeElButtonLibraryPanelInstance = InstanceType<typeof UeElButtonLibraryPanel>;

export default UeElButtonLibraryPanel;
