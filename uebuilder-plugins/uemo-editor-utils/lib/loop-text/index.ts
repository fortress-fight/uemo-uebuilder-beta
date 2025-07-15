/*
 * @Description: 循环文本组件类
 * @Author: F-Stone
 * @LastEditTime: 2025-07-10 15:35:32
 */
import $ from "@stone/uemo-editor-utils/lib/jquery";
import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";

export type UeLoopTextFactoryParams = {
    scroller?: HTMLElement;
    /** 循环文本容器选择器 */
    loopTextContainer?: string;
    /** 循环文本项选择器 */
    loopTextItems?: string;
    /** 是否启用可见性检测（默认true） */
    enableVisibilityCheck?: boolean;
    /** 可见性检测的阈值（0-1，默认0.1） */
    visibilityThreshold?: number;
    /** 延迟时间（秒，默认2.4） */
    delay?: number;
};

/**
 * 循环文本组件类
 * 用于实现文本轮播效果，支持自动切换和手动控制
 */
export class LoopTextClass {
    /** 初始化完成标志 */
    private initDone = false;
    /** 定时器ID */
    private intervalTimer: number | null = null;
    /** 延迟定时器ID */
    private timeOutTimer: number | null = null;
    /** 当前激活的文本索引 */
    private currentIndex = 0;
    /** 是否已销毁 */
    private isDestroyed = false;
    /** 延迟时间（毫秒） */
    private delayTime = 2400;
    /** 循环文本容器 */
    private loopTextContainer: JQuery<HTMLElement> | null = null;
    /** 循环文本项列表 */
    private loopTextItems: JQuery<HTMLElement> | null = null;
    /** 是否启用可见性检测 */
    private enableVisibilityCheck = true;
    /** 可见性检测阈值 */
    private visibilityThreshold = 0.1;
    /** 是否当前可见 */
    private isVisible = true;
    /** 可见性检测的IntersectionObserver */
    private intersectionObserver: IntersectionObserver | null = null;
    /** 防抖的可见性变化处理函数 */
    private debouncedVisibilityHandler: ((isVisible: boolean) => void) | null = null;

    /**
     * 构造函数
     * @param dom - 目标DOM元素
     * @param options - 配置选项
     */
    constructor(public readonly dom: HTMLElement, private options: UeLoopTextFactoryParams = {}) {
        // 检查是否已存在实例，避免重复创建
        const existingInstance = $(dom).data("LoopTextInstance") as LoopTextClass;
        if (existingInstance && !existingInstance.isDestroyed) {
            return existingInstance;
        }

        // 初始化配置
        this.initializeOptions();

        // 存储新实例
        $(dom).data("LoopTextInstance", this);
        this.initializeElements();
    }

    /**
     * 初始化配置选项
     */
    private initializeOptions(): void {
        this.enableVisibilityCheck = this.options.enableVisibilityCheck ?? true;
        this.visibilityThreshold = this.options.visibilityThreshold ?? 0.1;
        this.delayTime = (this.options.delay ?? 2.4) * 1000;
    }

    /**
     * 初始化DOM元素引用
     */
    private initializeElements(): void {
        this.loopTextContainer = $(this.dom).find(this.options.loopTextContainer ?? ".loop-text-group");
        this.loopTextItems = this.loopTextContainer.find(this.options.loopTextItems ?? ".loop-text-item");
    }

