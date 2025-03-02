/*
 * @Description: 控制器组容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 01:46:00
 */
import type { App } from "vue";

import UeElSettingGroup from "./Main.vue";

UeElSettingGroup.install = (app: App) => {
    if (!UeElSettingGroup.name) return;
    app.component(UeElSettingGroup.name, UeElSettingGroup);
};

export type OperItem =
    | { id: string; type: "none" | "add" | "remove" }
    | { id: string; type: "addSelect"; param: UE_EL_COMPONENT.UeElSelectProps }
    | { id: string; type: "onOff"; param: UE_EL_COMPONENT.UeElOnOffProps; value: boolean };

export interface UeElSettingGroupBaseProps {
    title: string;
    oper?: OperItem[];
    disable?: boolean;
}
export type UeElSettingGroupInstance = InstanceType<typeof UeElSettingGroup>;

export default UeElSettingGroup;
