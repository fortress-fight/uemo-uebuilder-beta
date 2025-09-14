/*
 * @Description: uebuilder-editor 发送到 uebuilder-workbench 消息通道
 * @Author: F-Stone
 * @LastEditTime: 2025-09-15 00:07:00
 */
import type { WORKBENCH_EDITOR_FACTORY_CHANNEL } from "@stone/uebuilder-workbench-base/types/channel";
import type { EDITOR_FACTORY_WORKBENCH_CHANNEL } from "../../../../../types/channel";

import { MessageChannel } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

type Param = {
    on: {
        launchEditorFactory: (
            editorData: { title?: string; data: string },
            config: UE_BUILDER_EDITOR_FACTORY.Config
        ) => Promise<void>;
    };
};

export class EditorFactoryWorkbenchChannel extends MessageChannel<
    WORKBENCH_EDITOR_FACTORY_CHANNEL.Api,
    EDITOR_FACTORY_WORKBENCH_CHANNEL.Api
> {
    get localApi(): EDITOR_FACTORY_WORKBENCH_CHANNEL.Api {
        return {
            launchEditorFactory: (editorData, config) => {
                return this.param.on.launchEditorFactory(editorData, config);
            },
        } as EDITOR_FACTORY_WORKBENCH_CHANNEL.Api;
    }

    constructor(
        readonly remoteWindow: Window,
        private readonly param: Param
    ) {
        super(remoteWindow, "workbenchEditorFactoryChannel", {
            from: "editorFactory",
            to: "workbench",
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
            // 使用 new this 而不是 new EditorFactoryWorkbenchChannel 是因为 this 是使用当前类的子类
            channelManager.set(remoteWindow, new this(remoteWindow, param));
        }

        const instance = channelManager.get(remoteWindow) as EditorFactoryWorkbenchChannel;

        if (!instance) {
            throw new Error("EditorFactoryWorkbenchChannel instance is not found");
        }
        return instance;
    }

    destroy() {
        super.destroy();
        EditorFactoryWorkbenchChannel.channelManager.delete(this.remoteWindow);
    }
}
