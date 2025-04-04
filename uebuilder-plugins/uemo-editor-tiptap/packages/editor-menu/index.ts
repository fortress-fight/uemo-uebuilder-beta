/*
 * @Description: 编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-04 04:06:53
 */
import type { App } from "vue";

import UeTiptapEditorMenu from "./Main.vue";

UeTiptapEditorMenu.install = (app: App) => {
    if (!UeTiptapEditorMenu.name) return;
    app.component(UeTiptapEditorMenu.name, UeTiptapEditorMenu);
};

export interface UeTiptapEditorMenuBaseProps {
    menuItems?: (UE_TIPTAP_UNIT.OperItem | "|")[];
}
export type UeTiptapEditorMenuInstance = InstanceType<typeof UeTiptapEditorMenu>;

export default UeTiptapEditorMenu;
