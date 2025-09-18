/*
 * @Description: UEBuilder 保存面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-18 11:45:38
 */
import type { App } from "vue";
import type { UserTemplateValue } from "../unit-user-template-panel";

import UnitSavePanel from "./Main.vue";

UnitSavePanel.install = (app: App) => {
    if (!UnitSavePanel.name) return;
    app.component(UnitSavePanel.name, UnitSavePanel);
};

export interface UnitSavePanelBaseProps {
    disableOper?: UE_BUILDER.SaveType[];
    save: (type: "saveOnline", data: Partial<UserTemplateValue> & { id?: string }) => Promise<void>;
}
export type UnitSavePanelInstance = InstanceType<typeof UnitSavePanel>;

export default UnitSavePanel;
