/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-08-04 01:23:14
 */
import type { WORKBENCH_STOREHOUSE_CHANNEL } from "../../../types/channel";
import type { STOREHOUSE_WORKBENCH_CHANNEL } from "@stone/uebuilder-storehouse-base/types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";
import { createToast } from "@stone/uemo-editor-element/packages/toast-plugin";

type Param = {
    on: {
        storehouseReady: (channel: WorkbenchStorehouseChannel) => void;
        checkLoginStatus: (channel: WorkbenchStorehouseChannel) => Promise<boolean>;
        openLoginPanel: (channel: WorkbenchStorehouseChannel) => void;
    };
};

export class WorkbenchStorehouseChannel extends MessageChannel<
    STOREHOUSE_WORKBENCH_CHANNEL.Api,
    WORKBENCH_STOREHOUSE_CHANNEL.Api
> {
    static storehouseReadyCallback: () => void;
    private static utils = { toast: createToast() };

    readonly localApi: WORKBENCH_STOREHOUSE_CHANNEL.Api = {
        storehouseReady: () => {
            this.param.on.storehouseReady(this);
        },
        showMessage: (type, message) => {
            WorkbenchStorehouseChannel.utils.toast[type](message);
        },
        checkLoginStatus: () => {
            return this.param.on.checkLoginStatus(this);
        },
        openLoginPanel: () => {
            return this.param.on.openLoginPanel(this);
        },
    };

    private constructor(
        readonly remoteWindow: Window,
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
        if (!remoteWindow) {
            throw new Error("Invalid remote window");
        }

        const channelManager = WorkbenchStorehouseChannel.channelManager;
        if (!channelManager.has(remoteWindow)) {
            // NOTE
            // 使用 new this 而不是 new WorkbenchStorehouseChannel 是因为 this 是使用当前类的子类
            channelManager.set(remoteWindow, new this(remoteWindow, param));
        }

        const instance = channelManager.get(remoteWindow) as WorkbenchStorehouseChannel;
        if (!instance) {
            throw new Error("WorkbenchStorehouseChannel instance is not found");
        }
        return instance;
    }

    destroy() {
        super.destroy();
        WorkbenchStorehouseChannel.channelManager.delete(this.remoteWindow);
    }
}
