import { calcElastic, type Bounce, type DraggerOption } from "./utils/helper";

import { guid } from "../guid";
import { numRound } from "../number";
import $ from "../jquery";

interface Position {
    x: number;
    y: number;
}

interface DragStartPosition extends Position {
    clientX: number;
    clientY: number;
}

/**
 * 拖拽控制器类
 * 提供元素拖拽、边界控制、弹性效果等功能
 */
export class Dragger {
    // 实例标识和状态
    private readonly id: string = guid();
    private ready = false;
    /** 当前是否处于拖拽状态 */
    private dragging = false;
    protected _disable = false;
    private mask: JQuery<HTMLElement> | undefined;

    /**
     * 记录拖拽开始时的位置信息
     * - clientX/Y: 鼠标在屏幕上的坐标
     * - x/y: 元素当前的变换位置
     */
    private startPos: DragStartPosition = { clientX: 0, clientY: 0, x: 0, y: 0 };

    /**
     * 拖拽边界限制
     * - minX/Y: 最小可拖拽位置
     * - maxX/Y: 最大可拖拽位置
     */
    private bounds = {
        maxX: 0,
        maxY: 0,
        minX: 0,
        minY: 0,
    };

    /**
     * 元素尺寸是否超出容器
     * 影响边界限制的计算逻辑
     */
    private overflow = {
        x: false,
        y: false,
    };

    constructor(
        private readonly moveEl: HTMLElement,
        private options: DraggerOption
    ) {
        // 防止重复实例化
        const existingInstance = $(moveEl).data("dragger");
        if (existingInstance) {
            return existingInstance;
        }

        this.options = {
            mask: false,
            type: "xy",
            initPos: true,
            ...options,
        };

        $(moveEl).data("dragger", this);
    }

    /**
     * 初始化拖拽实例
     * - 绑定事件监听
     * - 设置初始位置和边界
     * - 配置鼠标样式
     */
    public init(): this {
        if (this.ready) return this;

        this.ready = true;
        this.bindEvents();

        if (this.options.initPos) {
            this.applyBounds(undefined, { immediate: true });
        }

        const target = this.options.trigger;
        if (target instanceof HTMLElement || Array.isArray(target)) {
            gsap.set(target, { cursor: "move" });
        }

        return this;
    }

    /**
     * 更新拖拽状态
     * 当元素位置发生外部变化时调用，重新计算边界和位置信息
     */
    public refreshPosition(): void {
        const currentPos = this.getCurrentPosition();
        this.startPos = { ...this.startPos, ...currentPos };
        this.applyBounds();
    }

    /**
     * 应用边界限制
     * 根据配置的边界容器计算并设置元素的可移动范围
     *
     * @param bounce 边界容器元素或尺寸
     * @param option 动画配置选项
     */
    public applyBounds(bounce?: Bounce, option?: { immediate: boolean; onEnd?: () => void }): void {
        if (bounce) {
            this.options.bounds = bounce;
        }

        if (this.dragging) {
            gsap.killTweensOf(this.moveEl);
            return;
        }

        this.calcBounds();

        const { x: currentX, y: currentY } = this.getCurrentPosition();
        const targetPosition = {
            x: this.overflow.x
                ? this.bounds.minX
                : gsap.utils.clamp(this.bounds.minX, this.bounds.maxX, numRound(currentX)),
            y: this.overflow.y
                ? this.bounds.minY
                : gsap.utils.clamp(this.bounds.minY, this.bounds.maxY, numRound(currentY)),
        };

        const duration = option?.immediate || !this.options.elastic ? 0 : 0.36;

        this.animateToPosition(targetPosition, duration, option?.onEnd);
    }

    public enable(): void {
        this._disable = false;
    }

    public disable(): void {
        this._disable = true;
    }

    public destroy(): void {
        this.unbindEvents();
        this.mask?.remove();
        $(this.moveEl).data("dragger", null);
    }

    public isDisabled(): boolean {
        return this._disable;
    }

