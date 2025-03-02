/*
 * @Description: 颜色输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 18:22:45
 */
import type { App } from "vue";

import UeElColorInput from "./Main.vue";

UeElColorInput.install = (app: App) => {
    if (!UeElColorInput.name) return;
    app.component(UeElColorInput.name, UeElColorInput);
};

export interface UeElColorInputBaseProps {
    type?: UE_EL_UTIL.ColorType | "mixin";
    disable?: boolean;
    disableOpacity?: boolean;
    defaultValue?: string;
}
export type UeElColorInputInstance = InstanceType<typeof UeElColorInput>;

export default UeElColorInput;
