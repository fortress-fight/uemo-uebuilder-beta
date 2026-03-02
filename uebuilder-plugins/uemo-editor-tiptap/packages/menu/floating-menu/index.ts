/*
 * @Description: 浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 15:58:32
 */
import type { App } from "vue";
import type { FloatingMenuPluginProps } from "../../extension-floating-menu/src";

import UeTiptapFloatingMenu from "./Main.vue";

UeTiptapFloatingMenu.install = (app: App) => {
    if (!UeTiptapFloatingMenu.name) return;
    app.component(UeTiptapFloatingMenu.name, UeTiptapFloatingMenu);
};

export interface UeTiptapFloatingMenuBaseProps {
    pluginKey?: FloatingMenuPluginProps["pluginKey"];
    editor: FloatingMenuPluginProps["editor"];
    updateDelay?: FloatingMenuPluginProps["updateDelay"];
    resizeDelay?: FloatingMenuPluginProps["resizeDelay"];
    options?: FloatingMenuPluginProps["options"];
    appendTo?: FloatingMenuPluginProps["appendTo"];
    shouldShow?: Exclude<Required<FloatingMenuPluginProps>["shouldShow"], null>;
}
export type UeTiptapFloatingMenuInstance = InstanceType<typeof UeTiptapFloatingMenu>;

export default UeTiptapFloatingMenu;
