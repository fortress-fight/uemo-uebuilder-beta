// #region 样式文件

import "./assets/style";

// #endregion

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { guid } from "@stone/uemo-editor-utils/lib/guid";
import { axios } from "@stone/uemo-editor-utils/lib/axios";
import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { UeError } from "@stone/uemo-editor-utils/lib/error";
import queryString from "@stone/uemo-editor-utils/lib/query-string";

import pk from "~/package.json";
import { CreatorWorkbenchChannel } from "../utils/frame-channel";

export const VERSION = "v" + pk.version;

/**
 * UeBuilder 创建器基类
 * @class UeBuilderCreatorBase
 * @description 负责管理和创建 UeBuilder 工作台实例
 */
export class UeBuilderCreatorBase {
    public eventBus = mitt();

    static utils = { queryString, axios, UeError };

    /** 存储所有实例的 Map，用于单例管理 */
    private static readonly MAP_INSTANCE = new Map<HTMLElement, UeBuilderCreatorBase>();

    /** iframe 实例 */
    public workbenchFrame?: HTMLIFrameElement;

    /** 初始化状态标志 */
    public initialized = false;

    /** 实例唯一标识 */
    public readonly GUID: string = guid();

    /**
     * 获取应用主路径
     * @returns {string} 标准化后的应用路径
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
     */
    private get UEBUILDER_WORKBENCH_URL(): string {
        const queryParams = new URLSearchParams({ id: this.GUID });
        return `${this.UEBUILDER_PATH}uebuilder-workbench/index.html?${queryParams}`;
    }

    /**
     * 获取 URL 查询参数
     * @returns {Record<string, any>} 查询参数对象
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

    /**
     * 构造函数
     * @param {HTMLElement} rootDom - 根 DOM 元素
     * @param {UE_BUILDER_CREATOR.InitParams} option - 初始化参数
     */
    constructor(
        public readonly rootDom: HTMLElement,
        public readonly option: UE_BUILDER_CREATOR.InitParams
    ) {
        // 单例模式实现
        const existingInstance = UeBuilderCreatorBase.MAP_INSTANCE.get(rootDom);
        if (existingInstance) {
            return existingInstance;
        }

        UeBuilderCreatorBase.MAP_INSTANCE.set(rootDom, this);
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

        const frame = $(`
            <iframe
                id="UEBUILDER-${this.GUID}"
                class="uebuilder-workbench"
                src="${this.UEBUILDER_WORKBENCH_URL}"
            ></iframe>
        `).appendTo(this.rootDom) as JQuery<HTMLIFrameElement>;

        this.workbenchFrame = frame[0];
        this.initialized = true;

        this.initializeMessageChannel().catch((err) => {
            console.error(err);
        });

        return this;
    }

    /**
     * 初始化消息通道
     * @private
     */
    creatorWorkbenchChannel: CreatorWorkbenchChannel | null = null;
    initializeMessageChannel(): Promise<void> {
        if (!this.workbenchFrame?.contentWindow) return Promise.resolve();

        CreatorWorkbenchChannel.creator = this;
        this.creatorWorkbenchChannel = CreatorWorkbenchChannel.getInstance(this.workbenchFrame?.contentWindow);

        return Promise.resolve();
    }

    /**
     * 启动工作台
     * @private
     */
    public launchWorkbench(): void {
        this.creatorWorkbenchChannel!.remote.then((remote) => {
            return remote.launchWorkbench({
                version: VERSION,
                workbenchPath: this.option.appPath,
                workbenchType: this.option.appType,
                workbenchState: this.urlQueryData.type || this.option.appState || "entry",
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    /**
     * 获取页面数据
     * @returns
     */
    public getEditorPageData(): Promise<string> {
        const getEditorPageData =
            this.option.getPageData ||
            (() => Promise.reject(new UeError("WARNING:UEBUILDER_CREATOR", { message: "缺少获取页面数据的方法" })));

        return getEditorPageData().then((res) => this.pageDataPreprocessing(res));
    }

    /**
     * 修改 frame 尺寸
     * @param {boolean} [isFullSize] - 是否全屏
     * @throws {Error} 如果 frame 未初始化
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
     * 重置工作台尺寸
     */
    public workbenchUnload() {
        // eslint-disable-next-line no-console
        console.log("workbenchUnload");
    }

    /**
     * 工作台状态改变
     * @description 如果当前状态与工作台状态不一致，则修改浏览器的历史记录，去除 queryString
     * @param state
     */
    public workbenchStateChanged(state: UE_BUILDER.State) {
        const currentState = this.urlQueryData.type;
        if (currentState && currentState !== state) {
            history.pushState(null, "", location.origin + location.pathname);
        }
    }

    /**
     * 刷新工作台
     */
    public refreshWorkbench(): void {
        this.workbenchFrame?.contentWindow?.location.reload();
    }

    // #region 页面数据相关

    /**
     * 数据预处理
     * @param encodeString 加密后的数据
     * @returns
     */
    protected async pageDataPreprocessing(encodeString: string) {
        const pageDataPreprocessingConfig = this.option.pageDataPreprocessing;
        if (!encodeString || !pageDataPreprocessingConfig) return encodeString;

        try {
            const remote = await this.creatorWorkbenchChannel!.remote;
            let result = await remote.decodePageData(encodeString);

            pageDataPreprocessingConfig?.forEach((item) => {
                switch (item.type) {
                    case "replaceString":
                        result = result.replace(new RegExp(item.rule, "g"), item.data);
                        break;
                    default:
                        break;
                }
            });

            return await remote.encodePageData(result);
        } catch (error) {
            console.error(error);
            return encodeString;
        }
    }

    /**
     * 保存数据预处理
     * @param encodeString 加密后的数据
     * @returns
     */
    protected async savePagePreprocessing(encodeString: string) {
        const savePagePreprocessingConfig = this.option.savePagePreprocessing;
        if (!encodeString || !savePagePreprocessingConfig) return encodeString;

        try {
            const remote = await this.creatorWorkbenchChannel!.remote;
            let result = await remote.decodePageData(encodeString);

            savePagePreprocessingConfig.forEach((item) => {
                switch (item.type) {
                    case "replaceString":
                        result = result.replace(new RegExp(item.rule, "g"), item.data);
                        break;
                    default:
                        break;
                }
            });

            return await remote.encodePageData(result);
        } catch (error) {
            console.error(error);
            return encodeString;
        }
    }

    // #endregion

    /**
     * 销毁实例
     * @description 清理资源并移除实例引用
     */
    public destroy(): void {
        this.initialized = false;

        this.creatorWorkbenchChannel?.destroy();

        if (this.workbenchFrame) {
            $(this.workbenchFrame).remove();
            this.workbenchFrame = undefined;
        }

        UeBuilderCreatorBase.MAP_INSTANCE.delete(this.rootDom);
    }
}
