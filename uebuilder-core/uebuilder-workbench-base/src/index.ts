// #region 样式文件

import "./assets/style";

// #endregion

import type { UE_EL_OPTIONS } from "@stone/uemo-editor-element/src";

import { createApp } from "vue";

import { createToast } from "@stone/uemo-editor-element/packages/toast-plugin";
import queryString from "@stone/uemo-editor-utils/lib/query-string";
import NProgress from "@stone/uemo-editor-utils/lib/nprogress";
import { UeError } from "@stone/uemo-editor-utils/lib/error";
import UeEl from "@stone/uemo-editor-element/src";
import UeElConfirmPanel from "@stone/uemo-editor-element/packages/confirm-panel";
import { useElDialog } from "@stone/uemo-editor-element/packages/pop-panel/plugin";

import { i18n } from "./plugin/i18n";
import { pinia } from "./store";
import { useUeBuilderWorkbenchStore } from "./store/store-workbench";
import { WorkbenchCreatorChannel } from "./utils/frame-channel";
import { UeBuilderWorkbenchBaseKey } from "./plugin/injection-key";

/**
 * UeBuilder 创建器基类
 * @class UeBuilderCreatorBase
 * @description 负责管理和创建 UeBuilder 工作台实例
 */
export abstract class UeBuilderWorkbenchBase {
    static utils = { queryString, toast: createToast(), UeError };

    /** 初始化状态标志 */
    public initialized = false;

    public store = useUeBuilderWorkbenchStore(pinia);

    public UeBuilderWorkbenchApp: ReturnType<typeof createApp> | null = null;

    abstract WorkbenchCreatorChannelCreator: typeof WorkbenchCreatorChannel;

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
     * @protected
     */
    protected workbenchCreatorChannel: WorkbenchCreatorChannel | null = null;
    async initializeMessageChannel(): Promise<void> {
        this.workbenchCreatorChannel = this.WorkbenchCreatorChannelCreator.getInstance(window.parent, {
            on: {
                launchWorkbench: (config) => {
                    this.launchWorkbench(config);
                },
            },
        });
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

        this.initialized = true;
        return this;
    }

    abstract launchWorkbench(config: UE_BUILDER_WORKBENCH.Config): void;
    abstract checkLoginStatus(): Promise<boolean>;
    abstract getLoginStatus(): boolean;
    abstract openLoginPanel(): void;

    changeWorkbenchState(state: "composer" | "browsing"): void;
    changeWorkbenchState(state: "editing" | "preview", param?: { data: string }): void;
    changeWorkbenchState(state: "editing" | "composer" | "preview" | "browsing", param?: { data: string }) {
        switch (state) {
            case "editing":
                this.handleEditingStateChange(param);
                break;
            case "preview":
                // NOTE 如果没有传递新的页面数据，就是使用现有的数据
                this.handlePreviewStateChange(param);
                break;

            default:
                this.store.setWorkbenchState(state);
                break;
        }
    }
    /**
     * 处理编辑状态变更
     *
     * @private
     * @param {{ data: string }} [param]
     * @return {*}
     * @memberof UeBuilderWorkbenchBase
     */
    private handleEditingStateChange(param?: { data: string }) {
        // NOTE 如果没有传递新的页面数据，就是使用现有的数据，使用场景：继续编辑
        if (!param?.data) {
            this.store.setWorkbenchState("editing");
            return;
        }

        // NOTE 如果没有现有数据存在的情况下，直接使用传递的新数据
        if (!this.store.currentEditorPageData.data) {
            this.store.setCurrentEditorPageData({ data: param.data });
            this.store.setWorkbenchState("editing");
            return;
        }

        if (!this.UeBuilderWorkbenchApp) return;

        // NOTE 需要覆盖当前编辑内容的场景
        const { t } = i18n.global;
        const dialog = useElDialog(
            {
                autoClose: true,
                mask: { color: "rgba(0, 0, 0, 0.5)" },
                panel: { position: "center" },
            },
            {
                default: () =>
                    h(UeElConfirmPanel, {
                        title: t("REPLACE_PAGE_TITLE"),
                        desc: t("REPLACE_PAGE_TIP"),
                        cancelBtn: { theme: "white" },
                        confirmBtn: { theme: "red" },
                        onConfirm: () => {
                            this.store.setCurrentEditorPageData({ data: param.data });
                            this.store.setWorkbenchState("editing");
                            dialog.closeDialog();
                        },
                        onClose: () => {
                            dialog.closeDialog();
                        },
                        onCancel: () => {
                            dialog.closeDialog();
                        },
                    }),
            },
            this.UeBuilderWorkbenchApp
        );
    }

    /**
     * 处理预览状态变更
     *
     * @private
     * @param {{ data: string }} [param]
     * @return {*}
     * @memberof UeBuilderWorkbenchBase
     */
    private handlePreviewStateChange(param?: { data: string }) {
        // NOTE 如果没有传递新的页面数据，就是使用现有的数据
        if (!param?.data) {
            this.store.setWorkbenchState("preview");
            return;
        }
        this.store.setCurrentPreviewPageData({ data: param.data });
    }

    showLoading() {
        if (NProgress.isStarted()) return;
        NProgress.configure({ parent: "body" }).start();
    }

    hideLoading() {
        NProgress.done();
    }

    /**
     * 渲染工作台
     * @param workbenchConfig - 配置
     * @returns {Promise<void>} 渲染工作台的 Promise
     */
    public async renderWorkbench(
        app: ReturnType<typeof createApp>,
        param: { workbenchConfig: UE_BUILDER_WORKBENCH.Config; ueElConfig: UE_EL_OPTIONS }
    ): Promise<void> {
        this.store.startPageLoading("workbench");
        this.showLoading();

        const remote = await this.workbenchCreatorChannel!.remote;
        const workbenchConfig = param.workbenchConfig;

        this.store.setWorkbenchConfig(workbenchConfig);
        this.store.setWorkbenchState(workbenchConfig.workbenchState);

        if (
            workbenchConfig.workbenchState === "entry" ||
            workbenchConfig.workbenchState === "editing" ||
            workbenchConfig.workbenchState === "preview"
        ) {
            const pageData = await remote.getEditorPageData().then(
                (pageData) => pageData,
                (err) => {
                    this.handleError(err);
                    return "";
                }
            );

            this.store.setOriginalPageData({ data: pageData });

            switch (workbenchConfig.workbenchState) {
                case "editing":
                    this.store.setCurrentEditorPageData({ data: pageData });
                    break;
                case "preview":
                    this.store.setCurrentPreviewPageData({ data: pageData });
                    break;
                default:
                    console.error("Unknown workbench state", workbenchConfig.workbenchState);
                    break;
            }
        }

        // TASK: 完成后将这个注释掉
        // eslint-disable-next-line
        console.log("config", workbenchConfig);

        // #region 渲染工作台应用

        app.provide(UeBuilderWorkbenchBaseKey, this);
        app.use(i18n);
        app.use(pinia);
        app.use(UeEl, param.ueElConfig);
        app.mount(this.rootDom);

        // #endregion

        this.UeBuilderWorkbenchApp = app;
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
        this.workbenchCreatorChannel?.destroy();
    }
}
