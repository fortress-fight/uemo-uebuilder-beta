/*
 * @Description: 颜色输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 23:23:02
 */
import type { App } from "vue";
import type { Placement } from "@stone/uemo-editor-utils/lib/floating-ui";

import UeElColorInput from "./Main.vue";

UeElColorInput.install = (app: App) => {
    if (!UeElColorInput.name) return;
    app.component(UeElColorInput.name, UeElColorInput);
};

export interface UeElColorInputBaseProps {
    defaultValue?: string;
    disable?: boolean;
    hideOpacity?: boolean;
    placement?: Placement;
    type?: "mixin" | "color" | "linearGradient" | "radialGradient";
}
export type UeElColorInputInstance = InstanceType<typeof UeElColorInput>;

export default UeElColorInput;
