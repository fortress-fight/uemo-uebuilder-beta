import { createApp } from "vue";
import { UeBuilderWorkbenchBase } from "@stone/uebuilder-workbench-base/src";
import { getUeElementConfig } from "@stone/uebuilder-utils/src/get-ue-element-config";

import { AxiosUemoTools, UemoAPIError } from "@/api";
import { UeBuilderWorkbenchKey } from "@/plugin/injection-key";
import UebuilderToolsWorkbench from "@/components/Workbench.vue";
import { LoginManager } from "@/utils/login-manager";

import { i18n } from "../i18n";

/**
 * UeBuilder 工作台实现类
 * @extends {UeBuilderWorkbenchBase}
 */
export class UeBuilderWorkbench extends UeBuilderWorkbenchBase {
    /** 工作台名称 */
    readonly name = "uebuilder-workbench--tools";

    /** 登录管理器 */
    private readonly loginManager: LoginManager;

    constructor(dom: HTMLElement, option: UE_BUILDER_WORKBENCH.InitParams) {
        super(dom, option);
        this.loginManager = new LoginManager();
        this.initializeAxiosInterceptors();
    }

    /**
     * 初始化 Axios 拦截器
     * @private
     */
    private initializeAxiosInterceptors(): void {
        AxiosUemoTools.interceptors.response.use(
            (response) => response,
            (error: unknown) => {
                if (error instanceof UemoAPIError && error.code === 998) {
                    this.loginManager.checkLogin();
                }
                return Promise.reject(error instanceof Error ? error : new Error("Unknown error"));
            }
        );
    }

    /**
     * 启动工作台
     * @param {UE_BUILDER_WORKBENCH.Config} config - 工作台配置
     */
    launchWorkbench(config: UE_BUILDER_WORKBENCH.Config): void {
        void this.loginManager
            .updateUserInfo()
            .finally(() => {
                const workbenchApp = createApp(UebuilderToolsWorkbench);
                workbenchApp.provide(UeBuilderWorkbenchKey, this);

                void this.renderWorkbench(workbenchApp, {
                    workbenchConfig: config,
                    ueElConfig: getUeElementConfig(config.workbenchUpload, config.workbenchResource),
                }).catch(() => {
                    const error = new UeBuilderWorkbench.utils.UeError("WARNING:UEBUILDER_WORKBENCH", {
                        message: i18n.global.t("lunchWorkbenchFailed"),
                    });
                    void this.handleError(error);
                });
            })
            .catch((error) => {
                if (!(error instanceof UemoAPIError && error.code === 998)) {
                    this.handleError(error);
                }
            });
    }

    /**
     * 检查登录状态
     */
    checkLoginStatus() {
        this.loginManager.checkLogin();
    }
}

/**
 * 创建 UeBuilder 工作台实例
 * @param {HTMLElement} dom - 根 DOM 元素
 * @param {UE_BUILDER_WORKBENCH.InitParams} option - 初始化参数
 * @returns {UeBuilderWorkbench} 工作台实例
 */
export function createUeBuilderWorkbench(dom: HTMLElement, option: UE_BUILDER_WORKBENCH.InitParams) {
    return new UeBuilderWorkbench(dom, option);
}
