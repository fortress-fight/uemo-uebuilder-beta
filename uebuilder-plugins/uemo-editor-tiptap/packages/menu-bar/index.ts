/*
 * @Description: 菜单栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-03 00:14:50
 */
import type { App } from "vue";

import UeTiptapMenuBar from "./Main.vue";

UeTiptapMenuBar.install = (app: App) => {
    if (!UeTiptapMenuBar.name) return;
    app.component(UeTiptapMenuBar.name, UeTiptapMenuBar);
};

export interface UeTiptapMenuBarBaseProps {
    title?: string;
}
export type UeTiptapMenuBarInstance = InstanceType<typeof UeTiptapMenuBar>;

export default UeTiptapMenuBar;
