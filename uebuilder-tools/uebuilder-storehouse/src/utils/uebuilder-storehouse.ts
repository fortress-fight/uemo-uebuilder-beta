import { UeBuilderStorehouseBase } from "@stone/uebuilder-storehouse-base/src";

export class UeBuilderStorehouse extends UeBuilderStorehouseBase {
    name = "uebuilder-storehouse--tools";

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(dom: HTMLElement) {
        super(dom);
    }
}

export function createUeBuilderStorehouse(dom: HTMLElement) {
    return new UeBuilderStorehouse(dom);
}
