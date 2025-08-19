/*
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-08-18 17:00:54
 */
import type { App } from "vue";
import type { UserTemplateDetail } from "@stone/uebuilder-api--tools/api";

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
    getUserTemplate?: (id: string) => Promise<UserTemplateDetail>;
}
export type UnitUserStorehouseInstance = InstanceType<typeof UnitUserStorehouse>;

export default UnitUserStorehouse;
