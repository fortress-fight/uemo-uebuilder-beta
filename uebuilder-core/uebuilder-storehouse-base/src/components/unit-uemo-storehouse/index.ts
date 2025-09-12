/*
 * @Description: Uemo 库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:37:10
 */
import type { App } from "vue";

import UnitUemoStorehouse from "./Main.vue";

UnitUemoStorehouse.install = (app: App) => {
    if (!UnitUemoStorehouse.name) return;
    app.component(UnitUemoStorehouse.name, UnitUemoStorehouse);
};

export interface UnitUemoStorehouseBaseProps {
    disabled?: boolean;
}
export type UnitUemoStorehouseInstance = InstanceType<typeof UnitUemoStorehouse>;

export default UnitUemoStorehouse;
