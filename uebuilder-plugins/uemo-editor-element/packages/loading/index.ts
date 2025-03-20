/*
 * @Description: 加载Loading
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 04:19:42
 */
import type { App } from "vue";

import UeElLoading from "./Main.vue";

UeElLoading.install = (app: App) => {
    if (!UeElLoading.name) return;
    app.component(UeElLoading.name, UeElLoading);
};

export type UeElLoadingBaseProps = {
    type?: "bar" | "circle";
    bg?: string;
    color?: string;
    bar?: {
        fake?: boolean;
        progress?: string;
        duration?: number;
        message?: string | false;
    };
    circle?: { size: string };
};
export type UeElLoadingInstance = InstanceType<typeof UeElLoading>;

export default UeElLoading;
