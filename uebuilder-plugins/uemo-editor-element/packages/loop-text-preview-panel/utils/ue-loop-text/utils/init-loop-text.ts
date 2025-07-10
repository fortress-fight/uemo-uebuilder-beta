import { _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import pageStyle from "@stone/uemo-editor-tiptap/src/app.module.scss";

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

    /**
     * 构造函数
     * @param dom - 目标DOM元素
     */
    constructor(public readonly dom: HTMLElement) {
        // 检查是否已存在实例，避免重复创建
        const existingInstance = $(dom).data("LoopTextInstance") as LoopTextClass;
        if (existingInstance && !existingInstance.isDestroyed) {
            return existingInstance;
        }

        // 存储新实例
        $(dom).data("LoopTextInstance", this);
        this.initializeElements();
    }

    /**
     * 初始化DOM元素引用
     */
    private initializeElements(): void {
        this.loopTextContainer = $(this.dom).find("." + pageStyle["loop-text-group"]);
        this.loopTextItems = this.loopTextContainer.find("." + pageStyle["loop-text-item"]);
    }

    /**
     * 初始化循环文本效果
     * @returns 当前实例，支持链式调用
     */
    init(): LoopTextClass {
        if (this.initDone || this.isDestroyed) return this;

        this.initDone = true;
        this.parseDelayTime();
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
        this.initializeElements();
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
     * 销毁实例
     * 清理所有资源，移除DOM数据，重置状态
     */
    destroy(): void {
        if (this.isDestroyed) return;

        // 标记为已销毁
        this.isDestroyed = true;

        // 清理定时器
        this.stop();

        // 重置布局
        this.resetLayout();

        // 清理DOM数据
        $(this.dom).removeData("LoopTextInstance");

        // 清理引用
        this.loopTextContainer = null;
        this.loopTextItems = null;
        this.initDone = false;
        this.currentIndex = 0;
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
}

/**
 * 初始化循环文本组件
 * @returns 返回一个函数，该函数接受DOM元素并返回初始化后的LoopTextClass实例
 */
export function initLoopText(): Promise<(dom: HTMLElement) => LoopTextClass> {
    return Promise.resolve((dom: HTMLElement) => {
        return new LoopTextClass(dom).init();
    });
}
