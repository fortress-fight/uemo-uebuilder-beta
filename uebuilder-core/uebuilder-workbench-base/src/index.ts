// #region 样式文件

import "../assets/style";

// #endregion

import { createApp } from "vue";

import { createToast } from "@stone/uemo-editor-element/packages/toast-plugin";
import queryString from "@stone/uemo-editor-utils/lib/query-string";
import NProgress from "@stone/uemo-editor-utils/lib/nprogress";
import { UeError } from "@stone/uemo-editor-utils/lib/error";

import { pinia } from "../store";
import { useUeBuilderWorkbenchStore } from "../store/store-workbench";

import { WorkbenchCreatorChannel } from "../utils/frame-channel";

/**
 * UeBuilder 创建器基类
 * @class UeBuilderCreatorBase
 * @description 负责管理和创建 UeBuilder 工作台实例
 */
export abstract class UeBuilderWorkbenchBase {
    static utils = { queryString, toast: createToast(), UeError };

    /** 初始化状态标志 */
    public initialized = false;

    protected store = useUeBuilderWorkbenchStore(pinia);

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
    private workbenchCreatorChannel: WorkbenchCreatorChannel | null = null;
    async initializeMessageChannel(): Promise<void> {
        WorkbenchCreatorChannel.workbench = this;
        this.workbenchCreatorChannel = WorkbenchCreatorChannel.getInstance(window.parent);
        const remote = await this.workbenchCreatorChannel.remote;

        // 通知 creator 工作台已准备好,等待启动命令
        await remote.workbenchReady();
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

    abstract launchWorkbench(config: UE_BUILDER_WORKBENCH.Config): void;

    /**
     * 渲染工作台
     * @param config - 配置
     * @returns {Promise<void>} 渲染工作台的 Promise
     */
    public async renderWorkbench(
        app: ReturnType<typeof createApp>,
        config: UE_BUILDER_WORKBENCH.Config
    ): Promise<void> {
        let isLoading = false;
        const loadingTimeout = setTimeout(() => {
            isLoading = true;
            NProgress.configure({ parent: "body" }).start();
        }, 1000);

        const remote = await this.workbenchCreatorChannel!.remote;

        this.store.setWorkbenchState(config.workbenchState);

        if (config.workbenchState === "editing" || config.workbenchState === "preview") {
            const pageData = await remote.getEditorPageData().then(
                (pageData) => pageData,
                (err) => {
                    this.handleError(err);
                    return "";
                }
            );

            switch (config.workbenchState) {
                case "editing":
                    this.store.setCurrentEditorPageData({ data: pageData });
                    break;
                case "preview":
                    this.store.setCurrentPreviewPageData({ data: pageData });
                    break;
                default:
                    console.error("Unknown workbench state", config.workbenchState);
                    break;
            }
        }

        // eslint-disable-next-line
        console.log("config", config);

        clearTimeout(loadingTimeout);
        if (isLoading) {
            NProgress.done();
        }

        this.renderWorkbenchApp(app);
    }

    /**
     * 渲染工作台应用
     * @param app - 应用实例
     */
    private renderWorkbenchApp(app: ReturnType<typeof createApp>) {
        app.use(pinia);

        app.mount(this.rootDom);
    }

    /**
     * 处理错误
     * @param err - 错误
     */
    protected handleError(err: unknown) {
        UeBuilderWorkbenchBase.utils.toast.error(err instanceof Error ? err.message : "Unknown Error");
    }

    /**
     * 销毁实例
     * @description 清理资源并移除实例引用
     */
    public destroy(): void {
        this.initialized = false;
    }
}