    /**
     * 绑定拖拽相关的事件监听
     * 根据不同的触发器类型（字符串选择器/对象/元素）绑定对应的事件
     */
    private bindEvents(): void {
        const target = this.options.trigger;
        const uid = this.id;

        if (typeof target === "string") {
            $(this.moveEl).on(`pointerdown.${uid}`, (event) => {
                if (this._disable) return;
                const ev = event.originalEvent as PointerEvent;
                const targetEl = $(event.target).closest(target);
                if (targetEl.length === 0) return;
                this.press(ev, targetEl[0]);
            });
        } else if (target && typeof target === "object" && !Array.isArray(target) && !(target instanceof Element)) {
            $(target.box).on(`pointerdown.${uid}`, target.el, (event) => {
                if (this._disable) return;
                this.press(event.originalEvent as PointerEvent);
            });
        } else {
            const el = target || this.moveEl;
            $(el).on(`pointerdown.${uid}`, (event) => {
                if (this._disable) return;
                this.press(event.originalEvent as PointerEvent);
            });
        }
    }

    private unbindEvents(): void {
        const uid = this.id;
        const target = this.options.trigger;

        if (typeof target === "string") {
            $(this.moveEl).off(`pointerdown.${uid}`);
        } else if (target && typeof target === "object" && !Array.isArray(target) && !(target instanceof Element)) {
            $(target.box).off(`pointerdown.${uid}`);
        } else {
            const el = target || this.moveEl;
            $(el).off(`pointerdown.${uid}`);
        }

        $(this.moveEl).off(`pointermove.${uid} pointerup.${uid}`);
    }

    /**
     * 处理拖拽开始
     * - 记录初始位置
     * - 创建遮罩层
     * - 设置拖拽状态
     * - 绑定移动和释放事件
     */
    private press(ev: PointerEvent, draggerTarget?: HTMLElement): void {
        if (this.shouldIgnorePress(ev)) return;

        const draggerHandle = draggerTarget || (ev.currentTarget as HTMLElement);
        const uid = this.id;

        gsap.killTweensOf(this.moveEl);

        this.options.onPressInit?.call(this, ev);
        this.dragging = true;
        this.startPos = {
            clientX: ev.clientX,
            clientY: ev.clientY,
            ...this.getCurrentPosition(),
        };

        this.createMaskIfNeeded();
        gsap.set(ev.currentTarget, { zIndex: "10000", userSelect: "none" });

        $(draggerHandle)
            .on(`pointermove.${uid}`, (event) => this.move(event.originalEvent as PointerEvent))
            .on(`pointerup.${uid}`, (event) => this.release(event.originalEvent as PointerEvent));

        draggerHandle.setPointerCapture(ev.pointerId);
    }

    /**
     * 处理拖拽移动
     * - 计算移动偏移
     * - 应用边界限制
     * - 更新元素位置
     */
    private move(ev: PointerEvent): void {
        ev.preventDefault();
        this.options.onDrag?.(ev);

        const moveOffset = {
            x: ev.clientX - this.startPos.clientX,
            y: ev.clientY - this.startPos.clientY,
        };

        const newPosition = this.calculateNewPosition(moveOffset);
        this.updatePosition(newPosition);
    }

    /**
     * 处理拖拽结束
     * - 清理事件监听
     * - 移除遮罩层
     * - 重置状态
     * - 应用最终边界限制
     */
    private release(ev: PointerEvent): void {
        const el = ev.currentTarget as HTMLElement;
        const uid = this.id;

        this.options.onRelease?.();
        this.dragging = false;

        $(el).off(`pointermove.${uid} pointerup.${uid}`);
        this.mask?.remove();

        gsap.set(el, { zIndex: "" });
        this.applyBounds();
        this.options.onDragEnd?.(ev);

        el.releasePointerCapture(ev.pointerId);
    }

    /**
     * 计算拖拽边界
     * 根据容器和元素的尺寸关系，计算可移动范围
     */
    private calcBounds(): void {
        const moveDomRect = this.moveEl.getBoundingClientRect();
        const bounceRect = this.getBounce();
        const { x: currentX, y: currentY } = this.getCurrentPosition();

        this.overflow = {
            x: moveDomRect.width > bounceRect.width,
            y: moveDomRect.height > bounceRect.height,
        };

        this.bounds = {
            maxX: numRound(bounceRect.left + bounceRect.width - (moveDomRect.left + moveDomRect.width) + currentX),
            minX: numRound(bounceRect.left - moveDomRect.left + currentX),
            maxY: numRound(bounceRect.top + bounceRect.height - (moveDomRect.top + moveDomRect.height) + currentY),
            minY: numRound(bounceRect.top - moveDomRect.top + currentY),
        };
    }

