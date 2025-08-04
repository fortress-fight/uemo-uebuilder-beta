/*
 * @Description: 定义 Workbench 能够调用的 Creator 方法
 * @Author: F-Stone
 * @LastEditTime: 2025-08-05 00:29:04
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

/**
 * Storehouse 中实现 Workbench 调用的方法
 */

declare module "@stone/uebuilder-storehouse-base/types/channel" {
    namespace STOREHOUSE_WORKBENCH_CHANNEL {
        interface Api extends Methods {
            userLogin: () => void;
            userLogout: () => void;
        }
    }
}
