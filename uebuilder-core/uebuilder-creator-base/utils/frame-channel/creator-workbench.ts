/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-18 14:47:33
 */
import type { WORKBENCH_CREATOR_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { CREATOR_WORKBENCH_CHANNEL } from "../../types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

const creatorWorkbenchApi: CREATOR_WORKBENCH_CHANNEL.Api = {
    test: () => Promise.resolve("creatorWorkbenchApi"),
};

export class CreatorWorkbenchChannel extends MessageChannel<WORKBENCH_CREATOR_CHANNEL.Api> {
    private static instance: CreatorWorkbenchChannel | null = null;

    private constructor(remoteWindow: Window) {
        super(remoteWindow, "creatorWorkbench", {
            from: "creator",
            to: "workbench",
            origin: "*",
            methods: creatorWorkbenchApi,
        });
    }

    public static getInstance(remoteWindow: Window) {
        if (!CreatorWorkbenchChannel.instance) {
            CreatorWorkbenchChannel.instance = new CreatorWorkbenchChannel(remoteWindow);
        }
        return CreatorWorkbenchChannel.instance;
    }

    destroy() {
        super.destroy();
        CreatorWorkbenchChannel.instance = null;
    }
}
