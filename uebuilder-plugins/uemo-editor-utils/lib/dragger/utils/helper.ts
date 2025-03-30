import type { Dragger } from "../index";

export type Bounce = { top: number; left: number; width: number; height: number } | HTMLElement;

export type DraggerOption = {
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
export function calcElastic(current: number, range: [number, number], fl = 150) {
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