    /**
     * 初始化可见性检测
     */
    private initializeVisibilityCheck(): void {
        if (!this.enableVisibilityCheck || !window.IntersectionObserver) return;

        // 创建防抖的可见性处理函数
        this.debouncedVisibilityHandler = _debounce((isVisible: boolean) => {
            if (this.isDestroyed) return;

            this.isVisible = isVisible;
            if (isVisible) {
                this.resume();
            } else {
                this.pause();
            }
        }, 100) as (isVisible: boolean) => void;

        // 创建IntersectionObserver
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                if (this.isDestroyed) return;

                const entry = entries[0];
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= this.visibilityThreshold;

                this.debouncedVisibilityHandler?.(isVisible);
            },
            {
                threshold: this.visibilityThreshold,
                rootMargin: "0px",
            }
        );

        // 开始观察
        this.intersectionObserver.observe(this.dom);
    }

    /**
     * 初始化循环文本效果
     * @returns 当前实例，支持链式调用
     */
    init(): LoopTextClass {
        if (this.initDone || this.isDestroyed) return this;

        this.initDone = true;
        this.parseDelayTime();
        this.initializeVisibilityCheck();
        this.startLoop();

        return this;
    }

    /**
     * 解析延迟时间配置
     */
    private parseDelayTime(): void {
        const delayValue = Number($(this.dom).attr("data-delay") || "2.4") * 1000;
        this.delayTime = isNaN(delayValue) ? 2400 : delayValue;
    }

    /**
     * 开始循环播放
     */
    private startLoop(): void {
        if (!this.loopTextItems || this.isDestroyed) return;

        const len = this.loopTextItems.length;
        if (len === 0) return;

        // 创建切换函数
        const switchText = (): void => {
            if (this.isDestroyed || !this.loopTextContainer || !this.loopTextItems) return;

            const activeItem = this.loopTextItems.eq(this.currentIndex);
            this.loopTextContainer.css("width", `${activeItem.width()}px`);
            this.loopTextContainer.css("height", `${this.loopTextContainer.height()}px`);

            activeItem.removeAttr("data-active");

            this.currentIndex = (this.currentIndex + 1) % len;
            const nextItem = this.loopTextItems.eq(this.currentIndex);
            this.loopTextContainer.css("width", `${nextItem.width()}px`);
            nextItem.attr("data-active", "true");

            this.loopTextContainer.css("height", "");
        };

        // 启动延迟定时器
        this.timeOutTimer = window.setTimeout(() => {
            if (this.isDestroyed) return;

            requestAnimationFrame(() => {
                if (this.isDestroyed) return;

                switchText();
                this.intervalTimer = window.setInterval(switchText, this.delayTime);
            });
        }, this.delayTime / 2);
    }

    /**
     * 更新循环文本效果
     * 重新初始化元素引用并重启循环
     */
    update(): LoopTextClass {
        if (this.isDestroyed) return this;

        this.stop();
        this.parseDelayTime();
        this.startLoop();

        return this;
    }

    /**
     * 停止循环播放
     * 清理所有定时器
     */
    stop(): void {
        if (this.timeOutTimer) {
            window.clearTimeout(this.timeOutTimer);
            this.timeOutTimer = null;
        }

        if (this.intervalTimer) {
            window.clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    }

    /**
     * 重置布局状态
     * 清除所有样式并设置第一个元素为激活状态
     */
    resetLayout(): void {
        if (!this.loopTextContainer || !this.loopTextItems || this.isDestroyed) return;

        this.loopTextContainer.css("width", "");
        this.loopTextItems.removeAttr("data-active").eq(0).attr("data-active", "true");
        this.currentIndex = 0;
    }

    /**
     * 暂停循环播放
     * 停止定时器但保持当前状态
     */
    pause(): void {
        this.stop();
    }

    /**
     * 恢复循环播放
     * 从当前状态重新开始循环
     */
    resume(): void {
        if (this.isDestroyed || !this.initDone) return;
        this.startLoop();
    }

    /**
     * 跳转到指定索引
     * @param index - 目标索引
     */
    goTo(index: number): void {
        if (this.isDestroyed || !this.loopTextItems) return;

        const len = this.loopTextItems.length;
        if (index < 0 || index >= len) return;

        this.currentIndex = index;

        if (this.loopTextContainer) {
            const targetItem = this.loopTextItems.eq(index);
            this.loopTextContainer.css("width", `${targetItem.width()}px`);
            this.loopTextItems.removeAttr("data-active");
            targetItem.attr("data-active", "true");
        }
    }

    /**
     * 设置可见性检测配置
     * @param options - 新的配置选项
     */
    setVisibilityOptions(options: Partial<UeLoopTextFactoryParams>): void {
        if (this.isDestroyed) return;

        const wasEnabled = this.enableVisibilityCheck;

        // 更新配置
        if (options.enableVisibilityCheck !== undefined) {
            this.enableVisibilityCheck = options.enableVisibilityCheck;
        }
        if (options.visibilityThreshold !== undefined) {
            this.visibilityThreshold = options.visibilityThreshold;
        }
        if (options.delay !== undefined) {
            this.delayTime = options.delay * 1000;
        }

        // 如果可见性检测状态发生变化，重新初始化
        if (wasEnabled !== this.enableVisibilityCheck) {
            this.cleanupVisibilityCheck();
            if (this.enableVisibilityCheck) {
                this.initializeVisibilityCheck();
            }
        }
    }

    /**
     * 清理可见性检测
     */
    private cleanupVisibilityCheck(): void {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }

        if (this.debouncedVisibilityHandler) {
            this.debouncedVisibilityHandler = null;
        }
    }

    /**
     * 销毁实例
     * 清理所有资源，移除DOM数据，重置状态
     */
    destroy(): void {
        if (this.isDestroyed) return;

        // 清理定时器
        this.stop();

        // 清理可见性检测
        this.cleanupVisibilityCheck();

        // 重置布局
        this.resetLayout();

        // 清理DOM数据
        $(this.dom).removeData("LoopTextInstance");

        // 清理引用
        this.loopTextContainer = null;
        this.loopTextItems = null;
        this.initDone = false;
        this.currentIndex = 0;
        this.isVisible = true;

        // 标记为已销毁
        this.isDestroyed = true;
    }

    /**
     * 检查实例是否已销毁
     * @returns 是否已销毁
     */
    isDestroyedInstance(): boolean {
        return this.isDestroyed;
    }

    /**
     * 获取当前激活索引
     * @returns 当前索引
     */
    getCurrentIndex(): number {
        return this.currentIndex;
    }

    /**
     * 获取总项目数
     * @returns 项目总数
     */
    getTotalCount(): number {
        return this.loopTextItems ? this.loopTextItems.length : 0;
    }

    /**
     * 检查元素是否当前可见
     * @returns 是否可见
     */
    isElementVisible(): boolean {
        return this.isVisible;
    }

    /**
     * 获取当前配置
     * @returns 当前配置选项
     */
    getOptions(): UeLoopTextFactoryParams {
        return {
            enableVisibilityCheck: this.enableVisibilityCheck,
            visibilityThreshold: this.visibilityThreshold,
            delay: this.delayTime / 1000,
        };
    }
}
