/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 15:18:05
 */
import type { UeBuilderWorkbenchBase } from "../../index";
import type { WORKBENCH_CREATOR_CHANNEL } from "../../../types/channel";
import type { CREATOR_WORKBENCH_CHANNEL } from "@stone/uebuilder-creator-base/types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

import { encrypt, decrypt } from "../page-data/crypto-helper";

export class WorkbenchCreatorChannel extends MessageChannel<
    CREATOR_WORKBENCH_CHANNEL.Api,
    WORKBENCH_CREATOR_CHANNEL.Api
> {
    private static instance: WorkbenchCreatorChannel | null = null;

    readonly localApi: WORKBENCH_CREATOR_CHANNEL.Api = {
        launchWorkbench: (config) => {
            this.UeBuilderWorkbenchBase.launchWorkbench(config);
        },
        encodePageData: (data) => {
            return encrypt(data);
        },
        decodePageData: (data) => {
            return decrypt(data);
        },
    };

    private constructor(
        remoteWindow: Window,
        public readonly UeBuilderWorkbenchBase: UeBuilderWorkbenchBase
    ) {
        super(remoteWindow, "creatorWorkbench", {
            from: "workbench",
            to: "creator",
            origin: "*",
        });
        this.connect();
    }

    public static getInstance(remoteWindow: Window, workbench: UeBuilderWorkbenchBase) {
        if (!WorkbenchCreatorChannel.instance) {
            WorkbenchCreatorChannel.instance = new WorkbenchCreatorChannel(remoteWindow, workbench);
        }
        return WorkbenchCreatorChannel.instance;
    }

    destroy() {
        super.destroy();
        WorkbenchCreatorChannel.instance = null;
    }
}
