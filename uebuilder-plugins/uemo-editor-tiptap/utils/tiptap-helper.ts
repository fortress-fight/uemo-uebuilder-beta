/*
 * @Description: Tiptap 编辑器工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-07-10 13:11:13
 */
import type { Attribute } from "@tiptap/core";

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

/**
 * 解析链接
 * @param value 链接数据
 * @returns 链接数据
 */
export function parseLink(value: {
    link?: string;
    linkType?: string;
    linkTarget?: string;
    linkDetail?: string;
    linkPopLayer?: { width?: string };
    triggerMethod?: string;
}): UE_EL_UTIL.LinkValue | undefined {
    if (!value.link) return undefined;
    switch (value.linkType) {
        case "frame":
            return {
                type: value.linkType,
                link: value.link,
                triggerArea: value.triggerMethod,
                popLayer: value.linkPopLayer,
            };
        case "function":
            return {
                type: value.linkType,
                link: value.link,
                detail: value.linkDetail as "anchor" | "download",
                triggerArea: value.triggerMethod,
            };
        case "link":
            return {
                type: value.linkType,
                link: value.link,
                target: value.linkTarget as "_blank" | "_self",
                triggerArea: value.triggerMethod,
            };
        default:
            return undefined;
    }
}

/**
 * 解析链接属性
 * @param value 链接数据
 * @returns 链接属性
 */
export function parseLinkTiptapAttr(value?: UE_EL_UTIL.LinkValue) {
    const modelValue = {} as {
        link: string;
        linkTarget: string;
        linkType?: string;
        linkDetail?: string;
        linkPopLayer?: { width?: string };
        triggerMethod?: string;
    };

    modelValue.link = value?.link || "";
    modelValue.linkType = value?.type || undefined;
    if (value?.type === "link") {
        modelValue.linkTarget = value?.target || undefined;
    }
    if (value?.type === "function") {
        modelValue.linkDetail = value?.detail || undefined;
    }
    if (value?.type === "frame") {
        modelValue.linkPopLayer = value?.popLayer || undefined;
    }
    modelValue.triggerMethod = value?.triggerArea;
    return modelValue;
}

/**
 * 获取属性配置
 * @param defaultAttrs 默认属性
 * @returns 属性配置
 */
export function getAttributesConfig<T extends Record<string, any>>(defaultAttrs: T) {
    const result = {} as Record<keyof T, Attribute>;

    Object.keys(defaultAttrs).forEach((key) => {
        result[key as keyof T] = { default: defaultAttrs[key as keyof T] };
    });

    return result;
}
