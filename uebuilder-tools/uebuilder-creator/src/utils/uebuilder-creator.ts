import { UeBuilderCreatorBase } from "@stone/uebuilder-creator-base/src";

export class UeBuilderCreator extends UeBuilderCreatorBase {
    name = "uebuilder-creator--tools";

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(dom: HTMLElement, option: UE_BUILDER_CREATOR.InitParams) {
        super(dom, option);
    }
}

export function createUeBuilderCreator(dom: HTMLElement, option: UE_BUILDER_CREATOR.InitParams) {
    return new UeBuilderCreator(dom, option);
}
