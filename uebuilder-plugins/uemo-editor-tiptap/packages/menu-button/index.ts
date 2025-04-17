/*
 * @Description: 菜单按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-04-16 11:21:56
 */
import type { App } from "vue";

import UeTiptapMenuButton from "./Main.vue";
import { operMap } from "../../utils/tiptap-oper-manage";

UeTiptapMenuButton.install = (app: App) => {
    if (!UeTiptapMenuButton.name) return;
    app.component(UeTiptapMenuButton.name, UeTiptapMenuButton);
};

export interface UeTiptapMenuButtonBaseProps {
    type?: keyof typeof operMap;
    active?: boolean;
    disable?: boolean;
    icon?: string;
    title?: string;
    tip?: string;
    text?: string;
}
export type UeTiptapMenuButtonInstance = InstanceType<typeof UeTiptapMenuButton>;

export default UeTiptapMenuButton;
