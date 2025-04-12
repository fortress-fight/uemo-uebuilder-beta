/*
 * @Description: 浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-11 18:23:05
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
    // 关闭面板时，是否显示提示信息，undefined 允许关闭，string 表示显示提示信息，并禁止关闭
    disableCloseTip?: string | undefined;
    shouldShow?: FloatingMenuPluginProps["shouldShow"];
}
export type UeTiptapFloatingMenuInstance = InstanceType<typeof UeTiptapFloatingMenu>;

export default UeTiptapFloatingMenu;
