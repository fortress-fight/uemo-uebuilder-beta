/*
 * @Description: 行高扩展
 * @Author: F-Stone
 * @LastEditTime: 2025-04-30 12:46:34
 */

import type { Attribute } from "@tiptap/core";
import type { LineHeightAttrs } from "./index";

import "@tiptap/extension-text-style";

import { Extension } from "@tiptap/core";
import { parseLineHeightFromElement, renderLineHeightAttributes } from "../utils/helper";

/**
 * 行高扩展的配置选项
 */
export type LineHeightOptions = {
    types: string[];
};

/**
 * 声明 Tiptap 命令扩展
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        lineHeight: {
            /**
             * 设置行高
             * @param lineHeight - 行高值
             */
            setLineHeight: (lineHeight: string) => ReturnType;
            /**
             * 取消行高设置
             */
            unsetLineHeight: () => ReturnType;
        };
    }
}

/**
 * 行高扩展
 */
export const LineHeight = Extension.create<LineHeightOptions>({
    name: "lineHeight",

    addGlobalAttributes() {
        return [
            {
                types: ["paragraph"],
                attributes: {
                    lineHeight: {
                        default: null,
                        parseHTML: (element) => parseLineHeightFromElement(element),
                        renderHTML: (attributes) => renderLineHeightAttributes(attributes as LineHeightAttrs),
                    } as Attribute,
                } as Record<keyof LineHeightAttrs, Attribute>,
            },
        ];
    },

    addCommands() {
        return {
            setLineHeight:
                (lineHeight) =>
                ({ commands }) => {
                    return commands.updateAttributes("paragraph", {
                        lineHeight,
                    });
                },
            unsetLineHeight:
                () =>
                ({ commands }) => {
                    return commands.updateAttributes("paragraph", {
                        lineHeight: null,
                    });
                },
        };
    },
});
