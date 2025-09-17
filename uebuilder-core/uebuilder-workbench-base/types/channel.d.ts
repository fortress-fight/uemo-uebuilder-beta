/*
 * @Description: Workbench 中实现 Creator 调用的方法
 * @Author: F-Stone
 * @LastEditTime: 2025-09-17 13:20:02
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
        changeWorkbenchState(layer: "composer" | "browsing"): void;
        changeWorkbenchState(layer: "editing" | "preview", param: { data: string }): void;
        changeWorkbenchState(layer: "editing" | "composer" | "preview" | "browsing", param?: { data: string }): void;
    }
}

/**
 * WORKBENCH 中实现 EDITOR_FACTORY 调用的方法
 */
export namespace WORKBENCH_EDITOR_FACTORY_CHANNEL {
    export interface Api extends Methods {
        // EditorFactory Frame 准备就绪
        editorFactoryReady: () => void;

        // 显示消息
        showMessage: (type: "success" | "error" | "warning" | "info", message: string) => void;

        // 切换 APP 应用层
        changeWorkbenchState(layer: "composer"): void;
        changeWorkbenchState(layer: "editing" | "preview", param: { data: string }): void;
        changeWorkbenchState(layer: "editing" | "composer" | "preview", param?: { data: string }): void;
    }
}