    /**
     * 获取边界容器的尺寸信息
     * 支持三种边界类型：
     * 1. 无边界：使用视窗尺寸
     * 2. 元素边界：使用元素的 getBoundingClientRect
     * 3. 自定义边界：直接使用传入的尺寸对象
     */
    private getBounce(bounce: Bounce | undefined = this.options.bounds): {
        top: number;
        left: number;
        width: number;
        height: number;
    } {
        let rect: { top: number; left: number; width: number; height: number };

        if (!bounce) {
            rect = {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        } else if (bounce instanceof HTMLElement) {
            const { top, left, width, height } = bounce.getBoundingClientRect();
            rect = { top, left, width, height };
        } else {
            rect = bounce;
        }

        const padding = this.options.padding || 0;
        return {
            top: rect.top + padding,
            left: rect.left + padding,
            width: rect.width - padding * 2,
            height: rect.height - padding * 2,
        };
    }

    private getCurrentPosition(): Position {
        return {
            x: gsap.getProperty(this.moveEl, "x") as number,
            y: gsap.getProperty(this.moveEl, "y") as number,
        };
    }

    private shouldIgnorePress(ev: PointerEvent): boolean {
        const excludeTrigger = this.options.excludeTrigger;
        if (!excludeTrigger) return false;

        const excludeEl = typeof excludeTrigger === "string" ? $(excludeTrigger) : $(excludeTrigger);
        return $(ev.target!).closest(excludeEl).length > 0;
    }

    private createMaskIfNeeded(): void {
        if (!this.options.mask) return;

        this.mask = $(
            `<div id="${this.id}" style="z-index:9997;cursor:move;position:absolute;top:0;left:0;bottom:0;right:0;"></div>`
        ).appendTo(this.moveEl.parentElement || "body");
    }

    /**
     * 计算新的位置信息
     * 根据移动偏移量和边界限制计算目标位置
     * 支持弹性效果和自定义的吸附功能
     */
    private calculateNewPosition(moveOffset: Position): Position {
        const newX = this.options.elastic
            ? calcElastic(this.startPos.x + moveOffset.x, [this.bounds.minX, this.bounds.maxX])
            : gsap.utils.clamp(this.bounds.minX, this.bounds.maxX, this.startPos.x + moveOffset.x);

        const newY = this.options.elastic
            ? calcElastic(this.startPos.y + moveOffset.y, [this.bounds.minY, this.bounds.maxY])
            : gsap.utils.clamp(this.bounds.minY, this.bounds.maxY, this.startPos.y + moveOffset.y);

        return this.options.liveSnap?.({ x: newX, y: newY }) || { x: newX, y: newY };
    }

    /**
     * 更新元素位置
     * 根据移动类型(xy/x/y)更新对应方向的变换
     */
    private updatePosition(position: Position): void {
        switch (this.options.type) {
            case "xy":
                gsap.set(this.moveEl, position);
                break;
            case "x":
                gsap.set(this.moveEl, { x: position.x });
                break;
            case "y":
                gsap.set(this.moveEl, { y: position.y });
                break;
        }
    }

    /**
     * 使用动画更新元素位置
     * 支持不同方向的移动和过渡效果
     */
    private animateToPosition(position: Position, duration: number, onComplete?: () => void): void {
        const tl = gsap.timeline({
            onComplete,
            defaults: {
                ease: "back",
                duration,
            },
        });

        switch (this.options.type) {
            case "xy":
                tl.to(this.moveEl, position);
                break;
            case "x":
                tl.to(this.moveEl, { x: position.x });
                break;
            case "y":
                tl.to(this.moveEl, { y: position.y });
                break;
        }
    }
}

/**
 * 拖拽控制器工具对象
 * 用于获取元素关联的拖拽实例
 */
export const DraggerControl = {
    get(el: HTMLElement): Dragger {
        return $(el).data("dragger") as Dragger;
    },
};
