/*
 * @Description: UEBuilder 保存面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-17 14:45:41
 */
import type { App } from "vue";

import UnitSavePanel from "./Main.vue";

UnitSavePanel.install = (app: App) => {
    if (!UnitSavePanel.name) return;
    app.component(UnitSavePanel.name, UnitSavePanel);
};

export interface UnitSavePanelBaseProps {
    disableOper?: UE_BUILDER.SaveType[];
}
export type UnitSavePanelInstance = InstanceType<typeof UnitSavePanel>;

export default UnitSavePanel;
