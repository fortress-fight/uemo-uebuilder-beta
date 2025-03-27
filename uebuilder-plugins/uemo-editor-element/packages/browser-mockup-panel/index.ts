/*
 * @Description: 模拟浏览器窗口样式
 * @Author: F-Stone
 * @LastEditTime: 2025-03-27 11:38:07
 */
import type { App } from "vue";

import UeElBrowserMockupPanel from "./Main.vue";

UeElBrowserMockupPanel.install = (app: App) => {
    if (!UeElBrowserMockupPanel.name) return;
    app.component(UeElBrowserMockupPanel.name, UeElBrowserMockupPanel);
};

export interface UeElBrowserMockupPanelBaseProps {
    title: string;
}
export type UeElBrowserMockupPanelInstance = InstanceType<typeof UeElBrowserMockupPanel>;

export default UeElBrowserMockupPanel;
