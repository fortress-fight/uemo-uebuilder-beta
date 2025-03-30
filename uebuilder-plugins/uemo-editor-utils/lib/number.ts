/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-02-28 16:35:33
 */
import Big from "big.js";

export function numDiv(n1: number, n2: number) {
    return new Big(n1).div(new Big(n2)).toNumber();
}

export function numMod(n1: number, n2: number) {
    return new Big(n1).mod(new Big(n2)).toNumber();
}

export function numTimes(n1: number, n2: number) {
    return new Big(n1).times(new Big(n2)).toNumber();
}

export function numRound(n1: number, size?: number) {
    return new Big(n1).round(size).toNumber();
}
export function numPlus(n1: number, n2: number) {
    return new Big(n1).plus(n2).toNumber();
}
export function numMinus(n1: number, n2: number) {
    return new Big(n1).minus(n2).toNumber();
}

/**
 * 数值工具函数：限制数值在[min, max]范围内
 * @param value 当前数值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的数值
 */
export function numClamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * 计算增加后的数值
 * @param num 当前数值
 * @param times 增加倍数
 * @param step 步长
 * @returns 新的数值
 */
export function numAddWithStep(num: number, times: number, step: number): number {
    return numPlus(num, numTimes(numRound(times), step));
}
