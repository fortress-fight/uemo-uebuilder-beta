/*
 * @Description: 确认面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-25 00:16:24
 */
import type { App } from "vue";

import UeElConfirmPanel from "./Main.vue";

UeElConfirmPanel.install = (app: App) => {
    if (!UeElConfirmPanel.name) return;
    app.component(UeElConfirmPanel.name, UeElConfirmPanel);
};

export type TYPE_BTN_THEME = "white" | "red";

export interface UeElConfirmPanelBaseProps {
    showCloseBtn?: boolean;
    title?: string;
    desc?: string;
    descHTML?: string;
    confirmBtn?: { text: string; theme: TYPE_BTN_THEME };
    cancelBtn?: { text: string; theme: TYPE_BTN_THEME };
    footerBtn?: { text: string; theme: TYPE_BTN_THEME };
}
export type UeElConfirmPanelInstance = InstanceType<typeof UeElConfirmPanel>;

export default UeElConfirmPanel;
