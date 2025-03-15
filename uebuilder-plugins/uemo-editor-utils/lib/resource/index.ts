/*
 * @Description: 字体库管理
 * @Author: F-Stone
 * @LastEditTime: 2025-03-16 02:03:48
 */

/**
 * 获取本地字体库
 *
 * @export
 * @return {*}  {{ name: string; src: string }[]}
 */
export function getLocalFontLib(): { name: string; src: string }[] {
    const fontLib = localStorage.getItem("localFontLib");

    try {
        return fontLib ? JSON.parse(fontLib) : [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

/**
 * 设置本地字体库
 *
 * @export
 * @param {({ name: string; src: string })[]} lib
 */
export function setLocalFontLib(lib: { name: string; src: string }[]) {
    localStorage.setItem("localFontLib", JSON.stringify(lib));
}
