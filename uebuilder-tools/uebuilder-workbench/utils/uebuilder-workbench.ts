import { UeBuilderWorkbenchBase } from "@stone/uebuilder-workbench-base/src";

export class UeBuilderWorkbench extends UeBuilderWorkbenchBase {
    name = "uebuilder-workbench--tools";

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(dom: HTMLElement, option: UE_BUILDER_WORKBENCH.InitParams) {
        super(dom, option);
    }
}

export function createUeBuilderWorkbench(dom: HTMLElement, option: UE_BUILDER_WORKBENCH.InitParams) {
    return new UeBuilderWorkbench(dom, option);
}
