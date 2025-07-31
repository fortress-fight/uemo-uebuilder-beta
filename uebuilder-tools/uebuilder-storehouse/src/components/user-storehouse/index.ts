/*
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-31 10:13:27
 */
import type { App } from "vue";

import UnitUserStorehouse from "./Main.vue";

UnitUserStorehouse.install = (app: App) => {
    if (!UnitUserStorehouse.name) return;
    app.component(UnitUserStorehouse.name, UnitUserStorehouse);
};

export interface UnitUserStorehouseBaseProps {
    type: "user-recent" | "user-default";
}
export type UnitUserStorehouseInstance = InstanceType<typeof UnitUserStorehouse>;

export default UnitUserStorehouse;
