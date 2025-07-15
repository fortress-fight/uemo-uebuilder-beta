import $ from "@stone/uemo-editor-utils/lib/jquery";

import { LoopTextEventEventBus } from "./utils/event-bus";
import { initLoopText } from "./utils/init-loop-text";

export type UeLoopTextFactoryParams = {
    scroller?: HTMLElement;
    /** 是否启用可见性检测（默认true） */
    enableVisibilityCheck?: boolean;
    /** 可见性检测的阈值（0-1，默认0.1） */
    visibilityThreshold?: number;
    /** 延迟时间（秒，默认2.4） */
    delay?: number;
};

class UeLoopTextFactory {
    /** 标记工厂是否已初始化 */
    public initialized = false;

    /** 存储DOM元素及其参数的映射 */
    private doms = new Map<HTMLElement, UeLoopTextFactoryParams>();

    /** 用于监听元素大小变化的观察器 */
    private resizeObserver: ResizeObserver | null = null;

    /**
     * 创建计数器工厂实例
     * @param params - 工厂参数，包含滚动容器配置
     */
    constructor(private params: UeLoopTextFactoryParams) {
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
     * 检查DOM是否存在
     * @param dom - 要检查的DOM元素
     * @returns 是否存在
     */
    checkDom(dom: HTMLElement) {
        return this.doms.has(dom);
    }

    /**
     * 更新工厂的默认参数
     * @param params - 新的工厂参数
     */
    updateDefaultParams(params: UeLoopTextFactoryParams) {
        this.params = params;
    }

    /**
     * 创建新的计数器工厂实例
     * @param params - 工厂参数
     * @returns 新的 UeCounterNumberFactory 实例
     */
    create(params: UeLoopTextFactoryParams) {
        return new UeLoopTextFactory(params);
    }

    /**
     * 初始化多个元素的计数器效果
     * @param doms - 目标DOM元素数组
     * @param params - 初始化参数
     * @returns 包含销毁方法的对象
     */
    initLoopText(doms: HTMLElement[], params: UeLoopTextFactoryParams) {
        if (!this.initialized) {
            this.init();
        }

        doms.forEach((dom) => {
            if (this.doms.has(dom)) return;

            initLoopText(dom, { scroller: this.params.scroller, ...params }).catch((error) => {
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
    updateLoopText(doms: HTMLElement[], force = false) {
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
                this.initLoopText([dom], lastDomParams);
            });
        } else {
            doms.forEach((dom) => {
                LoopTextEventEventBus.emit($(dom), "ue.loop-text.update");
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
        $(window).off("resize.loop-text-factory");
    }

    /**
     * 销毁多个元素的计数器效果
     * @param doms - 目标DOM元素数组，如果不提供则销毁所有元素
     */
    destroy(doms: HTMLElement[] = Array.from(this.doms.keys())) {
        doms.forEach((dom) => {
            this.resizeObserver?.unobserve(dom);
            this.doms.delete(dom);

            LoopTextEventEventBus.emit($(dom), "ue.loop-text.destroy");
            LoopTextEventEventBus.clear($(dom));
        });

        if (this.doms.size === 0) {
            this.destroyInstance();
        }
    }
}

const ueLoopText = new UeLoopTextFactory({});

export { ueLoopText };
