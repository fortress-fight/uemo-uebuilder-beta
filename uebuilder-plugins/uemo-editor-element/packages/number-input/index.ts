/*
 * @Description: 数字输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 03:04:54
 */
import type { App } from "vue";

import UeElNumberInput from "./Main.vue";

UeElNumberInput.install = (app: App) => {
    if (!UeElNumberInput.name) return;
    app.component(UeElNumberInput.name, UeElNumberInput);
};

export interface UeElNumberInputBaseProps {
    required?: boolean;
    title?: {
        text?: string;
        icon?: { name: string; size?: number };
    };
    step?: number;
    label?: string;
    default?: { num?: number; unit?: string };
    placeholder?: string;
    hideUnit?: boolean;
    disable?: boolean;
    paddingSize?: UE_EL_UTIL.InputPaddingSize;
    limit?: UE_EL_UTIL.NumInputLimit;
    units?: UE_EL_UTIL.NumInputUnit[];
    show?: {
        input: (value: { num?: number; unit?: string; limit?: number[] }) => string | undefined;
        output?: (value: string) => string | undefined;
    };
}
export type UeElNumberInputInstance = InstanceType<typeof UeElNumberInput>;

export default UeElNumberInput;
