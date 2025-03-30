/*
 * @Description: 选项面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 19:15:41
 */
import type { App } from "vue";

import UeElSelectOption from "./Main.vue";

UeElSelectOption.install = (app: App) => {
    if (!UeElSelectOption.name) return;
    app.component(UeElSelectOption.name, UeElSelectOption);
};

export interface UeElSelectOptionBaseProps {
    value?: string | number;
    pinValue?: boolean;
    list: UE_EL_UTIL.SelectOption[];
    theme?: "light" | "dark";
    hideIcon?: boolean;
    iconSize?: number;
}
export type UeElSelectOptionInstance = InstanceType<typeof UeElSelectOption>;

export default UeElSelectOption;
