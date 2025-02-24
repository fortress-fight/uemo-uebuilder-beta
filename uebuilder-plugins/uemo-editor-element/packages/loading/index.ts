/*
 * @Description: 加载Loading
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 16:32:54
 */
import type { App } from "vue";

import UeElLoading from "./Main.vue";

UeElLoading.install = (app: App) => {
    if (!UeElLoading.name) return;
    app.component(UeElLoading.name, UeElLoading);
};

export type UeElLoadingBaseProps = {
    fake?: boolean;
    progress?: string;
    duration?: number;
    message?: string | false;
};
export type UeElLoadingInstance = InstanceType<typeof UeElLoading>;

export default UeElLoading;
