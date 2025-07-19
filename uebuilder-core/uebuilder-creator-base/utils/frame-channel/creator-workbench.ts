/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-19 15:50:34
 */
import type { WORKBENCH_CREATOR_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { CREATOR_WORKBENCH_CHANNEL } from "../../types/channel";
import type { UeBuilderCreatorBase } from "../../src";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";
import mitt from "@stone/uemo-editor-utils/lib/mitt";

export class CreatorWorkbenchChannel extends MessageChannel<
    WORKBENCH_CREATOR_CHANNEL.Api,
    CREATOR_WORKBENCH_CHANNEL.Api
> {
    static creator: UeBuilderCreatorBase | null = null;
    private static instance: CreatorWorkbenchChannel | null = null;

    private constructor(remoteWindow: Window) {
        super(remoteWindow, "creatorWorkbench", { from: "creator", to: "workbench", origin: "*" });
        this.connect();
    }
    public static getInstance(remoteWindow: Window) {
        if (!CreatorWorkbenchChannel.creator) {
            throw new Error("缺少 CreatorWorkbenchChannel.creator 实例");
        }

        if (!CreatorWorkbenchChannel.instance) {
            CreatorWorkbenchChannel.instance = new CreatorWorkbenchChannel(remoteWindow);
        }
        return CreatorWorkbenchChannel.instance;
    }

    public readonly eventBus = mitt();

    readonly localApi: CREATOR_WORKBENCH_CHANNEL.Api = {
        workbenchReady: () => {
            CreatorWorkbenchChannel.creator!.launchWorkbench();
        },
        workbenchUnload: () => {
            CreatorWorkbenchChannel.creator?.resetWorkbenchSize();
        },
        setWorkbenchSize: (isFullSize: boolean) => {
            CreatorWorkbenchChannel.creator?.changeWorkbenchSize(isFullSize);
        },
        workbenchStateChanged: (state: UE_BUILDER.State) => {
            CreatorWorkbenchChannel.creator?.workbenchStateChanged(state);
        },
        getEditorPageData: () => {
            return CreatorWorkbenchChannel.creator!.getEditorPageData();
        },
    };

    destroy() {
        super.destroy();
        this.eventBus.all.clear();
        CreatorWorkbenchChannel.instance = null;
    }
}
