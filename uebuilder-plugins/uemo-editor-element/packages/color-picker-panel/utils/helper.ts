/*
 * @Description: 本地颜色库辅助方法
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 15:14:12
 */

// 基础颜色组
export const DEFAULT_COLORS: string[] = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#b5b5b5",
    "#cccccc",
    "#dddddd",
    "#f6f6f6",
    "#ffffff",
    "#df116d",
    "#bb11df",
    "#1163df",
    "#11b6df",
    "#11df37",
    "#85ec16",
    "#f6f04c",
    "#ff6000",
    "#e30e0e",
];

// 基础渐变颜色组
export const DEFAULT_GRADIENT_COLORS: string[] = [
    "linear-gradient(135deg, #FEB692 0%, #EA5455 100%)",
    "linear-gradient(135deg, #FFE985 0%, #f7752c 100%)",
    "linear-gradient(135deg, #81fbb8 0%, #2bc871 100%)",
    "linear-gradient(135deg, #90f7ec 0%, #36cebe 100%)",
    "linear-gradient(135deg, #5efce8 0%, #7275fd 100%)",
    "linear-gradient(135deg, #72edf2 0%, #5255e5 100%)",
    "linear-gradient(135deg, #43cbff 0%, #950ccd 100%)",
    "linear-gradient(135deg, #ff6cab 0%, #7366ff 100%)",
    "linear-gradient(135deg, #ff9482 0%, #7d77ff 100%)",
    "linear-gradient(135deg, #f00b51 0%, #72005f 100%)",
    "linear-gradient(135deg, #ffcda5 0%, #ee4d5f 100%)",
    "linear-gradient(135deg, #ffa62e 0%, #ea4d2c 100%)",
    "linear-gradient(135deg, #f5ff82 0%, #2fd357 100%)",
    "linear-gradient(135deg, #00ff7f 0%, #00ba6c 100%)",
    "linear-gradient(135deg, #00ffed 0%, #00b8ba 100%)",
    "linear-gradient(135deg, #3499ff 0%, #3a3985 100%)",
    "linear-gradient(135deg, #954fec 0%, #584cd6 100%)",
    "linear-gradient(135deg, #f869d5 0%, #5650de 100%)",
];

export const DEFAULT_RADIAL_GRADIENT_COLORS: string[] = [
    "radial-gradient(100% 100% ellipse at 50% 50%, #FEB692 0%, #EA5455 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #FFE985 0%, #f7752c 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #81fbb8 0%, #2bc871 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #90f7ec 0%, #36cebe 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #5efce8 0%, #7275fd 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #72edf2 0%, #5255e5 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #43cbff 0%, #950ccd 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #ff6cab 0%, #7366ff 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #ff9482 0%, #7d77ff 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #f00b51 0%, #72005f 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #ffcda5 0%, #ee4d5f 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #ffa62e 0%, #ea4d2c 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #f5ff82 0%, #2fd357 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #00ff7f 0%, #00ba6c 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #00ffed 0%, #00b8ba 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #3499ff 0%, #3a3985 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #954fec 0%, #584cd6 100%)",
    "radial-gradient(100% 100% ellipse at 50% 50%, #f869d5 0%, #5650de 100%)",
];

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
