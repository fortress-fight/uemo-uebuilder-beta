/*
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-09-21 00:30:54
 */
import type { App } from "vue";

import UnitUserStorehouse from "./Main.vue";

UnitUserStorehouse.install = (app: App) => {
    if (!UnitUserStorehouse.name) return;
    app.component(UnitUserStorehouse.name, UnitUserStorehouse);
};

export interface UnitUserStorehouseBaseProps {
    type?: "user-recent" | "user-default" | "user-collect";
    pages?: { current: number; total: number; itemTotal?: number };
    list?: { title: string; thumb: string; lastEditTime?: string; id: string }[];
    sortType?: string;
    loading?: boolean;
    getUserTemplate?: (id: string) => Promise<{ json: string; thumb: string; title: string }>;
}
export type UnitUserStorehouseInstance = InstanceType<typeof UnitUserStorehouse>;

export default UnitUserStorehouse;
