/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 03:08:05
 */
import type { WORKBENCH_STOREHOUSE_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "../../../types/channel";
import type { UeBuilderStorehouseBase } from "../..";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export class StorehouseWorkbenchChannel extends MessageChannel<
    WORKBENCH_STOREHOUSE_CHANNEL.Api,
    STOREHOUSE_WORKBENCH_CHANNEL.Api
> {
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
        if (!remoteWindow) {
            throw new Error("Invalid remote window");
        }

        const channelManager = this.channelManager;
        if (!channelManager.has(remoteWindow)) {
            channelManager.set(remoteWindow, new this(remoteWindow, storehouse));
        }

        const instance = channelManager.get(remoteWindow) as StorehouseWorkbenchChannel;

        if (!instance) {
            throw new Error("StorehouseWorkbenchChannel instance is not found");
        }
        return instance;
    }

    destroy() {
        super.destroy();
        StorehouseWorkbenchChannel.channelManager.delete(this.remoteWindow);
    }
}
