/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-08-04 01:31:19
 */
import type { WORKBENCH_STOREHOUSE_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "../../../types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

type Param = {
    on: {
        launchStorehouse: (config: UE_BUILDER_STOREHOUSE.Config) => void;
    };
};

export class StorehouseWorkbenchChannel extends MessageChannel<
    WORKBENCH_STOREHOUSE_CHANNEL.Api,
    STOREHOUSE_WORKBENCH_CHANNEL.Api
> {
    get localApi(): STOREHOUSE_WORKBENCH_CHANNEL.Api {
        return {
            launchStorehouse: (config) => {
                this.param.on.launchStorehouse(config);
            },
        };
    }

    constructor(
        readonly remoteWindow: Window,
        private readonly param: Param
    ) {
        super(remoteWindow, "workbenchStorehouseChannel", {
            from: "storehouse",
            to: "workbench",
            origin: "*",
        });
        this.connect();
    }

    public static getInstance(remoteWindow: Window, param: Param) {
        if (!remoteWindow) {
            throw new Error("Invalid remote window");
        }

        const channelManager = this.channelManager;
        if (!channelManager.has(remoteWindow)) {
            // NOTE
            // 使用 new this 而不是 new StorehouseWorkbenchChannel 是因为 this 是使用当前类的子类
            channelManager.set(remoteWindow, new this(remoteWindow, param));
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
