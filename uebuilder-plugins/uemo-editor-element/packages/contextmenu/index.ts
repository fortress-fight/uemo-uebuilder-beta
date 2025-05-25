/*
 * @Description: 菜单组件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-25 10:46:27
 */
import type { App } from "vue";

import UeElContextmenu from "./Main.vue";

UeElContextmenu.install = (app: App) => {
    if (!UeElContextmenu.name) return;
    app.component(UeElContextmenu.name, UeElContextmenu);
};

export type UeElContextmenuItem = {
    type?: string;
    text: string;
    hotkey?: string;
    param?: { attrs?: string[]; excludeAttr?: string[] };
    enable: boolean;
    subList?: UeElContextmenuBaseProps["list"];
};

export interface UeElContextmenuBaseProps {
    list: UeElContextmenuItem[][];
    level?: number;
    parentId?: string;
    trigger: (data: UeElContextmenuItem) => void;
}
export type UeElContextmenuInstance = InstanceType<typeof UeElContextmenu>;

export default UeElContextmenu;
