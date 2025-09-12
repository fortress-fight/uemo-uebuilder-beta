/*
 * @Description: Uemo 库
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:37:38
 */
import type { App } from "vue";

import UemoStorehouse from "./Main.vue";

UemoStorehouse.install = (app: App) => {
    if (!UemoStorehouse.name) return;
    app.component(UemoStorehouse.name, UemoStorehouse);
};

export interface UemoStorehouseBaseProps {
    disabled?: boolean;
}
export type UemoStorehouseInstance = InstanceType<typeof UemoStorehouse>;

export default UemoStorehouse;
