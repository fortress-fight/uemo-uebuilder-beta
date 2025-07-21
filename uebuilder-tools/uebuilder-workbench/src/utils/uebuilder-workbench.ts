import { UeBuilderWorkbenchBase } from "@stone/uebuilder-workbench-base/src";

import { createApp } from "vue";
import { i18n } from "../i18n";

import App from "../pages/index/App.vue";
import { UE_EL_CONFIG } from "../config/ue-element-config";

export class UeBuilderWorkbench extends UeBuilderWorkbenchBase {
    name = "uebuilder-workbench--tools";

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(dom: HTMLElement, option: UE_BUILDER_WORKBENCH.InitParams) {
        super(dom, option);
    }

    launchWorkbench(config: UE_BUILDER_WORKBENCH.Config): void {
        this.renderWorkbench(createApp(App), { workbenchConfig: config, ueElConfig: UE_EL_CONFIG }).catch(() => {
            const error = new UeBuilderWorkbench.utils.UeError("WARNING:UEBUILDER_WORKBENCH", {
                message: i18n.global.t("lunchWorkbenchFailed"),
            });
            this.handleError(error);
        });
    }
}

export function createUeBuilderWorkbench(dom: HTMLElement, option: UE_BUILDER_WORKBENCH.InitParams) {
    return new UeBuilderWorkbench(dom, option);
}
