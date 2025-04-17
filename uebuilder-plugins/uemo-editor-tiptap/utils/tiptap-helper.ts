/*
 * @Description: Tiptap 编辑器工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-04-18 02:20:21
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
export default function formatKeyboardShortcut(shortcut?: string) {
    if (!shortcut) return;
    if (isAppleOS()) {
        return shortcut.replace("Mod", "⌘");
    } else {
        return shortcut.replace("Mod", "Ctrl");
    }
}
