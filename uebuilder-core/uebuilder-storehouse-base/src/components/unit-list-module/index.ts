/*
 * @Description: 列表模块
 * @Author: F-Stone
 * @LastEditTime: 2025-07-30 01:29:38
 */
import type { App } from "vue";

import UnitListModule from "./Main.vue";

UnitListModule.install = (app: App) => {
    if (!UnitListModule.name) return;
    app.component(UnitListModule.name, UnitListModule);
};

export interface UnitListModuleBaseProps {
    type?: "default" | "newest" | "recent";
    title: string;
    placeholder: { title: string; desc: string };
    operList?: { label: string; type: string; arrow?: boolean }[];

    loading?: boolean;
    list?: { title: string; thumb: string }[];
    sortCondition?: {
        value: string;
        list: { label: string; type: string }[];
    };
}
export type UnitListModuleInstance = InstanceType<typeof UnitListModule>;

export default UnitListModule;
