import type { App } from "vue";

// 重构：使用箭头函数实现缓存包装函数
const createCachedFn = <T>(fn: () => Promise<T>): (() => Promise<T>) => {
    let cache: T;
    let isCached = false;
    return async () => {
        if (isCached) return cache;
        cache = await fn();
        isCached = true;

        return cache;
    };
};

/**
 * Vue3 插件安装方法，将全局属性挂载到 app.config.globalProperties
 * @param {App} app - Vue3 应用实例
 * @param {PluginOptions} param - 插件配置参数
 */
export function install(app: App, param: UE_PLUGIN_OPTIONS.Resource) {
    app.config.globalProperties.$ueElResource = {
        shapeLibrary: param.shapeLibrary,
        splineLibrary: param.splineLibrary,
        lottieLibrary: param.lottieLibrary,
        videoLibrary: param.videoLibrary,
        getTextDecorationLibrary: createCachedFn(param.getTextDecorationLibrary),
        shareIconLibrary: param.shareIconLibrary,
    };
}
