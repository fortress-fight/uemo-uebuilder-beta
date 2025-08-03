/*
 * @Description: 定义 Workbench 能够调用的 Creator 方法
 * @Author: F-Stone
 * @LastEditTime: 2025-08-04 00:04:03
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

/**
 * Storehouse 中实现 Workbench 调用的方法
 */

declare namespace STOREHOUSE_WORKBENCH_CHANNEL {
    interface Api extends Methods {
        launchStorehouse: (config: UE_BUILDER_STOREHOUSE.Config) => void;
    }
}
