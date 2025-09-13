/*
 * @Description: 定义 Workbench 能够调用的 editor-factory 方法
 * @Author: F-Stone
 * @LastEditTime: 2025-09-14 00:37:13
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

/**
 * EDITOR 中实现 Workbench 调用的方法
 */

declare namespace EDITOR_FACTORY_WORKBENCH_CHANNEL {
    interface Api extends Methods {
        launchEditorFactory: (config: UE_BUILDER_FACTORY_EDITOR.Config) => Promise<void>;
    }
}
