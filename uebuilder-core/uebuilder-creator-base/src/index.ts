// #region 依赖导入
import $ from "@stone/uemo-editor-utils/lib/jquery";
import { guid } from "@stone/uemo-editor-utils/lib/guid";
import { axios } from "@stone/uemo-editor-utils/lib/axios";
import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { UeError } from "@stone/uemo-editor-utils/lib/error";
import queryString from "@stone/uemo-editor-utils/lib/query-string";

import pk from "~/package.json";
import { CreatorWorkbenchChannel } from "./utils/frame-channel";

// #region 样式导入
import "./assets/style";
// #endregion

// #endregion

// #region 常量定义
export const VERSION = "v" + pk.version;
// #endregion

/**
 * UeBuilder 创建器基类
 * @class UeBuilderCreatorBase
 * @description 负责管理和创建 UeBuilder 工作台实例，提供工作台的生命周期管理和数据处理功能
 */
export class UeBuilderCreatorBase {
    // #region 静态属性和方法
    /** 工具类集合 */
    public static readonly utils = { queryString, axios, UeError };

    /** 存储所有实例的 Map，用于单例管理 */
    private static readonly MAP_INSTANCE = new Map<HTMLElement, UeBuilderCreatorBase>();
    // #endregion

    // #region 实例属性
    /** 事件总线 */
    public readonly eventBus = mitt();

    /** iframe 实例 */
    public workbenchFrame?: HTMLIFrameElement;

    /** 初始化状态标志 */
    public initialized = false;

    /** 实例唯一标识 */
    public readonly GUID: string = guid();

    /** 工作台通信通道 */
    private creatorWorkbenchChannel: CreatorWorkbenchChannel | null = null;
    // #endregion

    // #region Getter 方法
    /**
     * 获取应用主路径
     * @returns {string} 标准化后的应用路径
     * @private
     */
    private get UEBUILDER_PATH(): string {
        let appPath = this.option.appPath || "/";

        if (!/^https?:\/\//.test(appPath)) {
            appPath = window.location.origin + appPath;
            if (!appPath.endsWith("/")) {
                appPath += "/";
            }
        }

        return appPath;
    }

    /**
     * 获取工作台 URL
     * @returns {string} 完整的工作台 URL，包含必要的查询参数
     * @private
     */
    private get UEBUILDER_WORKBENCH_URL(): string {
        const queryParams = new URLSearchParams({ id: this.GUID });
        return `${this.UEBUILDER_PATH}uebuilder-workbench/index.html?${queryParams}`;
    }

    /**
     * 获取 URL 查询参数
     * @returns {Record<string, UE_BUILDER.State>} 查询参数对象
     * @public
     */
    public get urlQueryData(): { type?: UE_BUILDER.State } {
        const data: { type?: UE_BUILDER.State } = queryString.parse(window.location.search);

        // FIXME: 旧定义中的 editor 类型，需要转换为 editing
        // @ts-expect-error
        if (data.type === "editor") {
            data.type = "editing";
        }

        return data;
    }
    // #endregion

    /**
     * 构造函数 - 实现单例模式
     * @param {HTMLElement} rootDom - 根 DOM 元素
     * @param {UE_BUILDER_CREATOR.InitParams} option - 初始化参数
     */
    constructor(
        public readonly rootDom: HTMLElement,
        public readonly option: UE_BUILDER_CREATOR.InitParams
    ) {
        const existingInstance = UeBuilderCreatorBase.MAP_INSTANCE.get(rootDom);
        if (existingInstance) {
            return existingInstance;
        }

        UeBuilderCreatorBase.MAP_INSTANCE.set(rootDom, this);
    }

    // #region 生命周期方法
    /**
     * 初始化工作台
     * @returns {this} 当前实例
     * @throws {UeError} 如果重复初始化
     * @public
     */
    public init(): this {
        if (this.initialized) {
            return this;
        }

        const frame = $(`
            <iframe
                id="UEBUILDER-${this.GUID}"
                class="uebuilder-workbench"
                src="${this.UEBUILDER_WORKBENCH_URL}"
                data-size="${this.option.appSize || "normal"}"
            ></iframe>
        `).appendTo(this.rootDom) as JQuery<HTMLIFrameElement>;

        this.workbenchFrame = frame[0];
        this.initialized = true;

        this.initializeMessageChannel().catch(console.error);

        return this;
    }

    /**
     * 初始化消息通道
     * @returns {Promise<void>}
     * @private
     */
    private initializeMessageChannel(): Promise<void> {
        if (!this.workbenchFrame?.contentWindow) return Promise.resolve();

        this.creatorWorkbenchChannel = CreatorWorkbenchChannel.getInstance(this.workbenchFrame.contentWindow, {
            on: {
                launchWorkbench: () => {
                    this.launchWorkbench();
                },
                workbenchUnload: () => {
                    this.workbenchUnload();
                },
                changeWorkbenchSize: (isFullSize: boolean) => {
                    this.changeWorkbenchSize(isFullSize);
                },
                workbenchStateChanged: (state: UE_BUILDER.State) => {
                    this.workbenchStateChanged(state);
                },
                getEditorPageData: () => {
                    return this.getEditorPageData();
                },
            },
        });

        return Promise.resolve();
    }

