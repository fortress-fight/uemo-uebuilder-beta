// #region 样式文件

import "../assets/style";

// #endregion

import type { UE_EL_OPTIONS } from "@stone/uemo-editor-element/src";

import queryString from "@stone/uemo-editor-utils/lib/query-string";
import UeEl from "@stone/uemo-editor-element/src";

import { pinia, useUeBuilderStorehouseStore } from "./store";
import { StorehouseWorkbenchChannel } from "./utils/frame-channel";

/**
 * UeBuilder 创建器基类
 * @class UeBuilderCreatorBase
 * @description 负责管理和创建 UeBuilder 工作台实例
 */
export abstract class UeBuilderStorehouseBase {
    static utils = { queryString };

    /** 初始化状态标志 */
    public initialized = false;

    protected store = useUeBuilderStorehouseStore(pinia);

    /**
     * 构造函数
     * @param {HTMLElement} rootDom - 根 DOM 元素
     * @param {UE_BUILDER_CREATOR.InitParams} option - 初始化参数
     */
    constructor(public readonly rootDom: HTMLElement) {
        //
    }

    /**
     * 初始化消息通道
     * @private
     */
    private storehouseWorkbenchChannel: StorehouseWorkbenchChannel | null = null;
    async initializeMessageChannel(): Promise<void> {
        this.storehouseWorkbenchChannel = StorehouseWorkbenchChannel.getInstance(window.parent, this);
        const remote = await this.storehouseWorkbenchChannel.remote;
        await remote.storehouseReady();

        // const info = await remote._getInfo();
        // console.log("Workbench => Storehouse", info);
    }

    /**
     * 初始化工作台
     * @returns {this} 当前实例
     * @throws {Error} 如果重复初始化
     */
    public init(): this {
        if (this.initialized) {
            return this;
        }

        this.initializeMessageChannel().catch((err) => {
            console.error(err);
        });

        return this;
    }

    abstract launchStorehouse(config: UE_BUILDER_STOREHOUSE.Config): void;

    public renderStorehouse(
        app: ReturnType<typeof createApp>,
        param: { storehouseConfig: UE_BUILDER_STOREHOUSE.Config; ueElConfig: UE_EL_OPTIONS }
    ): void {
        this.store.setStorehouseConfig(param.storehouseConfig);

        // #region 渲染工作台应用

        app.use(pinia);
        app.use(UeEl, param.ueElConfig);
        app.mount(this.rootDom);

        // #endregion
    }

    /**
     * 销毁实例
     * @description 清理资源并移除实例引用
     */
    public destroy(): void {
        this.initialized = false;
        this.storehouseWorkbenchChannel?.destroy();
    }
}
