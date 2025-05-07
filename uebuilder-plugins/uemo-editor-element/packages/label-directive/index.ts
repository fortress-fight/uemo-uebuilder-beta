/*
 * @Description: tippy 插件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-21 18:00:08
 */
import type { App } from "vue";

import { plugin as VueTippy } from "@stone/uemo-editor-utils/lib/tippy";

import "./style.scss";

export function install(app: App) {
    const defaultProps: UE_EL_UTIL.LabelOption = {
        allowHTML: true,
        delay: [1000, null],
        theme: "ue-el-label",
        zIndex: 999999,
    };

    app.use(VueTippy, {
        offset: [0, 6],
        directive: "ue-el-label", // => v-ue-el-label
        component: "ue-el-label", // => <ue-el-label/>
        componentSingleton: "v-ue-el-label-singleton", // => <ue-tippy -singleton/>,
        defaultProps,
    });
}
