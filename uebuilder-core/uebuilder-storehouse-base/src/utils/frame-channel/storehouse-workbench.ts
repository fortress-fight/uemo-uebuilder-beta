/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 00:55:40
 */
import type { WORKBENCH_STOREHOUSE_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "../../../types/channel";
import type { UeBuilderStorehouseBase } from "../..";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export class StorehouseWorkbenchChannel extends MessageChannel<
    WORKBENCH_STOREHOUSE_CHANNEL.Api,
    STOREHOUSE_WORKBENCH_CHANNEL.Api
> {
    static storehouse: UeBuilderStorehouseBase | null = null;
    private static instance: StorehouseWorkbenchChannel | null = null;

    readonly localApi = {
        test: () => Promise.resolve("storehouseCreatorApi"),
    };

    private constructor(remoteWindow: Window) {
        if (!StorehouseWorkbenchChannel.storehouse) {
            console.error("StorehouseWorkbenchChannel.storehouse is not set");
            return;
        }

        super(remoteWindow, "workbenchStorehouseChannel", {
            from: "storehouse",
            to: "workbench",
            origin: "*",
        });
        this.connect();
    }

    public static getInstance(remoteWindow: Window) {
        if (!StorehouseWorkbenchChannel.instance) {
            StorehouseWorkbenchChannel.instance = new StorehouseWorkbenchChannel(remoteWindow);
        }
        return StorehouseWorkbenchChannel.instance;
    }

    destroy() {
        super.destroy();
        StorehouseWorkbenchChannel.instance = null;
    }
}
