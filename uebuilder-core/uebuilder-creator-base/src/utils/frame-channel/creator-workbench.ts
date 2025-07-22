/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 15:15:45
 */
import type { WORKBENCH_CREATOR_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { CREATOR_WORKBENCH_CHANNEL } from "../../../types/channel";
import type { UeBuilderCreatorBase } from "../..";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";
import mitt from "@stone/uemo-editor-utils/lib/mitt";

export class CreatorWorkbenchChannel extends MessageChannel<
    WORKBENCH_CREATOR_CHANNEL.Api,
    CREATOR_WORKBENCH_CHANNEL.Api
> {
    private static instance: CreatorWorkbenchChannel | null = null;

    private constructor(
        remoteWindow: Window,
        public readonly UeBuilderCreatorBase: UeBuilderCreatorBase
    ) {
        super(remoteWindow, "creatorWorkbench", { from: "creator", to: "workbench", origin: "*" });
        this.connect();
    }
    public static getInstance(remoteWindow: Window, creator: UeBuilderCreatorBase) {
        if (!CreatorWorkbenchChannel.instance) {
            CreatorWorkbenchChannel.instance = new CreatorWorkbenchChannel(remoteWindow, creator);
        }
        return CreatorWorkbenchChannel.instance;
    }

    public readonly eventBus = mitt();

    readonly localApi: CREATOR_WORKBENCH_CHANNEL.Api = {
        workbenchReady: () => {
            this.UeBuilderCreatorBase.launchWorkbench();
        },
        workbenchUnload: () => {
            this.UeBuilderCreatorBase.workbenchUnload();
        },
        setWorkbenchSize: (isFullSize: boolean) => {
            this.UeBuilderCreatorBase.changeWorkbenchSize(isFullSize);
        },
        workbenchStateChanged: (state: UE_BUILDER.State) => {
            this.UeBuilderCreatorBase.workbenchStateChanged(state);
        },
        getEditorPageData: () => {
            return this.UeBuilderCreatorBase.getEditorPageData();
        },
    };

    destroy() {
        super.destroy();
        this.eventBus.all.clear();
        CreatorWorkbenchChannel.instance = null;
    }
}
