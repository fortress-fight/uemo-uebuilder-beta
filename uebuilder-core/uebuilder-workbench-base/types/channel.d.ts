/*
 * @Description: Workbench 中实现 Creator 调用的方法
 * @Author: F-Stone
 * @LastEditTime: 2025-07-20 15:37:12
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export namespace WORKBENCH_CREATOR_CHANNEL {
    export interface Api extends Methods {
        // 启动工作台
        launchWorkbench: (config: UE_BUILDER_WORKBENCH.Config) => void;

        // 加密数据
        encodePageData: (data: string) => string;

        // 解密数据
        decodePageData: (data: string) => string;
    }
}
