/*
 * @Description: UeBuilderEditorFactory 编辑器控制面板
 * @Author: F-Stone
 * @LastEditTime: 2025-09-15 00:14:16
 */
import type { UE_EL_OPTIONS } from "@stone/uemo-editor-element/src";

import { createApp } from "vue";

import UeEl from "@stone/uemo-editor-element/src";
import { getUeElementConfig } from "@stone/uebuilder-utils/src/get-ue-element-config";

import { i18n } from "../plugin/i18n";
import UebuilderEditorFactoryApp from "../App.vue";
import { pinia, useUeBuilderEditorFactoryStore } from "../store";
import { EditorFactoryWorkbenchChannel } from "./frame-channel";
import { UebuilderEditorFactoryKey } from "../plugin/injection-key";

window.name = "UEBUILDER_EDITOR_FACTORY";

/**
 * UeBuilderFactory 编辑器控制面板
 * @class UebuilderEditorFactoryBase
 * @description 负责管理和创建 UeBuilderEditorFactory 编辑器控制面板实例
 */
export class UebuilderEditorFactory {
    /** 初始化状态标志 */
    public initialized = false;

    protected store = useUeBuilderEditorFactoryStore(pinia);

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
                launchEditorFactory: (data, config) => {
                    return this.launchEditorFactory(data, config);
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

    launchEditorFactory(editorData: { title?: string; data: string }, config: UE_BUILDER_EDITOR_FACTORY.Config) {
        const storehouseApp = createApp(UebuilderEditorFactoryApp);
        storehouseApp.provide(UebuilderEditorFactoryKey, this);

        this.store.setEditorFactoryData(editorData);

        this.renderEditorFactory(storehouseApp, {
            editorFactoryConfig: config,
            ueElConfig: getUeElementConfig(config.uploadConfig, config.resourceConfig),
        });
        return Promise.resolve();
    }

    public renderEditorFactory(
        app: ReturnType<typeof createApp>,
        param: { editorFactoryConfig: UE_BUILDER_EDITOR_FACTORY.Config; ueElConfig: UE_EL_OPTIONS }
    ): void {
        this.store.setEditorFactoryConfig(param.editorFactoryConfig);

        // #region 渲染工作台应用

        app.provide(UebuilderEditorFactoryKey, this);
        app.use(i18n);
        app.use(pinia);
        app.use(UeEl, param.ueElConfig);
        app.mount(this.rootDom);

        // #endregion
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
