import $ from "@stone/uemo-editor-utils/lib/jquery";

import { CounterNumberEventEventBus } from "./utils/event-bus";
import { initCounterNumber } from "./utils/init-counter-number";

export type UeCounterNumberFactoryParams = {
    scroller?: HTMLElement;
};

class UeCounterNumberFactory {
    /** 标记工厂是否已初始化 */
    private initialized = false;

    /** 存储DOM元素及其参数的映射 */
    private doms = new Map<HTMLElement, UeCounterNumberFactoryParams>();

    /** 用于监听元素大小变化的观察器 */
    private resizeObserver: ResizeObserver | null = null;

    /**
     * 创建计数器工厂实例
     * @param params - 工厂参数，包含滚动容器配置
     */
    constructor(private params: UeCounterNumberFactoryParams) {
        this.init();
    }

    /**
     * 初始化工厂实例，绑定必要的事件监听
     */
    init() {
        this.bindEvent();
        this.initialized = true;
    }

    /**
     * 绑定事件监听器
     * 包括元素大小变化、可见性变化和窗口大小变化的事件监听
     */
    bindEvent() {
        //
    }

    /**
     * 更新工厂的默认参数
     * @param params - 新的工厂参数
     */
    updateDefaultParams(params: UeCounterNumberFactoryParams) {
        this.params = params;
    }

    /**
     * 创建新的计数器工厂实例
     * @param params - 工厂参数
     * @returns 新的 UeCounterNumberFactory 实例
     */
    create(params: UeCounterNumberFactoryParams) {
        return new UeCounterNumberFactory(params);
    }

    /**
     * 初始化多个元素的计数器效果
     * @param doms - 目标DOM元素数组
     * @param params - 初始化参数
     * @returns 包含销毁方法的对象
     */
    initCounterNumber(doms: HTMLElement[], params: UeCounterNumberFactoryParams) {
        if (!this.initialized) {
            this.init();
        }

        doms.forEach((dom) => {
            if (this.doms.has(dom)) return;

            initCounterNumber(dom, { scroller: this.params.scroller, ...params }).catch((error) => {
                console.error(error);
            });

            this.resizeObserver?.observe(dom);
            this.doms.set(dom, params);
        });
        return {
            kill: () => {
                this.destroy(doms);
            },
        };
    }

    /**
     * 更新多个元素的计数器效果
     * @param doms - 目标DOM元素数组
     * @param force - 是否强制重新初始化
     */
    updateCounterNumber(doms: HTMLElement[], force = false) {
        if (force) {
            doms.forEach((dom) => {
                const domParams = this.doms.get(dom);
                if (!domParams) {
                    console.warn("No params found for element");
                    return;
                }

                // 深拷贝参数
                const lastDomParams = { ...domParams };

                // 销毁当前效果（包含事件清理）
                this.destroy([dom]);

                // 确保实例存在
                if (!this.initialized) {
                    this.init();
                }

                // 重新初始化效果
                this.initCounterNumber([dom], lastDomParams);
            });
        } else {
            doms.forEach((dom) => {
                CounterNumberEventEventBus.emit($(dom), "ue.counter-number.update");
            });
        }
    }

    /**
     * 销毁所有计数器效果和工厂实例
     */
    private destroyInstance() {
        this.removeEvent();
        this.initialized = false;
    }

    /**
     * 移除所有事件监听器
     */
    private removeEvent() {
        this.resizeObserver?.disconnect();
        $(window).off("resize.counter-number-factory");
    }

    /**
     * 销毁多个元素的计数器效果
     * @param doms - 目标DOM元素数组，如果不提供则销毁所有元素
     */
    destroy(doms: HTMLElement[] = Array.from(this.doms.keys())) {
        doms.forEach((dom) => {
            this.resizeObserver?.unobserve(dom);
            this.doms.delete(dom);

            CounterNumberEventEventBus.emit($(dom), "ue.counter-number.destroy");
            CounterNumberEventEventBus.clear($(dom));
        });

        if (this.doms.size === 0) {
            this.destroyInstance();
        }
    }
}

const ueCounterNumber = new UeCounterNumberFactory({});

export { ueCounterNumber };
