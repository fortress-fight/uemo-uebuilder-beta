/*
 * @Description: 网格结构工具
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 11:15:22
 */
import type { App } from "vue";

import UeElGirdLayoutUtil from "./Main.vue";

UeElGirdLayoutUtil.install = (app: App) => {
    if (!UeElGirdLayoutUtil.name) return;
    app.component(UeElGirdLayoutUtil.name, UeElGirdLayoutUtil);
};

export interface UeElGirdLayoutUtilBaseProps {
    data: string;
    icon?: string;
    type?: "replace" | "option" | "select" | "zIndexMode" | "delete";
    active?: boolean;
    selectList?: number[];
    gridItemZIndexInfo?: number[];
    disableGridItemIndex?: number[];
}
export type UeElGirdLayoutUtilInstance = InstanceType<typeof UeElGirdLayoutUtil>;

export default UeElGirdLayoutUtil;
