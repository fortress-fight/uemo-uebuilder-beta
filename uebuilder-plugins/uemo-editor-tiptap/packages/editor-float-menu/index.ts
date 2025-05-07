/*
 * @Description: 浮动编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-05-06 11:46:30
 */
import type { App } from "vue";

import UeTiptapEditorFloatMenu from "./Main.vue";

UeTiptapEditorFloatMenu.install = (app: App) => {
    if (!UeTiptapEditorFloatMenu.name) return;
    app.component(UeTiptapEditorFloatMenu.name, UeTiptapEditorFloatMenu);
};

export interface UeTiptapEditorFloatMenuBaseProps {
    pluginKey: string;
    title: string;
    menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[];
    disableMenuItems?: (UE_TIPTAP_UNIT.OperItem | "|")[];
    shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"];
}
export type UeTiptapEditorFloatMenuInstance = InstanceType<typeof UeTiptapEditorFloatMenu>;

export default UeTiptapEditorFloatMenu;
