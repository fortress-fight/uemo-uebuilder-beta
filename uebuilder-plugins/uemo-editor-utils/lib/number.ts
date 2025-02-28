/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-02-28 11:27:29
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
