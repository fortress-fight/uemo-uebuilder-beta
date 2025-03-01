/*
 * @Description: 本地颜色库辅助方法
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 01:12:39
 */

/**
 * 从 localStorage 中获取指定 key 的颜色库数据
 * @param key - 存储键名
 * @returns 颜色字符串数组
 */
function getLocalLib(key: string): string[] {
    const libStr = localStorage.getItem(key);
    try {
        return libStr ? JSON.parse(libStr) : [];
    } catch (error) {
        console.error(error instanceof Error ? error : new Error(String(error)));
        return [];
    }
}

/**
 * 将颜色库数据存入 localStorage
 * @param key - 存储键名
 * @param lib - 颜色字符串数组
 */
function setLocalLib(key: string, lib: string[]) {
    localStorage.setItem(key, JSON.stringify(lib));
}

/**
 * 向指定的颜色库添加新的颜色，若已存在则提前移除
 * @param key - 存储键名
 * @param color - 要添加的颜色字符串
 */
function addLocalLib(key: string, color: string) {
    if (!color) return;
    const lib = getLocalLib(key);
    const index = lib.indexOf(color);
    if (index !== -1) {
        lib.splice(index, 1);
    }
    lib.unshift(color);
    setLocalLib(key, lib.slice(0, 9));
}

// 颜色库方法：普通颜色
export function getLocalColorLib(): string[] {
    return getLocalLib("localColorLib");
}
export function setLocalColorLib(lib: string[]) {
    setLocalLib("localColorLib", lib);
}
export function addLocalColorLib(color: string) {
    addLocalLib("localColorLib", color);
}

// 颜色库方法：渐变颜色
export function getLocalGradientColorLib(): string[] {
    return getLocalLib("localGradientColorLib");
}
export function setLocalGradientColorLib(lib: string[]) {
    setLocalLib("localGradientColorLib", lib);
}
export function addLocalGradientColorLib(color: string) {
    addLocalLib("localGradientColorLib", color);
}

// 颜色库方法：径向渐变颜色
export function getLocalRadialGradientColorLib(): string[] {
    return getLocalLib("localRadialGradientColorLib");
}
export function setLocalRadialGradientColorLib(lib: string[]) {
    setLocalLib("localRadialGradientColorLib", lib);
}
export function addLocalRadialGradientColorLib(color: string) {
    addLocalLib("localRadialGradientColorLib", color);
}
