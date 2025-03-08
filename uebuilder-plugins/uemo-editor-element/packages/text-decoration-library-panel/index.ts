/*
 * @Description: 文字装饰资源面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 00:56:01
 */
import type { App } from "vue";

import UeElTextDecorationLibraryPanel from "./Main.vue";

UeElTextDecorationLibraryPanel.install = (app: App) => {
    if (!UeElTextDecorationLibraryPanel.name) return;
    app.component(UeElTextDecorationLibraryPanel.name, UeElTextDecorationLibraryPanel);
};

export interface UeElTextDecorationLibraryPanelBaseProps {
    disable?: boolean;
}
export type UeElTextDecorationLibraryPanelInstance = InstanceType<typeof UeElTextDecorationLibraryPanel>;

export default UeElTextDecorationLibraryPanel;
