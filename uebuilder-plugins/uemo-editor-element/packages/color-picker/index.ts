/*
 * @Description: 颜色选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 01:42:57
 */
import type { App } from "vue";

import UeElColorPicker from "./Main.vue";

UeElColorPicker.install = (app: App) => {
    if (!UeElColorPicker.name) return;
    app.component(UeElColorPicker.name, UeElColorPicker);
};

export interface UeElColorPickerBaseProps {
    disableOpacity?: boolean;
}
export type UeElColorPickerInstance = InstanceType<typeof UeElColorPicker>;

export default UeElColorPicker;
