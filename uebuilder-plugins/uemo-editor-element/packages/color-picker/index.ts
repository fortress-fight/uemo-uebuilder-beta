/*
 * @Description: 颜色选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 22:33:39
 */
import type { App } from "vue";

import UeElColorPicker from "./Main.vue";

UeElColorPicker.install = (app: App) => {
    if (!UeElColorPicker.name) return;
    app.component(UeElColorPicker.name, UeElColorPicker);
};

// eslint-disable-next-line
export interface UeElColorPickerBaseProps {}
export type UeElColorPickerInstance = InstanceType<typeof UeElColorPicker>;

export default UeElColorPicker;
