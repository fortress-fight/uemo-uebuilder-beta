/*
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-09-12 15:50:30
 */
import type { App } from "vue";

import UnitUserStorehouse from "./Main.vue";

UnitUserStorehouse.install = (app: App) => {
    if (!UnitUserStorehouse.name) return;
    app.component(UnitUserStorehouse.name, UnitUserStorehouse);
};

export interface UnitUserStorehouseBaseProps {
    type: "user-recent" | "user-default" | "user-collect";
}
export type UnitUserStorehouseInstance = InstanceType<typeof UnitUserStorehouse>;

export type BookmarkItem = {
    title: string;
    thumb: string;
    lastEditTime: string;
    id: string;
    collectedId: string;
    type: "pages" | "units";
};

export type UserLibraryItem = {
    title: string;
    thumb: string;
    lastEditTime: string;
    id: string;
};

export default UnitUserStorehouse;
