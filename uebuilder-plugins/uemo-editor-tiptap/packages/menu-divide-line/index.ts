/*
 * @Description: 菜单分割线
 * @Author: F-Stone
 * @LastEditTime: 2025-04-03 00:01:31
 */
import type { App } from "vue";

import UeTiptapMenuDivideLine from "./Main.vue";

UeTiptapMenuDivideLine.install = (app: App) => {
    if (!UeTiptapMenuDivideLine.name) return;
    app.component(UeTiptapMenuDivideLine.name, UeTiptapMenuDivideLine);
};

export interface UeTiptapMenuDivideLineBaseProps {
    color?: string;
}
export type UeTiptapMenuDivideLineInstance = InstanceType<typeof UeTiptapMenuDivideLine>;

export default UeTiptapMenuDivideLine;
