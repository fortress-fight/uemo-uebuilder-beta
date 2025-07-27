/*
 * @Description: Uemo 联系我们
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:37:10
 */
import type { App } from "vue";

import UnitUemoContactUs from "./Main.vue";

UnitUemoContactUs.install = (app: App) => {
    if (!UnitUemoContactUs.name) return;
    app.component(UnitUemoContactUs.name, UnitUemoContactUs);
};

export interface UnitUemoContactUsBaseProps {
    disabled?: boolean;
}
export type UnitUemoContactUsInstance = InstanceType<typeof UnitUemoContactUs>;

export default UnitUemoContactUs;
