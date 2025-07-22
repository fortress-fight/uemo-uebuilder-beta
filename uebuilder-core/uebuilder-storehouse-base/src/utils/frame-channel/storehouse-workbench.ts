/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 15:19:37
 */
import type { WORKBENCH_STOREHOUSE_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "../../../types/channel";
import type { UeBuilderStorehouseBase } from "../..";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export class StorehouseWorkbenchChannel extends MessageChannel<
    WORKBENCH_STOREHOUSE_CHANNEL.Api,
    STOREHOUSE_WORKBENCH_CHANNEL.Api
> {
    private static instance: StorehouseWorkbenchChannel | null = null;

    readonly localApi: STOREHOUSE_WORKBENCH_CHANNEL.Api = {
        launchStorehouse: (config) => {
            this.UeBuilderStorehouseBase.launchStorehouse(config);
        },
    };

    private constructor(
        remoteWindow: Window,
        public readonly UeBuilderStorehouseBase: UeBuilderStorehouseBase
    ) {
        super(remoteWindow, "workbenchStorehouseChannel", {
            from: "storehouse",
            to: "workbench",
            origin: "*",
        });
        this.connect();
    }

    public static getInstance(remoteWindow: Window, storehouse: UeBuilderStorehouseBase) {
        if (!StorehouseWorkbenchChannel.instance) {
            StorehouseWorkbenchChannel.instance = new StorehouseWorkbenchChannel(remoteWindow, storehouse);
        }
        return StorehouseWorkbenchChannel.instance;
    }

    destroy() {
        super.destroy();
        StorehouseWorkbenchChannel.instance = null;
    }
}
