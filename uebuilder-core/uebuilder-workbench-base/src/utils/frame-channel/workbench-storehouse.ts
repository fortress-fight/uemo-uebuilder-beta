/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 00:50:33
 */
import type { WORKBENCH_STOREHOUSE_CHANNEL } from "../../../types/channel";
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "@stone/uebuilder-storehouse-base/types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export class WorkbenchStorehouseChannel extends MessageChannel<
    WORKBENCH_STOREHOUSE_CHANNEL.Api,
    STOREHOUSE_WORKBENCH_CHANNEL.Api
> {
    private static instance: WorkbenchStorehouseChannel | null = null;

    readonly localApi: WORKBENCH_STOREHOUSE_CHANNEL.Api = {
        test: () => {
            return Promise.resolve("test");
        },
    };

    private constructor(remoteWindow: Window) {
        super(remoteWindow, "workbenchStorehouseChannel", {
            from: "workbench",
            to: "storehouse",
            origin: "*",
        });
        this.connect();
    }

    public static getInstance(remoteWindow: Window) {
        if (!WorkbenchStorehouseChannel.instance) {
            WorkbenchStorehouseChannel.instance = new WorkbenchStorehouseChannel(remoteWindow);
        }
        return WorkbenchStorehouseChannel.instance;
    }

    destroy() {
        super.destroy();
        WorkbenchStorehouseChannel.instance = null;
    }
}
