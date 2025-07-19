/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-18 16:54:26
 */
import type { CREATOR_STOREHOUSE_CHANNEL } from "@stone/uebuilder-creator-base/types/channel";
import type { STOREHOUSE_CREATOR_CHANNEL } from "../../types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export class StorehouseCreatorChannel extends MessageChannel<
    CREATOR_STOREHOUSE_CHANNEL.Api,
    STOREHOUSE_CREATOR_CHANNEL.Api
> {
    private static instance: StorehouseCreatorChannel | null = null;

    readonly localApi = {
        test: () => Promise.resolve("storehouseCreatorApi"),
    };

    private constructor(remoteWindow: Window) {
        super(remoteWindow, "creatorStorehouse", {
            from: "storehouse",
            to: "creator",
            origin: "*",
        });
        this.connect();
    }

    public static getInstance(remoteWindow: Window) {
        if (!StorehouseCreatorChannel.instance) {
            StorehouseCreatorChannel.instance = new StorehouseCreatorChannel(remoteWindow);
        }
        return StorehouseCreatorChannel.instance;
    }

    destroy() {
        super.destroy();
        StorehouseCreatorChannel.instance = null;
    }
}
