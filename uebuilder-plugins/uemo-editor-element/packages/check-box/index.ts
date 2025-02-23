/*
 * @Description: 单选框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 23:55:58
 */
import type { App } from "vue";

import UeElCheckBox from "./Main.vue";

UeElCheckBox.install = (app: App) => {
    if (!UeElCheckBox.name) return;
    app.component(UeElCheckBox.name, UeElCheckBox);
};

export interface UeElCheckBoxBaseProps {
    text: string;
    label?: string;
    disable?: boolean;
}
export type UeElCheckBoxInstance = InstanceType<typeof UeElCheckBox>;

export default UeElCheckBox;
