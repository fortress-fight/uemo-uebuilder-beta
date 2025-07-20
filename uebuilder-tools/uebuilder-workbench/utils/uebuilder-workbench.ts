import { UeBuilderWorkbenchBase } from "@stone/uebuilder-workbench-base/src";
import { i18n } from "../src/i18n";

export class UeBuilderWorkbench extends UeBuilderWorkbenchBase {
    name = "uebuilder-workbench--tools";

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(dom: HTMLElement, option: UE_BUILDER_WORKBENCH.InitParams) {
        super(dom, option);
    }

    launchWorkbench(config: UE_BUILDER_WORKBENCH.Config): void {
        this.renderWorkbench(config).catch(() => {
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
