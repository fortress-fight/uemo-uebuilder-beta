/*
 * @Description: 更多操作菜单辅助函数
 * @Author: F-Stone
 * @LastEditTime: 2025-06-05 15:10:12
 */

import type { UeElContextmenuItem } from "@stone/uemo-editor-element/packages/contextmenu";

export type TYPE_OPER_MENU_ITEM = Omit<UeElContextmenuItem, "enable" | "subList"> & {
    enable: (nodeAttrs?: Record<string, any>) => boolean;
    subList?: TYPE_OPER_MENU_ITEM[][];
};
