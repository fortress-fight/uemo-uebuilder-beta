/*
 * @Description: 标签输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-27 11:12:02
 */
import type { App } from "vue";

import UeElTagInput from "./Main.vue";

UeElTagInput.install = (app: App) => {
    if (!UeElTagInput.name) return;
    app.component(UeElTagInput.name, UeElTagInput);
};

export interface UeElTagInputBaseProps {
    placeholder?: string;
}
export type UeElTagInputInstance = InstanceType<typeof UeElTagInput>;

export default UeElTagInput;
