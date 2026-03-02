/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 15:28:43
 */
import type { App } from "vue";
import type { BubbleMenuPluginProps } from "@tiptap/extension-bubble-menu";

import UeTiptapBubbleMenu from "./Main.vue";

UeTiptapBubbleMenu.install = (app: App) => {
    if (!UeTiptapBubbleMenu.name) return;
    app.component(UeTiptapBubbleMenu.name, UeTiptapBubbleMenu);
};

export interface UeTiptapBubbleMenuBaseProps {
    /** 插件的唯一标识键 */
    pluginKey?: BubbleMenuPluginProps["pluginKey"];
    /** Tiptap 编辑器实例 */
    editor: BubbleMenuPluginProps["editor"];
    /** 菜单更新延迟时间（毫秒） */
    updateDelay?: BubbleMenuPluginProps["updateDelay"];
    /** 窗口调整大小后的延迟时间（毫秒） */
    resizeDelay?: BubbleMenuPluginProps["resizeDelay"];
    /** 额外的配置选项 */
    options?: BubbleMenuPluginProps["options"];
    /** 菜单要附加到的目标元素或函数 */
    appendTo?: BubbleMenuPluginProps["appendTo"];
    /** 控制菜单是否显示的回调函数 */
    shouldShow?: Exclude<Required<BubbleMenuPluginProps>["shouldShow"], null>;
    /** 获取虚拟元素引用的函数 */
    getReferencedVirtualElement?: Exclude<Required<BubbleMenuPluginProps>["getReferencedVirtualElement"], null>;
}
export type UeTiptapBubbleMenuInstance = InstanceType<typeof UeTiptapBubbleMenu>;

export default UeTiptapBubbleMenu;
