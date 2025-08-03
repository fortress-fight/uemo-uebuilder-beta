/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-08-04 01:22:09
 */
import type { WORKBENCH_CREATOR_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { CREATOR_WORKBENCH_CHANNEL } from "../../../types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";
import mitt from "@stone/uemo-editor-utils/lib/mitt";

type Param = {
    on: {
        launchWorkbench: () => void;
        workbenchUnload: () => void;
        changeWorkbenchSize: (isFullSize: boolean) => void;
        workbenchStateChanged: (state: UE_BUILDER.State) => void;
        getEditorPageData: () => Promise<string>;
    };
};

export class CreatorWorkbenchChannel extends MessageChannel<
    WORKBENCH_CREATOR_CHANNEL.Api,
    CREATOR_WORKBENCH_CHANNEL.Api
> {
    private constructor(
        remoteWindow: Window,
        public readonly param: Param
    ) {
        super(remoteWindow, "creatorWorkbench", { from: "creator", to: "workbench", origin: "*" });
        this.connect();
    }
    public static getInstance(remoteWindow: Window, param: Param) {
        if (!remoteWindow) {
            throw new Error("Invalid remote window");
        }

        const channelManager = this.channelManager;
        if (!channelManager.has(remoteWindow)) {
            // NOTE
            // 使用 new this 而不是 new CreatorWorkbenchChannel 是因为 this 是使用当前类的子类
            channelManager.set(remoteWindow, new this(remoteWindow, param));
        }

        const instance = channelManager.get(remoteWindow) as CreatorWorkbenchChannel;
        if (!instance) {
            throw new Error("CreatorWorkbenchChannel instance is not found");
        }
        return instance;
    }

    public readonly eventBus = mitt();

    readonly localApi: CREATOR_WORKBENCH_CHANNEL.Api = {
        workbenchReady: () => {
            this.param.on.launchWorkbench();
        },
        workbenchUnload: () => {
            this.param.on.workbenchUnload();
        },
        setWorkbenchSize: (isFullSize: boolean) => {
            this.param.on.changeWorkbenchSize(isFullSize);
        },
        workbenchStateChanged: (state: UE_BUILDER.State) => {
            this.param.on.workbenchStateChanged(state);
        },
        getEditorPageData: () => {
            return this.param.on.getEditorPageData();
        },
    };

    destroy() {
        super.destroy();
        this.eventBus.all.clear();
        CreatorWorkbenchChannel.channelManager.delete(this.remoteWindow);
    }
}
