/*
 * @Description: UEBuilder 保存面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-16 17:20:54
 */
import type { App } from "vue";

import UnitSavePanel from "./Main.vue";

UnitSavePanel.install = (app: App) => {
    if (!UnitSavePanel.name) return;
    app.component(UnitSavePanel.name, UnitSavePanel);
};

export interface UnitSavePanelBaseProps {
    disabled?: boolean;
}
export type UnitSavePanelInstance = InstanceType<typeof UnitSavePanel>;

export default UnitSavePanel;