    /**
     * 启动工作台
     * @public
     */
    public launchWorkbench(): void {
        this.creatorWorkbenchChannel?.remote
            .then((remote) => {
                return remote.launchWorkbench({
                    version: VERSION,
                    workbenchPath: this.option.appPath,
                    workbenchType: this.option.appType,
                    workbenchState: this.urlQueryData.type || this.option.appState || "entry",
                    workbenchUpload: this.option.appUpload,
                    workbenchResource: this.option.appResource,
                });
            })
            .catch(console.error);
    }

    /**
     * 销毁实例
     * @description 清理资源并移除实例引用
     * @public
     */
    public destroy(): void {
        this.initialized = false;

        // 清理通信通道
        this.creatorWorkbenchChannel?.destroy();

        // 移除 iframe
        if (this.workbenchFrame) {
            $(this.workbenchFrame).remove();
            this.workbenchFrame = undefined;
        }

        // 清理事件总线
        this.eventBus.all.clear();

        // 从实例映射中移除
        UeBuilderCreatorBase.MAP_INSTANCE.delete(this.rootDom);
    }
    // #endregion

    // #region 数据处理方法
    /**
     * 获取页面数据
     * @returns {Promise<string>} 处理后的页面数据
     * @public
     */
    public getEditorPageData(): Promise<string> {
        const getEditorPageData =
            this.option.getPageData ||
            (() => Promise.reject(new UeError("WARNING:UEBUILDER_CREATOR", { message: "缺少获取页面数据的方法" })));

        return getEditorPageData().then((res) => this.pageDataPreprocessing(res));
    }

    /**
     * 数据预处理
     * @param {string} encodeString - 加密后的数据
     * @returns {Promise<string>} 处理后的数据
     * @protected
     */
    protected async pageDataPreprocessing(encodeString: string): Promise<string> {
        if (!this.option.pageDataPreprocessing) return encodeString;
        if (!encodeString) return "";

        try {
            const remote = await this.creatorWorkbenchChannel?.remote;
            if (!remote) throw new Error("Remote channel not initialized");

            let result = await remote.decodePageData(encodeString);

            this.option.pageDataPreprocessing.forEach((item) => {
                if (item.type === "replaceString") {
                    result = result.replace(new RegExp(item.rule, "g"), item.data);
                }
            });

            return await remote.encodePageData(result);
        } catch (error) {
            console.error("Page data preprocessing failed:", error);
            return encodeString;
        }
    }

    /**
     * 保存数据预处理
     * @param {string} encodeString - 加密后的数据
     * @returns {Promise<string>} 处理后的数据
     * @protected
     */
    protected async savePagePreprocessing(encodeString: string): Promise<string> {
        if (!encodeString || !this.option.savePagePreprocessing) return encodeString;

        try {
            const remote = await this.creatorWorkbenchChannel?.remote;
            if (!remote) throw new Error("Remote channel not initialized");

            let result = await remote.decodePageData(encodeString);

            this.option.savePagePreprocessing.forEach((item) => {
                if (item.type === "replaceString") {
                    result = result.replace(new RegExp(item.rule, "g"), item.data);
                }
            });

            return await remote.encodePageData(result);
        } catch (error) {
            console.error("Save page preprocessing failed:", error);
            return encodeString;
        }
    }
    // #endregion

    // #region 工作台状态管理
    /**
     * 修改工作台尺寸
     * @param {boolean} [isFullSize] - 是否全屏
     * @throws {UeError} 如果工作台未初始化
     * @public
     */
    public changeWorkbenchSize(isFullSize?: boolean): void {
        if (!this.workbenchFrame) {
            throw new UeError("WARNING:UEBUILDER_CREATOR", {
                message: "App 还未初始化，无法修改 App 尺寸",
            });
        }
        $(this.workbenchFrame).attr("data-size", isFullSize ? "fullscreen" : "");
    }

    /**
     * 工作台状态改变处理
     * @param {UE_BUILDER.State} state - 新状态
     * @public
     */
    public workbenchStateChanged(state: UE_BUILDER.State): void {
        const currentState = this.urlQueryData.type;
        if (currentState && currentState !== state) {
            history.pushState(null, "", location.origin + location.pathname);
        }
    }

    /**
     * 刷新工作台
     * @public
     */
    public refreshWorkbench(): void {
        this.workbenchFrame?.contentWindow?.location.reload();
    }

    /**
     * 工作台卸载处理
     * @public
     */
    public workbenchUnload(): void {
        console.warn("workbenchUnload");
    }
    // #endregion
}
