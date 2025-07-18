/*
 * @Description: 定义 Workbench 能够调用的 Creator 方法
 * @Author: F-Stone
 * @LastEditTime: 2025-07-18 14:02:41
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export namespace WORKBENCH_CREATOR_CHANNEL {
    export interface Api extends Methods {
        // 测试方法
        test: () => Promise<string>;
    }
}
