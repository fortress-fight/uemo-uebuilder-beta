/*
 * @Description: 选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 16:18:26
 */
import type { App } from "vue";

import UeElSelect from "./Main.vue";

UeElSelect.install = (app: App) => {
    if (!UeElSelect.name) return;
    app.component(UeElSelect.name, UeElSelect);
};

export type UeElSelectBaseProps = {
    options: UE_EL_UTIL.SelectOption[];
    theme?: "showBorder" | "default";
    defaultValue?: string;
    title?: string;
    iconSize?: number;
    disable?: boolean;
    hideIcon?: boolean;
    valueAlign?: "left" | "center" | "right";
    showValueIcon?: boolean;
    placeholder?: string;
    emptyText?: string;
};
export type UeElSelectInstance = InstanceType<typeof UeElSelect>;

export default UeElSelect;
