/*
 * @Description: tippy 插件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-02 23:01:30
 */
import type { App } from "vue";

import { plugin as VueTippy } from "@stone/uemo-editor-utils/lib/tippy";

export function install(app: App) {
    const defaultProps: UE_EL_UTIL.LabelOption = {
        allowHTML: true,
        delay: [1000, null],
    };

    app.use(VueTippy, {
        offset: [0, 6],
        directive: "ue-el-label", // => v-ue-el-label
        component: "ue-el-label", // => <ue-el-label/>
        componentSingleton: "v-ue-el-label-singleton", // => <ue-tippy -singleton/>,
        defaultProps,
    });
}
