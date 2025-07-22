import { UeBuilderStorehouseBase } from "@stone/uebuilder-storehouse-base/src";
import UebuilderToolsStorehouse from "@/components/Storehouse.vue";
import { getUeElementConfig } from "@stone/uebuilder-utils/src/get-ue-element-config";

export class UeBuilderStorehouse extends UeBuilderStorehouseBase {
    name = "uebuilder-storehouse--tools";

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(dom: HTMLElement) {
        super(dom);
    }

    launchStorehouse(config: UE_BUILDER_STOREHOUSE.Config): void {
        // eslint-disable-next-line no-console
        console.log("storehouse-config", config);
        this.renderStorehouse(createApp(UebuilderToolsStorehouse), {
            storehouseConfig: config,
            ueElConfig: getUeElementConfig(config.uploadConfig, config.resourceConfig),
        });
    }
}

export function createUeBuilderStorehouse(dom: HTMLElement) {
    return new UeBuilderStorehouse(dom);
}
