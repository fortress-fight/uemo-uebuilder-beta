/*
 * @Description: 选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 17:04:24
 */
import type { App } from "vue";

import UeElSelect from "./Main.vue";

UeElSelect.install = (app: App) => {
    if (!UeElSelect.name) return;
    app.component(UeElSelect.name, UeElSelect);
};

export type SelectValue = UE_EL_UTIL.SelectValue;

export type UeElSelectBaseProps = {
    disable?: boolean;

    defaultValue?: string;

    title?: string;
    label?: string;
    theme?: "showBorder" | "default";
    placeholder?: string;

    valueAlign?: "left" | "center" | "right";

    showIcon?: boolean;
    iconSize?: number;

    options: UE_EL_UTIL.SelectOption[];
    hideOptionIcon?: boolean;

    noOptionTip?: string;
};
export type UeElSelectInstance = InstanceType<typeof UeElSelect>;

export default UeElSelect;
