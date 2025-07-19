/*
 * @Description: 定义 Creator 能够调用的 Workbench 方法
 * @Author: F-Stone
 * @LastEditTime: 2025-07-19 14:09:31
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

export namespace CREATOR_WORKBENCH_CHANNEL {
    export interface Api extends Methods {
        // 工作台初始化完成
        workbenchReady: () => void;

        // 工作台卸载
        workbenchUnload: () => void;

        // 获取页面数据
        getEditorPageData: () => Promise<string>;

        // 设置工作台尺寸
        setWorkbenchSize: (isFullSize: boolean) => void;
    }
}

export namespace CREATOR_STOREHOUSE_CHANNEL {
    export interface Api extends Methods {
        // 测试方法
        test: () => Promise<string>;
    }
}
