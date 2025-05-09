/*
 * @Description: 控制器组容器
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 13:34:07
 */
import type { App } from "vue";

import UeElSettingGroup from "./Main.vue";

UeElSettingGroup.install = (app: App) => {
    if (!UeElSettingGroup.name) return;
    app.component(UeElSettingGroup.name, UeElSettingGroup);
};

export const settingGroupPopPanelPropsKey = Symbol() as InjectionKey<
    ComputedRef<UE_EL_COMPONENT.UeElPopPanelProps | undefined> | undefined
>;

export type OperItem =
    | { id: string; type: "none" | "add" | "remove" }
    | { id: string; type: "addSelect"; param: UE_EL_COMPONENT.UeElSelectProps }
    | { id: string; type: "onOff"; param: UE_EL_COMPONENT.UeElOnOffProps; value: boolean };

export interface UeElSettingGroupBaseProps {
    oper?: OperItem[];
    title?: string;
    isLast?: boolean;
    isFirst?: boolean;
    isSub?: boolean;
    disable?: boolean;
}
export type UeElSettingGroupInstance = InstanceType<typeof UeElSettingGroup>;

export default UeElSettingGroup;
