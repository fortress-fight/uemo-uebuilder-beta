/*
 * @Description: 定义 Creator 能够调用的 Workbench 方法
 * @Author: F-Stone
 * @LastEditTime: 2025-07-18 14:03:14
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export namespace CREATOR_WORKBENCH_CHANNEL {
    export interface Api extends Methods {
        // 测试方法
        test: () => Promise<string>;
    }
}
