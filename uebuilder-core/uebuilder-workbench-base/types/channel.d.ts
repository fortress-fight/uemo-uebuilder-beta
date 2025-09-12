/*
 * @Description: Workbench 中实现 Creator 调用的方法
 * @Author: F-Stone
 * @LastEditTime: 2025-09-12 16:50:57
 */
import type { Methods } from "@stone/uemo-editor-utils/lib/penpal/message-channel";

/**
 * WORKBENCH 中实现 CREATOR 调用的方法
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
 * WORKBENCH 中实现 STOREHOUSE 调用的方法
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

        // 切换 APP 应用层
        tabAppLayer(layer: "uebuilderComposerLayer"): void;
        tabAppLayer(layer: "uebuilderEditorLayer" | "uebuilderPreviewLayer", param: { data: string }): void;
        tabAppLayer(
            layer: "uebuilderEditorLayer" | "uebuilderComposerLayer" | "uebuilderPreviewLayer",
            param?: { data: string }
        ): void;
    }
}
