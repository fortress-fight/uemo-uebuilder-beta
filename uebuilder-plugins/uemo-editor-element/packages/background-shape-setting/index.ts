/*
 * @Description: 背景图形控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 11:08:16
 */
import type { App } from "vue";

import UeElBackgroundShapeSetting from "./Main.vue";

UeElBackgroundShapeSetting.install = (app: App) => {
    if (!UeElBackgroundShapeSetting.name) return;
    app.component(UeElBackgroundShapeSetting.name, UeElBackgroundShapeSetting);
};

export interface UeElBackgroundShapeSettingValue {
    name: string;
    pos?: string;
    mirroring?: boolean;
    color?: string;
    opacity?: number;
    height?: string;
}

export interface UeElBackgroundShapeSettingBaseProps {
    disabled?: boolean;
}
export type UeElBackgroundShapeSettingInstance = InstanceType<typeof UeElBackgroundShapeSetting>;

export default UeElBackgroundShapeSetting;
