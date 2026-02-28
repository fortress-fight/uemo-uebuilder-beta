/*
 * @Description: 定义 Workbench 能够调用的 editor-factory 方法
 * @Author: F-Stone
 * @LastEditTime: 2025-09-17 14:25:25
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

/**
 * EDITOR_FACTORY 中实现 Workbench 调用的方法
 */

declare namespace EDITOR_FACTORY_WORKBENCH_CHANNEL {
    interface Api extends Methods {
        launchEditorFactory: (
            editorData: { title?: string; data: string },
            config: UE_BUILDER_EDITOR_FACTORY.Config
        ) => Promise<void>;

        setWorkbenchDevice: (device: UE_BUILDER.DeviceType) => void;
    }
}
