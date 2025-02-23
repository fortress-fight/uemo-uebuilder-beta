/*
 * @Description: 选项面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 23:00:08
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
}
export type UeElSelectOptionInstance = InstanceType<typeof UeElSelectOption>;

export default UeElSelectOption;
