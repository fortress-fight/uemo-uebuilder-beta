/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-18 15:08:31
 */
import type { CREATOR_STOREHOUSE_CHANNEL } from "@stone/uebuilder-creator-base/types/channel";
import type { STOREHOUSE_CREATOR_CHANNEL } from "../../types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

const storehouseCreatorApi: STOREHOUSE_CREATOR_CHANNEL.Api = {
    test: () => Promise.resolve("storehouseCreatorApi"),
};

export class StorehouseCreatorChannel extends MessageChannel<CREATOR_STOREHOUSE_CHANNEL.Api> {
    private static instance: StorehouseCreatorChannel | null = null;

    private constructor(remoteWindow: Window) {
        super(remoteWindow, "creatorStorehouse", {
            from: "storehouse",
            to: "creator",
            origin: "*",
            methods: storehouseCreatorApi,
        });
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
