/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 15:26:56
 */
import type { WORKBENCH_STOREHOUSE_CHANNEL } from "../../../types/channel";
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "@stone/uebuilder-storehouse-base/types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";
import { createToast } from "@stone/uemo-editor-element/packages/toast-plugin";

type Param = {
    on: {
        storehouseReady: (channel: WorkbenchStorehouseChannel) => void;
    };
};

export class WorkbenchStorehouseChannel extends MessageChannel<
    STOREHOUSE_WORKBENCH_CHANNEL.Api,
    WORKBENCH_STOREHOUSE_CHANNEL.Api
> {
    static storehouseReadyCallback: () => void;
    private static utils = { toast: createToast() };
    private static instance: WorkbenchStorehouseChannel | null = null;

    readonly localApi: WORKBENCH_STOREHOUSE_CHANNEL.Api = {
        storehouseReady: () => {
            this.param.on.storehouseReady(this);
        },
        showMessage: (type, message) => {
            WorkbenchStorehouseChannel.utils.toast[type](message);
        },
    };

    private constructor(
        remoteWindow: Window,
        private readonly param: Param
    ) {
        super(remoteWindow, "workbenchStorehouseChannel", {
            from: "workbench",
            to: "storehouse",
            origin: "*",
        });
        this.connect();
    }

    public static getInstance(remoteWindow: Window, param: Param) {
        if (!WorkbenchStorehouseChannel.instance) {
            WorkbenchStorehouseChannel.instance = new WorkbenchStorehouseChannel(remoteWindow, param);
        }
        return WorkbenchStorehouseChannel.instance;
    }

    destroy() {
        super.destroy();
        WorkbenchStorehouseChannel.instance = null;
    }
}
