// #region 样式文件

import "../assets/style";

// #endregion

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { guid } from "@stone/uemo-editor-utils/lib/guid";
import queryString from "@stone/uemo-editor-utils/lib/query-string";

/**
 * UeBuilder 创建器基类
 * @class UeBuilderCreatorBase
 * @description 负责管理和创建 UeBuilder 工作台实例
 */
export class UeBuilderCreatorBase {
    static utils = { queryString };

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
        const queryParams = new URLSearchParams({
            id: this.GUID,
            size: this.option.initFullSize ? "fullscreen" : "",
        });
        return `${this.UEBUILDER_PATH}uebuilder-workbench/index.html?${queryParams}`;
    }

    /**
     * 获取 URL 查询参数
     * @returns {Record<string, any>} 查询参数对象
     */
    public get urlQueryData(): Record<string, any> {
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

        // TODO: 实现通讯通道相关功能
        this.initializeMessageChannel();
    }

    /**
     * 初始化消息通道
     * @private
     */
    private initializeMessageChannel(): void {
        // TODO: 创建通讯通道
        // this.toMainMsg = creatorToMainMsg(this.url);
        // TODO: 监听 app-main 的通讯通道
        // this.toMainMsg.watchAppMainContact({
        //     onContactEnd: () => {
        //         this.toMainMsg?.sendSetConfigCommand({
        //             config: this.appMainOption,
        //         });
        //         this.appMainContactCallback?.("contactEnd");
        //     },
        // });
        // TODO: 监听 app-main 的命令
        // this.watchAppMainCommand();
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
        this.changeFrameSize(this.option.initFullSize);

        return this;
    }

    /**
     * 修改 frame 尺寸
     * @param {boolean} [isFullSize] - 是否全屏
     * @throws {Error} 如果 frame 未初始化
     */
    public changeFrameSize(isFullSize?: boolean): void {
        if (!this.workbenchFrame) {
            throw new Error("App 还未初始化，无法修改 App 尺寸");
        }
        $(this.workbenchFrame).attr("data-size", isFullSize ? "fullscreen" : "");
    }

    /**
     * 刷新工作台
     */
    public refresh(): void {
        this.workbenchFrame?.contentWindow?.location.reload();
    }

    /**
     * 销毁实例
     * @description 清理资源并移除实例引用
     */
    public destroy(): void {
        if (this.workbenchFrame) {
            $(this.workbenchFrame).remove();
            this.workbenchFrame = undefined;
        }
        this.initialized = false;
        UeBuilderCreatorBase.MAP_INSTANCE.delete(this.rootDom);
    }
}
