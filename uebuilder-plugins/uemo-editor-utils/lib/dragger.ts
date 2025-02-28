import { guid } from "./guid";
import { numRound } from "./number";

type Bounce = { top: number; left: number; width: number; height: number } | HTMLElement;
type DraggerOption = {
    type?: "x" | "y" | "xy";
    elastic?: boolean;
    initPos?: boolean;
    bounds?: { top: number; left: number; width: number; height: number } | HTMLElement;
    trigger?: Element | null | Element[] | string | { box: HTMLElement; el: string };
    excludeTrigger?: HTMLElement[] | string;
    padding?: number;
    mask?: boolean;
    onDrag?: (e: PointerEvent) => void;
    onDragEnd?: (e: PointerEvent) => void;
    onRelease?: () => void;
    onPressInit?: (this: Dragger, e: PointerEvent) => void;
    liveSnap?: (pointers: { x: number; y: number }) => { x: number; y: number };
};

/**
 * 模拟弹性阻力
 * 公式为:位置 *=弹力/(弹力+位置)
 *
 * @param {number} current 当前值
 * @param {[number, number]} range [最小，最大] 超出这个范围后，开始计算弹性阻力
 * @param {number} [fl=150] 弹力越大则能够拉伸的距离越远
 * @return {number} 计算结果
 */
function calcElastic(current: number, range: [number, number], fl = 150) {
    const [min, max] = range;
    if (current > max) {
        const disX = current - max;
        current = max + (disX * fl) / (fl + disX);
    } else if (current < min) {
        const disX = min - current;
        current = min - (disX * fl) / (fl + disX);
    }
    return current;
}

export class Dragger {
    id = "";
    ready = false;
    dragging = false;
    _disable = false;

    x = 0;
    y = 0;

    maxX = 0;
    maxY = 0;
    minX = 0;
    minY = 0;

    /**
     * 宽度溢出
     */
    overflowX = false;
    /**
     * 高度溢出
     */
    overflowY = false;

    constructor(
        public moveEl: HTMLElement,
        public options: DraggerOption
    ) {
        if ($(moveEl).data("dragger")) {
            return $(moveEl).data("dragger");
        }
        this.options = Object.assign({ mask: false, type: "xy", initPos: true }, options);
        this.id = guid();
        $(moveEl).data("dragger", this);
    }

    /**
     * 计算是否溢出，以及最大与最小的可移动范围
     */
    calcMax() {
        const moveDomRect = this.moveEl.getBoundingClientRect();
        const bounceRect = this.getBounce();

        this.overflowY = moveDomRect.height > bounceRect.height;
        this.overflowX = moveDomRect.width > bounceRect.width;

        this.maxX = numRound(
            bounceRect.left +
                bounceRect.width -
                (moveDomRect.left + moveDomRect.width) +
                (gsap.getProperty(this.moveEl, "x") as number)
        );
        this.minX = numRound(bounceRect.left - moveDomRect.left + (gsap.getProperty(this.moveEl, "x") as number));
        this.maxY = numRound(
            bounceRect.top +
                bounceRect.height -
                (moveDomRect.top + moveDomRect.height) +
                (gsap.getProperty(this.moveEl, "y") as number)
        );
        this.minY = numRound(bounceRect.top - moveDomRect.top + (gsap.getProperty(this.moveEl, "y") as number));
    }

    private startPos = { clientX: 0, clientY: 0, x: 0, y: 0 };
    private mask: JQuery<HTMLElement> | undefined;
    init() {
        if (this.ready) return this;

        this.ready = true;
        const uid = this.id;
        const target = this.options.trigger;

        if (this.options.initPos) {
            this.applyBounds(undefined, { immediate: true });
        }

        if (target instanceof HTMLElement || Array.isArray(target)) {
            gsap.set(target, { cursor: "move" });
        }

        if (typeof target === "string") {
            const el = this.moveEl;
            $(el).on("pointerdown." + uid, (event) => {
                if (this._disable) return;
                const ev = event.originalEvent as PointerEvent;
                if ($(event.target).closest(target).length === 0) {
                    return;
                }
                this.press(ev, $(event.target).closest(target)[0]);
            });
        } else if (target && typeof target === "object" && !Array.isArray(target) && !(target instanceof Element)) {
            $(target.box).on("pointerdown." + uid, target.el, (event) => {
                if (this._disable) return;
                const ev = event.originalEvent as PointerEvent;
                this.press(ev);
            });
        } else {
            const el = target || this.moveEl;
            $(el).on("pointerdown." + uid, (event) => {
                if (this._disable) return;
                const ev = event.originalEvent as PointerEvent;
                this.press(ev);
            });
        }
        return this;
    }

