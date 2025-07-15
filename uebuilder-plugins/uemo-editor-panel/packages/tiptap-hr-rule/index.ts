/*
 * @Description: 分割线控制面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 02:29:01
 */
import type { App } from "vue";

import UeEditorPanelTiptapHrRule from "./Main.vue";

UeEditorPanelTiptapHrRule.install = (app: App) => {
    if (!UeEditorPanelTiptapHrRule.name) return;
    app.component(UeEditorPanelTiptapHrRule.name, UeEditorPanelTiptapHrRule);
};

export interface UeEditorPanelTiptapHrRuleBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapHrRuleInstance = InstanceType<typeof UeEditorPanelTiptapHrRule>;

export default UeEditorPanelTiptapHrRule;
