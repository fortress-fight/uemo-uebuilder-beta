import type { UeScrollEffectFactoryDomParams } from "./utils/helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

import { initScrollEffect } from "./utils/scroll-effect";
import { ScrollEffectEventEventBus } from "./utils/event-bus";

/**
 * 滚动效果工厂参数接口
 */
type UeScrollEffectFactoryParams = {
    /** 滚动容器元素 */
    scroller?: HTMLElement;
    /** 是否开启调试模式 */
    debugger?: boolean;
};

/**
 * 滚动效果工厂类
 * 用于管理和创建滚动效果，采用单例模式
 * 负责处理滚动效果的初始化、更新和销毁，以及相关事件监听
 */
class UeScrollEffectFactory {
    /** 标记工厂是否已初始化 */
    private initialized = false;

    /** 存储DOM元素及其参数的映射 */
    private doms = new Map<HTMLElement, UeScrollEffectFactoryDomParams>();

    /** 用于监听元素大小变化的观察器 */
    private resizeObserver: ResizeObserver | null = null;

    /**
     * 创建滚动效果工厂实例
     * @param params - 工厂参数，包含滚动容器和调试模式配置
     */
    constructor(private params: UeScrollEffectFactoryParams) {
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
        this.resizeObserver = new ResizeObserver(
            _debounce((targets) => {
                targets.forEach(({ target }: { target: HTMLElement }) => {
                    ScrollEffectEventEventBus.emit($(target), "ue.scroll-effect.resize");
                });
            }, 200)
        );

        $(window).on("resize.scroll-effect-factory", () => {
            ScrollEffectEventEventBus.emit($(window), "ue.scroll-effect.window-resize");
        });
    }

    /**
     * 更新工厂的默认参数
     * @param params - 新的工厂参数
     */
    updateDefaultParams(params: UeScrollEffectFactoryParams) {
        this.params = params;
    }

    /**
     * 创建新的滚动效果工厂实例
     * @param params - 工厂参数
     * @returns 新的 UeScrollEffectFactory 实例
     */
    create(params: UeScrollEffectFactoryParams) {
        return new UeScrollEffectFactory(params);
    }

    /**
     * 初始化多个元素的滚动效果
     * @param doms - 目标DOM元素数组
     * @param params - 初始化参数
     * @returns 包含销毁方法的对象
     */
    initScrollEffect(doms: HTMLElement[], params: UeScrollEffectFactoryDomParams) {
        if (!this.initialized) {
            this.init();
        }

        doms.forEach((dom) => {
            if (this.doms.has(dom)) return;

            initScrollEffect(dom, { scroller: this.params.scroller, ...params });

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
     * 更新多个元素的滚动效果
     * @param doms - 目标DOM元素数组
     * @param force - 是否强制重新初始化
     */
    updateScrollEffect(doms: HTMLElement[], force = false) {
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
                this.initScrollEffect([dom], lastDomParams);
            });
        } else {
            doms.forEach((dom) => {
                ScrollEffectEventEventBus.emit($(dom), "ue.scroll-effect.update");
            });
        }
    }

    /**
     * 销毁所有滚动效果和工厂实例
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
        $(window).off("resize.scroll-effect-factory");
    }

    /**
     * 销毁多个元素的滚动效果
     * @param doms - 目标DOM元素数组，如果不提供则销毁所有元素
     */
    destroy(doms: HTMLElement[] = Array.from(this.doms.keys())) {
        doms.forEach((dom) => {
            this.resizeObserver?.unobserve(dom);
            this.doms.delete(dom);

            ScrollEffectEventEventBus.emit($(dom), "ue.scroll-effect.destroy");
            ScrollEffectEventEventBus.clear($(dom));
        });

        if (this.doms.size === 0) {
            this.destroyInstance();
        }
    }
}

const ueScrollEffect = new UeScrollEffectFactory({});

export { ueScrollEffect };
