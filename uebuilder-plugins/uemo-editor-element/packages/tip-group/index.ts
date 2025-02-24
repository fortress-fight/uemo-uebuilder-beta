/*
 * @Description: 提示组
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 16:50:28
 */
import type { App } from "vue";

import UeElTipGroup from "./Main.vue";

UeElTipGroup.install = (app: App) => {
    if (!UeElTipGroup.name) return;
    app.component(UeElTipGroup.name, UeElTipGroup);
};

export interface UeElTipGroupBaseProps {
    tips: string[];
    type?: "normal" | "warn";
}
export type UeElTipGroupInstance = InstanceType<typeof UeElTipGroup>;

export default UeElTipGroup;
