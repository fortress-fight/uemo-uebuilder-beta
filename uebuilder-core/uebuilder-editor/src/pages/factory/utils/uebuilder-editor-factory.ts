/*
 * @Description: UeBuilderEditorFactory 编辑器控制面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-14 22:53:43
 */
import { EditorFactoryWorkbenchChannel } from "./frame-channel";

window.name = "UEBUILDER_EDITOR_FACTORY";

/**
 * UeBuilderFactory 编辑器控制面板
 * @class UebuilderEditorFactoryBase
 * @description 负责管理和创建 UeBuilderEditorFactory 编辑器控制面板实例
 */
export class UebuilderEditorFactory {
    /** 初始化状态标志 */
    public initialized = false;

    public StorehouseWorkbenchChannelCreator = EditorFactoryWorkbenchChannel;

    /**
     * 构造函数
     * @param {HTMLElement} rootDom - 根 DOM 元素
     */
    constructor(public rootDom: HTMLElement) {
        // eslint-disable-next-line
        console.log("rootDom", rootDom);
    }

    /**
     * 初始化消息通道
     * @private
     */
    public editorFactoryWorkbenchChannel: EditorFactoryWorkbenchChannel | null = null;
    async initializeMessageChannel(): Promise<void> {
        this.editorFactoryWorkbenchChannel = this.StorehouseWorkbenchChannelCreator.getInstance(window.parent, {
            on: {
                launchEditorFactory: (config) => {
                    return this.launchEditorFactory(config);
                },
            },
        });

        const remote = await this.editorFactoryWorkbenchChannel.remote;
        await remote.editorFactoryReady();

        // const info = await remote._getInfo();
        // console.log("Workbench => Editor", info);
    }

    /**
     * 初始化 app-main 插入 app-main 的 frame
     */
    init() {
        if (this.initialized) {
            return this;
        }

        this.initializeMessageChannel().catch((err) => {
            console.error(err);
        });

        return this;
    }

    launchEditorFactory(config: UE_BUILDER_EDITOR_FACTORY.Config) {
        // eslint-disable-next-line
        console.log("config", config);
        return Promise.resolve();
    }

    /**
     * 销毁 App
     */
    destroy() {
        //
    }
}

export function createUeBuilderEditorFactory(dom: HTMLElement) {
    return new UebuilderEditorFactory(dom);
}
