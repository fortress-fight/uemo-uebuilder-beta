import { pinia, useUeBuilderStorehouseToolsStore } from "@/store";

import { UeBuilderStorehouseBase } from "@stone/uebuilder-storehouse-base/src";
import UebuilderStorehouse from "@stone/uebuilder-storehouse-base/src/App.vue";
import { getUeElementConfig } from "@stone/uebuilder-utils/src/get-ue-element-config";
import { UeBuilderStorehouseKey } from "@/plugin/injection-key";
import router from "@/router";

import { StorehouseWorkbenchChannelTools } from "./frame-channel/storehouse-workbench";

const ueBuilderStorehouseToolsStore = useUeBuilderStorehouseToolsStore(pinia);

export class UeBuilderStorehouse extends UeBuilderStorehouseBase {
    name = "uebuilder-storehouse--tools";

    StorehouseWorkbenchChannelCreator = StorehouseWorkbenchChannelTools;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(dom: HTMLElement) {
        super(dom);
    }

    async launchStorehouse(config: UE_BUILDER_STOREHOUSE.Config): Promise<void> {
        const remote = await this.storehouseWorkbenchChannel?.remote;
        const loginStatus = await remote?.getLoginStatus();

        ueBuilderStorehouseToolsStore.setLoginStatus(!!loginStatus);

        const storehouseApp = createApp(UebuilderStorehouse);
        storehouseApp.provide(UeBuilderStorehouseKey, this);
        storehouseApp.use(router);
        this.renderStorehouse(storehouseApp, {
            storehouseConfig: config,
            ueElConfig: getUeElementConfig(config.uploadConfig, config.resourceConfig),
        });
    }
}

export function createUeBuilderStorehouse(dom: HTMLElement) {
    return new UeBuilderStorehouse(dom);
}
