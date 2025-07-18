/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-18 14:47:46
 */
import type { CREATOR_WORKBENCH_CHANNEL } from "@stone/uebuilder-creator-base/types/channel";
import type { WORKBENCH_CREATOR_CHANNEL } from "../../types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

const workbenchCreatorApi: WORKBENCH_CREATOR_CHANNEL.Api = {
    test: () => Promise.resolve("workbenchCreatorApi"),
};

export class WorkbenchCreatorChannel extends MessageChannel<CREATOR_WORKBENCH_CHANNEL.Api> {
    private static instance: WorkbenchCreatorChannel | null = null;

    private constructor(remoteWindow: Window) {
        super(remoteWindow, "creatorWorkbench", {
            from: "workbench",
            to: "creator",
            origin: "*",
            methods: workbenchCreatorApi,
        });
    }

    public static getInstance(remoteWindow: Window) {
        if (!WorkbenchCreatorChannel.instance) {
            WorkbenchCreatorChannel.instance = new WorkbenchCreatorChannel(remoteWindow);
        }
        return WorkbenchCreatorChannel.instance;
    }

    destroy() {
        super.destroy();
        WorkbenchCreatorChannel.instance = null;
    }
}
