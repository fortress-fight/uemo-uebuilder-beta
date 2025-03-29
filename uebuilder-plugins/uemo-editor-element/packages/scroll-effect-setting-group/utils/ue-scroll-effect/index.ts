import type { UeScrollEffectFactoryDomParams } from "./utils/helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

import { ScrollEffectEventEventBus } from "./utils/event-bus";
import { initScrollEffect } from "./utils/helper";

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
 */
export class UeScrollEffectFactory {
    /** 单例实例 */
    private static instance: UeScrollEffectFactory | null;
    /** 存储DOM元素及其参数的映射 */
    private static doms = new Map<HTMLElement, UeScrollEffectFactoryDomParams>();
    /** 用于监听元素大小变化的观察器 */
    private static resizeObserver: ResizeObserver;
    /** 用于监听元素可见性的观察器 */
    private static visibleObserver: IntersectionObserver | null = null;

    /** 工厂参数 */
    private params: UeScrollEffectFactoryParams = {};

    /**
     * 创建滚动效果工厂实例
     * @param params - 工厂参数
     */
    constructor(params: UeScrollEffectFactoryParams) {
        if (UeScrollEffectFactory.instance) return UeScrollEffectFactory.instance;

        this.params = params;

        UeScrollEffectFactory.resizeObserver = new ResizeObserver(
            _debounce((targets) => {
                targets.forEach(({ target }: { target: HTMLElement }) => {
                    ScrollEffectEventEventBus.emit($(target), "ue.scroll-effect.resize");
                });
            }, 200)
        );

        UeScrollEffectFactory.visibleObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    ScrollEffectEventEventBus.emit($(entry.target), "ue.scroll-effect.visible");
                }
            });
        });

        $(window).on("resize.scroll-effect-factory", () => {
            ScrollEffectEventEventBus.emit($(window), "ue.scroll-effect.window-resize");
        });

        UeScrollEffectFactory.instance = this;
    }

    /**
     * 初始化多个元素的滚动效果
     * @param doms - 目标DOM元素数组
     * @param params - 初始化参数
     * @returns 包含销毁方法的对象
     */
    initScrollEffect(doms: HTMLElement[], params: UeScrollEffectFactoryDomParams) {
        if (UeScrollEffectFactory.instance === null) {
            throw new Error("UeScrollEffectFactory instance has been destroyed. Cannot reinitialize.");
        }

        doms.forEach((dom) => {
            if (UeScrollEffectFactory.doms.has(dom)) return;

            initScrollEffect(dom, { scroller: this.params.scroller, ...params });

            UeScrollEffectFactory.resizeObserver.observe(dom);
            UeScrollEffectFactory.visibleObserver?.observe(dom);
            UeScrollEffectFactory.doms.set(dom, params);
        });
        return {
            kill: () => {
                this.destroyScrollEffect(doms);
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
                const domParams = UeScrollEffectFactory.doms.get(dom);
                if (!domParams) {
                    console.warn("No params found for element");
                    return;
                }

                // 深拷贝参数
                const lastParams = { ...this.params };
                const lastDomParams = { ...domParams };

                // 销毁当前效果（包含事件清理）
                this.destroyScrollEffect([dom]);

                // 确保实例存在
                if (!UeScrollEffectFactory.instance) {
                    UeScrollEffectFactory.instance = new UeScrollEffectFactory(lastParams);
                }

                // 重新初始化效果
                UeScrollEffectFactory.instance.initScrollEffect([dom], lastDomParams);
            });
        } else {
            doms.forEach((dom) => {
                ScrollEffectEventEventBus.emit($(dom), "ue.scroll-effect.update");
            });
        }
    }

    /**
     * 销毁多个元素的滚动效果
     * @param doms - 目标DOM元素数组
     */
    destroyScrollEffect(doms: HTMLElement[]) {
        doms.forEach((dom) => {
            UeScrollEffectFactory.resizeObserver.unobserve(dom);
            UeScrollEffectFactory.visibleObserver?.unobserve(dom);
            UeScrollEffectFactory.doms.delete(dom);

            ScrollEffectEventEventBus.emit($(dom), "ue.scroll-effect.destroy");
            ScrollEffectEventEventBus.clear($(dom));
        });

        if (UeScrollEffectFactory.doms.size === 0) {
            UeScrollEffectFactory.instance = null;
            UeScrollEffectFactory.resizeObserver.disconnect();
            UeScrollEffectFactory.visibleObserver?.disconnect();
            $(window).off("resize.scroll-effect-factory");
        }
    }

    /**
     * 销毁所有滚动效果和工厂实例
     */
    destroy() {
        this.destroyScrollEffect(Array.from(UeScrollEffectFactory.doms.keys()));
    }
}
