/*
 * @Description: 日历选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 17:40:22
 */
import type { App } from "vue";

import UeElCalenderPicker from "./Main.vue";

UeElCalenderPicker.install = (app: App) => {
    if (!UeElCalenderPicker.name) return;
    app.component(UeElCalenderPicker.name, UeElCalenderPicker);
};

export type DateUnit = { date: Date; num: number; isReady: boolean; active?: boolean; isToday?: boolean };

export type CalenderData = { year: string; month: string; years: DateUnit[]; months: DateUnit[]; days: DateUnit[] };

export type CalenderPanelType = "day" | "month" | "year";

export interface UeElCalenderPickerBaseProps {
    format?: string;
}
export type UeElCalenderPickerInstance = InstanceType<typeof UeElCalenderPicker>;

export default UeElCalenderPicker;
