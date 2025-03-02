/*
 * @Description: 控件组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 19:07:47
 */
import type { App } from "vue";

import UeElControlGroup from "./Main.vue";

UeElControlGroup.install = (app: App) => {
    if (!UeElControlGroup.name) return;
    app.component(UeElControlGroup.name, UeElControlGroup);
};

export interface UeElControlGroupBaseProps {
    colCount?: number;
    disable?: boolean;
    hideOper?: boolean;
    operType?: "none" | "remove" | "onOff" | "button" | "select";
    onOffParam?: UE_EL_COMPONENT.UeElOnOffProps & { value: UE_EL_UTIL.OnOffValue };
    buttonParam?: Partial<UE_EL_COMPONENT.UeElButtonProps>;
    selectParam?: UE_EL_COMPONENT.UeElSelectProps;
}
export type UeElControlGroupInstance = InstanceType<typeof UeElControlGroup>;

export default UeElControlGroup;
