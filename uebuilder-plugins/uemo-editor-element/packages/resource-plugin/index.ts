import type { App } from "vue";

/**
 * 创建资源缓存包装器
 * @template T 资源类型，必须符合 ResourceValue 接口
 * @param {T} param 原始资源对象
 * @returns {T} 包含缓存功能的资源对象
 * @description
 * 利用 Promise 状态不可变的特性实现数据缓存：
 * 1. 首次调用 getData 时创建 Promise 并缓存
 * 2. 后续调用直接返回缓存的 Promise
 * 3. 如果 Promise 失败，清除缓存以便下次重试
 */
const createCache = <T extends UE_PLUGIN_OPTIONS.ResourceValue<any>>(param: T): T => {
    /** @type {Promise<any> | null} 缓存的 Promise 实例 */
    let cachedPromise: Promise<any> | null = null;

    const result = { ...param };

    // 重写getData方法以实现缓存
    result.getData = () => {
        if (!cachedPromise) {
            cachedPromise = param.getData().catch((err) => {
                cachedPromise = null;
                console.error(err);
                throw err; // 重新抛出错误以保持原始行为
            });
        }
        return cachedPromise;
    };

    return result;
};

/**
 * Vue3 插件安装方法，将全局属性挂载到 app.config.globalProperties
 * @param {App} app - Vue3 应用实例
 * @param {UE_PLUGIN_OPTIONS.Resource} param - 包含各类资源库配置的插件参数
 * @description 为每个资源库创建缓存包装，优化数据加载性能
 */
export function install(app: App, param: UE_PLUGIN_OPTIONS.Resource) {
    app.config.globalProperties.$ueElResource = {
        shapeLibrary: createCache(param.shapeLibrary),
        splineLibrary: createCache(param.splineLibrary),
        lottieLibrary: createCache(param.lottieLibrary),
        videoLibrary: createCache(param.videoLibrary),
        imageLibrary: createCache(param.imageLibrary),
        textDecorationLibrary: createCache(param.textDecorationLibrary),
        shareIconLibrary: createCache(param.shareIconLibrary),
    };
}
