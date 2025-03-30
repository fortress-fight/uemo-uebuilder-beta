/*
 * @Description: 文件上传插件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-14 01:18:54
 */
import type { App } from "vue";

import { transferUploadConfig } from "./utils/helper";
import { createUploadHandler } from "./utils/upload";
import { createUploadHistoryHandler } from "./utils/upload-history";

/**
 * Vue3 插件安装方法，将全局属性挂载到 app.config.globalProperties
 * @param {App} app - Vue3 应用实例
 * @param {PluginOptions} param - 插件配置参数
 */
export function install(app: App, param: UE_PLUGIN_OPTIONS.FileUpload) {
    const useUploadHandler = param.uploadHandler || createUploadHandler;

    app.config.globalProperties.$ueFileUpload = useUploadHandler(undefined, transferUploadConfig(param.uploadConfig));

    const historyConfig = param.uploadConfig.history;
    if (
        historyConfig &&
        (historyConfig?.type === "MO005" || (historyConfig?.type === "custom" && historyConfig?.url))
    ) {
        app.config.globalProperties.$ueFileUploadHistory = createUploadHistoryHandler(undefined, historyConfig);
    }
}
