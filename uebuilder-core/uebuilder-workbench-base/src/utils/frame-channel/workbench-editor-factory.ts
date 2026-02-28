/*
 * @Description: uebuilder-creator 到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-09-14 00:43:59
 */
import type { WORKBENCH_EDITOR_FACTORY_CHANNEL } from "../../../types/channel";
import type { EDITOR_FACTORY_WORKBENCH_CHANNEL } from "@stone/uebuilder-editor/types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";
import { createToast } from "@stone/uemo-editor-element/packages/toast-plugin";

type Param = {
    on: {
        // 工作台 Frame 准备完毕
        editorFactoryReady: (channel: WorkbenchEditorFactoryChannel) => void;

        // 切换应用层
        changeWorkbenchState(channel: WorkbenchEditorFactoryChannel, state: "composer"): void;
        changeWorkbenchState(
            channel: WorkbenchEditorFactoryChannel,
            state: "editing" | "preview",
            param: { data: string }
        ): void;
        changeWorkbenchState(
            channel: WorkbenchEditorFactoryChannel,
            state: "editing" | "composer" | "preview",
            param?: { data: string }
        ): void;
    };
};

export class WorkbenchEditorFactoryChannel extends MessageChannel<
    EDITOR_FACTORY_WORKBENCH_CHANNEL.Api,
    WORKBENCH_EDITOR_FACTORY_CHANNEL.Api
> {
    static editorReadyCallback: () => void;
    private static utils = { toast: createToast() };

    readonly localApi: WORKBENCH_EDITOR_FACTORY_CHANNEL.Api = {
        editorFactoryReady: () => {
            this.param.on.editorFactoryReady(this);
        },
        showMessage: (type, message) => {
            WorkbenchEditorFactoryChannel.utils.toast[type](message);
        },
        changeWorkbenchState: (state: "editing" | "composer" | "preview", param?: { data: string }) => {
            return this.param.on.changeWorkbenchState(this, state, param);
        },
    };

    private constructor(
        readonly remoteWindow: Window,
        private readonly param: Param
    ) {
        super(remoteWindow, "workbenchEditorFactoryChannel", {
            from: "workbench",
            to: "editor",
            origin: "*",
        });
        this.connect();
    }

    public static getInstance(remoteWindow: Window, param: Param) {
        if (!remoteWindow) {
            throw new Error("Invalid remote window");
        }

        const channelManager = WorkbenchEditorFactoryChannel.channelManager;
        if (!channelManager.has(remoteWindow)) {
            // NOTE
            // 使用 new this 而不是 new WorkbenchEditorChannel 是因为 this 是使用当前类的子类
            channelManager.set(remoteWindow, new this(remoteWindow, param));
        }

        const instance = channelManager.get(remoteWindow) as WorkbenchEditorFactoryChannel;
        if (!instance) {
            throw new Error("WorkbenchEditorChannel instance is not found");
        }
        return instance;
    }

    destroy() {
        super.destroy();
        WorkbenchEditorFactoryChannel.channelManager.delete(this.remoteWindow);
    }
}
