// #region 样式文件

import "../assets/style";

// #endregion

import queryString from "@stone/uemo-editor-utils/lib/query-string";

import { WorkbenchCreatorChannel } from "../utils/frame-channel";

/**
 * UeBuilder 创建器基类
 * @class UeBuilderCreatorBase
 * @description 负责管理和创建 UeBuilder 工作台实例
 */
export class UeBuilderWorkbenchBase {
    static utils = { queryString };

    /** 初始化状态标志 */
    public initialized = false;

    /**
     * 构造函数
     * @param {HTMLElement} rootDom - 根 DOM 元素
     * @param {UE_BUILDER_CREATOR.InitParams} option - 初始化参数
     */
    constructor(
        public readonly rootDom: HTMLElement,
        public readonly option: UE_BUILDER_WORKBENCH.InitParams
    ) {
        //
    }

    /**
     * 初始化消息通道
     * @private
     */
    async initializeMessageChannel(): Promise<void> {
        const workbenchCreate = WorkbenchCreatorChannel.getInstance(window.parent);
        const remote = await workbenchCreate.remote;
        const result = await remote._getInfo();

        // eslint-disable-next-line
        console.log(result);
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

    /**
     * 销毁实例
     * @description 清理资源并移除实例引用
     */
    public destroy(): void {
        this.initialized = false;
    }
}
