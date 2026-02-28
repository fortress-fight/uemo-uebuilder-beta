/*
 * @Description: tippy 插件
 * @Author: F-Stone
 * @LastEditTime: 2025-09-16 18:59:01
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
        component: "UeElLabel", // => <ue-el-label/>
        componentSingleton: "UeElLabelSingleton", // => <ue-tippy -singleton/>,
        defaultProps,
    });
}
