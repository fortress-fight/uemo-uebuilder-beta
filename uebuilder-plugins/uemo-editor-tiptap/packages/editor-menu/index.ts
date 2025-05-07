/*
 * @Description: 编辑工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 10:02:39
 */
import type { App } from "vue";

import UeTiptapEditorMenu from "./Main.vue";

UeTiptapEditorMenu.install = (app: App) => {
    if (!UeTiptapEditorMenu.name) return;
    app.component(UeTiptapEditorMenu.name, UeTiptapEditorMenu);
};

export interface UeTiptapEditorMenuBaseProps {
    menuItems?: (UE_TIPTAP_UNIT.OperItem | "|")[];
    excludeMenuItems?: UE_TIPTAP_UNIT.OperItem[];
}
export type UeTiptapEditorMenuInstance = InstanceType<typeof UeTiptapEditorMenu>;

export default UeTiptapEditorMenu;
