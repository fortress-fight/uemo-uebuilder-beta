/*
 * @Description: 浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-09 10:58:44
 */
import type { App } from "vue";
import type { FloatingMenuPluginProps } from "../extension-floating-menu/src";
import type { Props } from "@stone/uemo-editor-utils/lib/tippy";

import UeTiptapFloatingMenu from "./Main.vue";

UeTiptapFloatingMenu.install = (app: App) => {
    if (!UeTiptapFloatingMenu.name) return;
    app.component(UeTiptapFloatingMenu.name, UeTiptapFloatingMenu);
};

export interface UeTiptapFloatingMenuBaseProps {
    type: "easeFloatingMenu" | "floatingMenu";
    pluginKey: FloatingMenuPluginProps["pluginKey"];
    tippyOptions?: Partial<Props>;
    shouldShow?: FloatingMenuPluginProps["shouldShow"];
}
export type UeTiptapFloatingMenuInstance = InstanceType<typeof UeTiptapFloatingMenu>;

export default UeTiptapFloatingMenu;
