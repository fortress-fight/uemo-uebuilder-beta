/*
 * @Description: 文件上传插件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 13:15:39
 */
import type { App } from "vue";

/**
 * Vue3 插件安装方法，将全局属性挂载到 app.config.globalProperties
 * @param {App} app - Vue3 应用实例
 * @param {PluginOptions} param - 插件配置参数
 */
export function install(app: App, param: UE_PLUGIN_OPTIONS.FileUpload) {
    app.config.globalProperties.$ueFileUpload = param.uploadHandler;
}
