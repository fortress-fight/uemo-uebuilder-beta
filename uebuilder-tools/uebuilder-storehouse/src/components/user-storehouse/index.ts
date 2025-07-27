/*
 * @Description: 用户私有库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:08:39
 */
import type { App } from "vue";

import UnitUserStorehouse from "./Main.vue";

UnitUserStorehouse.install = (app: App) => {
    if (!UnitUserStorehouse.name) return;
    app.component(UnitUserStorehouse.name, UnitUserStorehouse);
};

export interface UnitUserStorehouseBaseProps {
    disabled?: boolean;
}
export type UnitUserStorehouseInstance = InstanceType<typeof UnitUserStorehouse>;

export default UnitUserStorehouse;