    /**
     * 鼠标按下，记录初始值
     */
    press(ev: PointerEvent, draggerTarget?: HTMLElement) {
        const draggerHandle = draggerTarget || (ev.currentTarget as HTMLElement);
        const uid = this.id;

        const excludeTrigger = this.options.excludeTrigger;
        if (excludeTrigger) {
            let excludeEl;
            if (typeof excludeTrigger === "string") {
                excludeEl = $(excludeTrigger);
            } else {
                excludeEl = $(excludeTrigger);
            }
            if ($(ev.target!).closest(excludeEl).length) {
                return false;
            }
        }

        if (gsap.isTweening(this.moveEl)) {
            gsap.killTweensOf(this.moveEl);
        }

        this.options.onPressInit?.call(this, ev);
        this.dragging = true;

        this.startPos = {
            clientX: ev.clientX,
            clientY: ev.clientY,
            x: gsap.getProperty(this.moveEl, "x") as number,
            y: gsap.getProperty(this.moveEl, "y") as number,
        };

        if (this.options.mask) {
            this.mask = $(
                '<div id="' +
                    this.id +
                    '" style="z-index:9997;cursor: move; position: absolute; top: 0; left: 0; bottom: 0; right: 0;"><div>'
            ).appendTo(this.moveEl.parentElement || "body");
        }

        gsap.set(ev.currentTarget, { zIndex: "10000", userSelect: "none" });

        $(draggerHandle).on("pointermove." + uid, (event) => {
            this.move(event.originalEvent as PointerEvent);
        });
        $(draggerHandle).on("pointerup." + uid, (event) => {
            this.release(event.originalEvent as PointerEvent);
        });

        draggerHandle.setPointerCapture(ev.pointerId);
    }

    /**
     * 鼠标拖拽
     */
    move(ev: PointerEvent) {
        ev.preventDefault();

        this.options.onDrag?.(ev);
        const startPos = this.startPos;
        const moveX = ev.clientX - startPos.clientX;
        const moveY = ev.clientY - startPos.clientY;

        const x = this.options.elastic
            ? calcElastic(startPos.x + moveX, [this.minX, this.maxX])
            : gsap.utils.clamp(this.minX, this.maxX, startPos.x + moveX);

        const y = this.options.elastic
            ? calcElastic(startPos.y + moveY, [this.minY, this.maxY])
            : gsap.utils.clamp(this.minY, this.maxY, startPos.y + moveY);

        const result = this.options.liveSnap?.({ x, y }) || {
            x,
            y,
        };

        this.x = result.x;
        this.y = result.y;

        switch (this.options.type) {
            case "xy":
                gsap.set(this.moveEl, result);
                break;
            case "x":
                gsap.set(this.moveEl, { x: result.x });
                break;
            case "y":
                gsap.set(this.moveEl, { y: result.y });
                break;

            default:
                break;
        }
    }

    /**
     * 释放鼠标拖拽
     */
    release(ev: PointerEvent) {
        const el = ev.currentTarget as HTMLElement;
        const uid = this.id;

        this.options.onRelease?.();
        this.dragging = false;
        $(el).off("pointermove." + uid);
        $(el).off("pointerup." + uid);

        this.mask?.remove();
        gsap.set(el, { zIndex: "" });
        this.applyBounds();
        this.options.onDragEnd?.(ev);

        el.releasePointerCapture(ev.pointerId);
    }

    /**
     * 如果 moveEl 的 x/y 主动发生变化，需要通过 update 进行更新
     */
    update() {
        this.startPos.x = gsap.getProperty(this.moveEl, "x") as number;
        this.startPos.y = gsap.getProperty(this.moveEl, "y") as number;
        this.x = this.startPos.x;
        this.y = this.startPos.y;
        this.calcMax();
    }

    getBounce(bounce: Bounce | undefined = this.options.bounds) {
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

        rect = {
            top: rect.top + padding,
            left: rect.left + padding,
            width: rect.width - padding * 2,
            height: rect.height - padding * 2,
        };

        return rect;
    }

    applyBounds(bounce?: Bounce, option?: { immediate: boolean; onEnd?: () => void }) {
        if (bounce) {
            this.options.bounds = bounce;
        }
        if (this.dragging) {
            if (gsap.isTweening(this.moveEl)) {
                gsap.killTweensOf(this.moveEl);
            }
            return;
        }
        this.calcMax();
        option = Object.assign({ immediate: false }, option || {});
        const currentX = numRound(gsap.getProperty(this.moveEl, "x") as number);
        const currentY = numRound(gsap.getProperty(this.moveEl, "y") as number);
        const result = {
            x: this.overflowX ? this.minX : gsap.utils.clamp(this.minX, this.maxX, currentX),
            y: this.overflowY ? this.minY : gsap.utils.clamp(this.minY, this.maxY, currentY),
        };
        this.x = result.x;
        this.y = result.y;
        const tl = gsap.timeline({
            onComplete() {
                // option?.onEnd?.();
            },
            defaults: {
                ease: "back",
                duration: option.immediate || !this.options.elastic ? 0 : 0.36,
            },
        });

        switch (this.options.type) {
            case "xy":
                tl.to(this.moveEl, result);
                break;
            case "x":
                tl.to(this.moveEl, { x: result.x });
                break;
            case "y":
                tl.to(this.moveEl, { y: result.y });
                break;

            default:
                break;
        }
    }

    enable() {
        this._disable = false;
    }

    disable() {
        this._disable = true;
    }

    destroy() {
        const el = this.moveEl;
        const uid = this.id;
        this.mask?.remove();
        $(el).data("dragger", null);
        $(el).off("pointermove." + uid);
        $(el).off("pointerup." + uid);

        const target = this.options.trigger;
        if (typeof target === "string") {
            $(this.moveEl).off("pointerdown." + uid);
        } else if (target && typeof target === "object" && !Array.isArray(target) && !(target instanceof Element)) {
            $(target.box).off("pointerdown." + uid);
        } else {
            const el = target || this.moveEl;
            $(el).off("pointerdown." + uid);
        }
    }
}

export const DraggerControl = {
    get(el: HTMLElement) {
        return $(el).data("dragger") as Dragger;
    },
};
