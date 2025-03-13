/*
 * @Description: 提示组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-13 17:34:13
 */
import type { App } from "vue";

import UeElTipGroup from "./Main.vue";

UeElTipGroup.install = (app: App) => {
    if (!UeElTipGroup.name) return;
    app.component(UeElTipGroup.name, UeElTipGroup);
};

export interface UeElTipGroupBaseProps {
    title?: string;
    tips: string[];
    type?: "normal" | "warn";
}
export type UeElTipGroupInstance = InstanceType<typeof UeElTipGroup>;

export default UeElTipGroup;
