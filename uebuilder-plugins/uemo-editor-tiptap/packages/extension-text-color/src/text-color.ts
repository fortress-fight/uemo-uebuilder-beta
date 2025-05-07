/*
 * @Description: 文本颜色扩展
 * @Author: F-Stone
 * @LastEditTime: 2025-04-30 12:48:04
 */
import type { Attribute } from "@tiptap/core";
import type { TextColorAttrs } from "./index";

import { parseColorFromElement, renderColorAttributes } from "../utils/helper";

import "@tiptap/extension-text-style";

import { Extension } from "@tiptap/core";

/**
 * 文本颜色扩展的配置选项
 */
export type TextColorOptions = {
    types: string[];
    defaultColor: string | null;
};

/**
 * 声明 Tiptap 命令扩展
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        color: {
            /**
             * 设置文本颜色
             * @param color - 颜色值或渐变值
             */
            setColor: (color: string) => ReturnType;
            /**
             * 取消文本颜色设置
             */
            unsetColor: () => ReturnType;
        };
    }
}

/**
 * 文本颜色扩展
 */
export const TextColor = Extension.create<TextColorOptions>({
    name: "color",

    addOptions() {
        return {
            types: ["textStyle"],
            defaultColor: null,
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    color: {
                        default: this.options.defaultColor,
                        parseHTML: (element) => parseColorFromElement(element),
                        renderHTML: (attributes) => renderColorAttributes(attributes as TextColorAttrs),
                    } as Attribute,
                } as Record<keyof TextColorAttrs, Attribute>,
            },
        ];
    },

    addCommands() {
        return {
            setColor:
                (color) =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { color }).run();
                },
            unsetColor:
                () =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { color: null }).removeEmptyTextStyle().run();
                },
        };
    },
});
