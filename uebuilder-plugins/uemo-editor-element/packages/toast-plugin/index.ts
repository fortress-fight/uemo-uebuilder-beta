/*
 * @Description: toast 插件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 12:44:55
 */
import type { App } from "vue";
import type { PluginOptions } from "@stone/uemo-editor-utils/lib/vue-toastification";

import { createToastInterface } from "@stone/uemo-editor-utils/lib/vue-toastification";

// 更新 TYPE_TOAST 定义
export type TYPE_TOAST = ReturnType<typeof createToastInterface>;

const defaultParam: PluginOptions = {
    position: "bottom-center" as PluginOptions["position"],
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    rtl: false,
    transition: "Vue-Toastification__custom",
    maxToasts: 3,
    newestOnTop: true,
};

/**
 * Vue3 插件安装方法，将全局属性挂载到 app.config.globalProperties
 * @param {App} app - Vue3 应用实例
 * @param {PluginOptions} param - 插件配置参数
 */
export function install(app: App, param: PluginOptions = {}) {
    const toast = createToastInterface({ ...defaultParam, ...param });
    app.config.globalProperties.$ueElToast = toast;
}
