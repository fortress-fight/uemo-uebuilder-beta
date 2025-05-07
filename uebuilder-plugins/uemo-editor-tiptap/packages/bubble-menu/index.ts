/*
 * @Description: 气泡工具栏控件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 11:20:56
 */
import type { App } from "vue";
import type { BubbleMenuPluginProps } from "../extension-bubble-menu/src/bubble-menu-plugin";

import UeTiptapBubbleMenu from "./Main.vue";

UeTiptapBubbleMenu.install = (app: App) => {
    if (!UeTiptapBubbleMenu.name) return;
    app.component(UeTiptapBubbleMenu.name, UeTiptapBubbleMenu);
};

export interface UeTiptapBubbleMenuBaseProps {
    shouldShow?: BubbleMenuPluginProps["shouldShow"];
    pluginKey: string | BubbleMenuPluginProps["pluginKey"];
    isNodeMenu?: boolean;
}
export type UeTiptapBubbleMenuInstance = InstanceType<typeof UeTiptapBubbleMenu>;

export default UeTiptapBubbleMenu;
