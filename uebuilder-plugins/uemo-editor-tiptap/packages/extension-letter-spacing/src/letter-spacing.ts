/**
 * 字间距扩展模块
 * 提供文本字间距设置功能，支持设置和取消字间距
 * @module LetterSpacing
 */

import type { Attribute } from "@tiptap/core";
import type { LetterSpacingAttr } from "./index";

import "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";

/**
 * 字间距扩展配置选项
 */
export interface LetterSpacingOptions {
    /**
     * 支持字间距的节点类型列表
     * @default ["textStyle"]
     */
    types: string[];
}

/**
 * 扩展 Tiptap 命令接口，添加字间距相关命令
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        letterSpace: {
            /**
             * 设置文本字间距
             * @param size - 字间距值，支持 CSS 单位（如 px, em, rem 等）
             * @returns 命令执行结果
             */
            setLetterSpacing: (size: string) => ReturnType;

            /**
             * 取消文本字间距设置
             * @returns 命令执行结果
             */
            unsetLetterSpacing: () => ReturnType;
        };
    }
}

/**
 * 字间距扩展
 * 提供设置和取消字间距的功能
 */
export const LetterSpacing = Extension.create<LetterSpacingOptions>({
    name: "letterSpacing",

    /**
     * 添加默认配置选项
     */
    addOptions() {
        return {
            types: ["textStyle"],
        };
    },

    /**
     * 添加全局属性
     * 为指定类型的节点添加字间距属性支持
     */
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    letterSpacing: {
                        default: null,
                        parseHTML: (element) => element.style.letterSpacing,
                        renderHTML: (attributes) => {
                            if (!attributes.letterSpacing) {
                                return {};
                            }

                            return {
                                style: `letter-spacing: ${attributes.letterSpacing}`,
                            };
                        },
                    },
                } as Record<keyof LetterSpacingAttr, Attribute>,
            },
        ];
    },

    /**
     * 添加命令
     * 提供设置和取消字间距的命令
     */
    addCommands() {
        return {
            setLetterSpacing:
                (letterSpacing: string) =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { letterSpacing }).run();
                },

            unsetLetterSpacing:
                () =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { letterSpacing: null }).removeEmptyTextStyle().run();
                },
        };
    },
});
