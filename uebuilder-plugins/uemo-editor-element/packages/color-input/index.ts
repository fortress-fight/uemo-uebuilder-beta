/*
 * @Description: 颜色输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-25 11:31:15
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
    pureColor?: boolean;
    defaultValue?: string;
    independentOpacityControl?: boolean;
}
export type UeElColorInputInstance = InstanceType<typeof UeElColorInput>;

export default UeElColorInput;
