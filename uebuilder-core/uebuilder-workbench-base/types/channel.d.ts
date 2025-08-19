/*
 * @Description: Workbench 中实现 Creator 调用的方法
 * @Author: F-Stone
 * @LastEditTime: 2025-08-18 16:09:52
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

/**
 * 工作台中实现 Creator 调用的方法
 */
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

/**
 * 工作台中实现 Storehouse 调用的方法
 */
export namespace WORKBENCH_STOREHOUSE_CHANNEL {
    export interface Api extends Methods {
        // 仓库准备就绪
        storehouseReady: () => void;

        // 显示消息
        showMessage: (type: "success" | "error" | "warning" | "info", message: string) => void;

        // 检查登录状态
        checkLoginStatus: () => Promise<boolean>;

        // 获取登录状态
        getLoginStatus: () => boolean;

        // 打开登录窗口
        openLoginPanel: () => void;
    }
}
