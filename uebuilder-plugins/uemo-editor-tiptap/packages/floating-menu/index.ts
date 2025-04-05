/*
 * @Description: 浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-05 00:50:52
 */
import type { App } from "vue";
import type { FloatingMenuPluginProps } from "../extension-floating-menu/src";

import UeTiptapFloatingMenu from "./Main.vue";

UeTiptapFloatingMenu.install = (app: App) => {
    if (!UeTiptapFloatingMenu.name) return;
    app.component(UeTiptapFloatingMenu.name, UeTiptapFloatingMenu);
};

export interface UeTiptapFloatingMenuBaseProps {
    type: "easeFloatingMenu" | "floatingMenu";
    pluginKey?: FloatingMenuPluginProps["pluginKey"];
    tippyOptions?: FloatingMenuPluginProps["tippyOptions"];
    shouldShow?: FloatingMenuPluginProps["shouldShow"];
}
export type UeTiptapFloatingMenuInstance = InstanceType<typeof UeTiptapFloatingMenu>;

export default UeTiptapFloatingMenu;
