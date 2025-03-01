/*
 * @Description: 颜色输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 01:46:56
 */
import type { App } from "vue";

import UeElColorInput from "./Main.vue";

UeElColorInput.install = (app: App) => {
    if (!UeElColorInput.name) return;
    app.component(UeElColorInput.name, UeElColorInput);
};

export interface UeElColorInputBaseProps {
    defaultValue?: string;
    disable?: boolean;
    disableOpacity?: boolean;
    type?: "mixin" | "color" | "linearGradient" | "radialGradient";
}
export type UeElColorInputInstance = InstanceType<typeof UeElColorInput>;

export default UeElColorInput;
