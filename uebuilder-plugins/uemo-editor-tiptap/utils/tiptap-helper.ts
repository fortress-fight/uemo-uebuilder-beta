/*
 * @Description: Tiptap 编辑器工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 10:53:08
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

/**
 * 获取边框样式
 * @param border 边框
 * @returns 边框样式
 */
export function resolveBorderStyle(border?: { width: string; color: string; style: string }) {
    const { width: borderWidth, color: borderColor, style: borderStyle } = border || {};
    return { borderWidth, borderColor, borderStyle };
}

/**
 * 解析边框样式
 * @param boxStyle 边框样式
 * @returns 边框样式
 */
export function parseBorderStyle(
    boxStyle: CSSStyleDeclaration | { borderStyle: string; borderColor: string; borderWidth: string }
): UE_EL_UTIL.BorderValue | undefined {
    const { borderStyle, borderColor, borderWidth } = boxStyle;
    return borderWidth
        ? {
              style: borderStyle,
              color: borderColor,
              width: borderWidth,
          }
        : undefined;
}

type TypeLinkValue =
    | {
          type: "link";
          link: string;
          target: "_blank" | "_self";
          triggerArea?: string;
      }
    | {
          type: "function";
          link: string;
          detail: "anchor" | "download" | "";
          triggerArea?: string;
      }
    | {
          type: "frame";
          link: string;
          triggerArea?: string;
          popLayer?: {
              width?: string;
          };
      };

/**
 * 获取链接数据
 * @param data 链接数据
 * @returns 链接数据
 */
export function transformLinkData(data?: TypeLinkValue) {
    if (!data) return {};

    const { link, type, triggerArea } = data;

    if (data.type === "frame") {
        return { type, link, triggerArea, target: undefined, detail: undefined, popLayer: data.popLayer };
    }

    if (data.type === "function") {
        return { type, link, triggerArea, target: undefined, detail: data.detail };
    }

    if (data.type === "link") {
        return { type, link, triggerArea, target: data.target, detail: undefined };
    }
    return {};
}

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写后的字符串
 */
export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
