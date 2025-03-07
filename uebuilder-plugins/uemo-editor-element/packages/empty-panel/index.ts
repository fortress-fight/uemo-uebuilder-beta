/*
 * @Description: 空内容面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-07 12:24:51
 */
import type { App } from "vue";

import UeElEmptyPanel from "./Main.vue";

UeElEmptyPanel.install = (app: App) => {
    if (!UeElEmptyPanel.name) return;
    app.component(UeElEmptyPanel.name, UeElEmptyPanel);
};

export interface UeElEmptyPanelBaseProps {
    description?: string;
}
export type UeElEmptyPanelInstance = InstanceType<typeof UeElEmptyPanel>;

export default UeElEmptyPanel;
