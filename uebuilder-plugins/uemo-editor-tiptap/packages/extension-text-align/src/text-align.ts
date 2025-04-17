/*
 * @Description: 文本对齐扩展
 * @Author: F-Stone
 * @LastEditTime: 2025-04-18 01:20:12
 */
import type { Attribute } from "@tiptap/core";
import type { TextAlignAttr } from "./index";
import type { TextAlignOptions } from "../utils/helper";

import {
    parseTextAlignFromElement,
    parseMoTextAlignFromElement,
    renderTextAlignAttributes,
    renderMoTextAlignAttributes,
} from "../utils/helper";

import { Extension } from "@tiptap/core";

/**
 * 声明 Tiptap 命令扩展
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        textAlign: {
            /**
             * 设置文本对齐方式
             * @param alignment - 对齐方式（left/center/right/justify）
             */
            setTextAlign: (alignment: string) => ReturnType;
            /**
             * 设置移动端文本对齐方式
             * @param alignment - 对齐方式（left/center/right/justify）
             */
            setMoTextAlign: (alignment: string) => ReturnType;
            /**
             * 取消文本对齐设置
             */
            unsetTextAlign: () => ReturnType;
        };
    }
}

/**
 * 文本对齐扩展
 */
export const TextAlign = Extension.create<TextAlignOptions>({
    name: "textAlign",

    addOptions() {
        return {
            types: ["paragraph"],
            alignments: ["left", "center", "right", "justify"],
            defaultAlignment: "left",
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    textAlign: {
                        default: this.options.defaultAlignment,
                        parseHTML: (element) => parseTextAlignFromElement(element, this.options),
                        renderHTML: (attributes) =>
                            renderTextAlignAttributes(attributes as TextAlignAttr, this.options.defaultAlignment),
                    } as Attribute,
                    moTextAlign: {
                        parseHTML: (element) => parseMoTextAlignFromElement(element),
                        renderHTML: (attributes) => renderMoTextAlignAttributes(attributes as TextAlignAttr),
                    } as Attribute,
                } as Record<keyof TextAlignAttr, Attribute>,
            },
        ];
    },

    addCommands() {
        return {
            setTextAlign:
                (alignment: string) =>
                ({ commands }) => {
                    if (!this.options.alignments.includes(alignment)) {
                        return false;
                    }

                    return this.options.types
                        .map((type) => commands.updateAttributes(type, { textAlign: alignment }))
                        .every((response) => response);
                },

            setMoTextAlign:
                (alignment: string) =>
                ({ commands }) => {
                    if (!this.options.alignments.includes(alignment)) {
                        return false;
                    }

                    return this.options.types
                        .map((type) => commands.updateAttributes(type, { moTextAlign: alignment }))
                        .every((response) => response);
                },

            unsetTextAlign:
                () =>
                ({ commands }) => {
                    return this.options.types
                        .map((type) => commands.resetAttributes(type, ["textAlign", "moTextAlign"]))
                        .every((response) => response);
                },
        };
    },

    addKeyboardShortcuts() {
        return {
            "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
            "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
            "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
            "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify"),
        };
    },
});
