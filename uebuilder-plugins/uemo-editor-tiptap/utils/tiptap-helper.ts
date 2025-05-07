/*
 * @Description: Tiptap 编辑器工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-05-06 12:00:40
 */

/**
 * 判断是否是苹果系统
 * @returns {boolean} 是否是苹果系统
 */
const isAppleOS = () =>
    navigator.platform.includes("Mac") ||
    (navigator.userAgent.includes("AppleWebKit") && /Mobile\/\w+/.test(navigator.userAgent));

/**
 * 格式化键盘快捷键
 * @param {string} shortcut - 快捷键
 * @returns {string} 格式化后的快捷键
 */
export function formatKeyboardShortcut(shortcut?: string) {
    if (!shortcut) return;
    if (isAppleOS()) {
        return shortcut.replace("Mod", "⌘");
    } else {
        return shortcut.replace("Mod", "Ctrl");
    }
}
