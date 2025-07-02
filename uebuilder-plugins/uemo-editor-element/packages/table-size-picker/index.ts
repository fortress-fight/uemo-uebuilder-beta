/*
 * @Description: Table尺寸选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 01:40:48
 */
import type { App } from "vue";

import UeElTableSizePicker from "./Main.vue";

UeElTableSizePicker.install = (app: App) => {
    if (!UeElTableSizePicker.name) return;
    app.component(UeElTableSizePicker.name, UeElTableSizePicker);
};

export interface UeElTableSizePickerBaseProps {
    selection?: [number, number];
    minSize?: [number, number];
}
export type UeElTableSizePickerInstance = InstanceType<typeof UeElTableSizePicker>;

export default UeElTableSizePicker;
