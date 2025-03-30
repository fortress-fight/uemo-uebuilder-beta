/*
 * @Description: 开关
 * @Author: F-Stone
 * @LastEditTime: 2025-02-25 02:30:50
 */
import type { App } from "vue";

import UeElOnOff from "./Main.vue";

UeElOnOff.install = (app: App) => {
    if (!UeElOnOff.name) return;
    app.component(UeElOnOff.name, UeElOnOff);
};

export type OnOffValue = UE_EL_UTIL.OnOffValue;
export type OnOffIcon = string | { name: string; size: number };

export interface UeElOnOffBaseProps {
    icon: OnOffIcon;
    activeIcon?: OnOffIcon;
    disable?: boolean;
    label?: string;
    activeValue?: OnOffValue;
    inactiveValue?: OnOffValue;
    reverseStyle?: boolean;
}
export type UeElOnOffInstance = InstanceType<typeof UeElOnOff>;

export default UeElOnOff;
