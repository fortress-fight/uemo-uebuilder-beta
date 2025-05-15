/**
 * @file 拖拽控制器
 * @description 提供元素拖拽、边界控制、弹性效果等功能
 * @author F-Stone
 */

import { calcElastic, type Bounce, type DraggerOption } from "./utils/helper";
import { guid } from "../guid";
import { numRound } from "../number";
import { gsap } from "../gsap";
import $ from "../jquery";

/**
 * 位置信息接口
 */
interface Position {
    /** X 坐标 */
    x: number;
    /** Y 坐标 */
    y: number;
}

/**
 * 拖拽开始位置信息接口
 */
interface DragStartPosition extends Position {
    /** 鼠标在屏幕上的 X 坐标 */
    clientX: number;
    /** 鼠标在屏幕上的 Y 坐标 */
    clientY: number;
}

/**
 * 拖拽控制器类
 * 提供元素拖拽、边界控制、弹性效果等功能
 */
export class Dragger {
    /** 实例唯一标识 */
    private readonly id: string = guid();
    /** 是否已初始化 */
    private ready = false;
    /** 当前是否处于拖拽状态 */
    private dragging = false;
    /** 是否禁用拖拽 */
    protected _disable = false;
    /** 遮罩层元素 */
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
    bounds = {
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

    /**
     * 构造函数
     * @param moveEl - 可移动的元素
     * @param options - 拖拽配置选项
     */
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
            gsap.set(target, { cursor: "grab" });
        }

        return this;
    }

    /**
     * 更新拖拽状态
     * 当元素位置发生外部变化时调用，重新计算边界和位置信息
     */
    public refreshPosition(): void {
        this.startPos = { ...this.startPos, ...this.currentPosition };
        this.applyBounds();
    }

    /**
     * 应用边界限制
     * @param bounce - 边界容器元素或尺寸
     * @param option - 动画配置选项
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

        const { x: currentX, y: currentY } = this.currentPosition;
        const targetPosition = {
            x: this.overflow.x
                ? this.bounds.minX
                : gsap.utils.clamp(this.bounds.minX, this.bounds.maxX, numRound(currentX)),
            y: this.overflow.y
                ? this.bounds.minY
                : gsap.utils.clamp(this.bounds.minY, this.bounds.maxY, numRound(currentY)),
        };

        const duration = option?.immediate || !this.options.elasticBack ? 0 : 0.36;
        this.animateToPosition(targetPosition, duration, option?.onEnd);
    }

    /** 启用拖拽 */
    public enable(): void {
        this._disable = false;
    }

    /** 禁用拖拽 */
    public disable(): void {
        this._disable = true;
    }

    /** 销毁实例，清理资源 */
    public destroy(): void {
        this.unbindEvents();
        this.mask?.remove();
        $(this.moveEl).data("dragger", null);
    }

    /** 检查是否禁用 */
    public isDisabled(): boolean {
        return this._disable;
    }

    /**
     * 绑定拖拽相关的事件监听
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

    /** 解绑事件监听 */
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
            ...this.currentPosition,
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
     */
    private calcBounds(): void {
        const moveDomRect = this.moveEl.getBoundingClientRect();
        const bounceRect = this.getBounce();
        const { x: currentX, y: currentY } = this.currentPosition;

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

    /**
     * 获取当前位置
     * @returns 当前位置信息
     */
    get currentPosition(): Position {
        return {
            x: gsap.getProperty(this.moveEl, "x") as number,
            y: gsap.getProperty(this.moveEl, "y") as number,
        };
    }

    /**
     * 检查是否应该忽略按下事件
     */
    private shouldIgnorePress(ev: PointerEvent): boolean {
        const excludeTrigger = this.options.excludeTrigger;
        if (!excludeTrigger) return false;

        const excludeEl = typeof excludeTrigger === "string" ? $(excludeTrigger) : $(excludeTrigger);
        return $(ev.target!).closest(excludeEl).length > 0;
    }

    /**
     * 创建遮罩层
     */
    private createMaskIfNeeded(): void {
        if (!this.options.mask) return;

        this.mask = $(
            `<div id="${this.id}" style="z-index:9997;cursor:move;position:absolute;top:0;left:0;bottom:0;right:0;"></div>`
        ).appendTo(this.moveEl.parentElement || "body");
    }

    /**
     * 计算新的位置信息
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
    /**
     * 获取元素关联的拖拽实例
     * @param el - 目标元素
     * @returns 拖拽实例或 undefined
     */
    get(el: HTMLElement): Dragger | undefined {
        return $(el).data("dragger") as Dragger | undefined;
    },
};
