/*
 * @Description: 按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:18:33
 */
import type { App } from "vue";

import UnitStartEntry from "./Main.vue";

UnitStartEntry.install = (app: App) => {
    if (!UnitStartEntry.name) return;
    app.component(UnitStartEntry.name, UnitStartEntry);
};

export interface UeElButtonBaseProps {
    disable?: boolean;
}
export type UnitStartEntryInstance = InstanceType<typeof UnitStartEntry>;

export default UnitStartEntry;
