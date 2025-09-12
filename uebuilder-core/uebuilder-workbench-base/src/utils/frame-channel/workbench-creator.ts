/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-08-04 01:23:04
 */
import type { WORKBENCH_CREATOR_CHANNEL } from "../../../types/channel";
import type { CREATOR_WORKBENCH_CHANNEL } from "@stone/uebuilder-creator-base/types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

import { encrypt, decrypt } from "../page-data/crypto-helper";

type Param = {
    on: {
        launchWorkbench: (config: UE_BUILDER_WORKBENCH.Config) => void;
    };
};

export class WorkbenchCreatorChannel extends MessageChannel<
    CREATOR_WORKBENCH_CHANNEL.Api,
    WORKBENCH_CREATOR_CHANNEL.Api
> {
    get localApi(): WORKBENCH_CREATOR_CHANNEL.Api {
        return {
            launchWorkbench: (config) => {
                this.param.on.launchWorkbench(config);
            },
            encodePageData: (data) => {
                return encrypt(data);
            },
            decodePageData: (data) => {
                return decrypt(data);
            },
        };
    }

    constructor(
        remoteWindow: Window,
        public readonly param: Param
    ) {
        super(remoteWindow, "creatorWorkbench", {
            from: "workbench",
            to: "creator",
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
            // 使用 new this 而不是 new WorkbenchCreatorChannel 是因为 this 是使用当前类的子类
            channelManager.set(remoteWindow, new this(remoteWindow, param));
        }

        const instance = channelManager.get(remoteWindow) as WorkbenchCreatorChannel;
        if (!instance) {
            throw new Error("WorkbenchCreatorChannel instance is not found");
        }
        return instance;
    }

    destroy() {
        super.destroy();
        WorkbenchCreatorChannel.channelManager.delete(this.remoteWindow);
    }
}
