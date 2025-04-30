import type { Attribute } from "@tiptap/core";
import type { FontSizeAttrs } from "./index";

import "@tiptap/extension-text-style";
import { Extension } from "@tiptap/core";

import { getFontSizeFromElement, renderFontSizeAttributes } from "./utils";

/**
 * 字体大小扩展的配置选项
 */
export type FontSizeOptions = {
    types: string[];
};

/**
 * 声明 Tiptap 命令扩展
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            /**
             * 设置字体大小
             * @param fontSize - 字体大小值（如 "16px"）
             */
            setFontSize: (fontSize: string) => ReturnType;
            /**
             * 取消字体大小设置
             */
            unsetFontSize: () => ReturnType;
        };
    }
}

/**
 * 字体大小扩展
 */
export const FontSize = Extension.create<FontSizeOptions>({
    name: "fontSize",

    addOptions() {
        return {
            types: ["textStyle"],
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (el) => getFontSizeFromElement(el),
                        renderHTML: (attributes: FontSizeAttrs) => {
                            return renderFontSizeAttributes(attributes.fontSize || "");
                        },
                    },
                } as Record<AllKeys<FontSizeAttrs>, Attribute>,
            },
        ];
    },

    addCommands() {
        return {
            setFontSize:
                (fontSize) =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { fontSize }).run();
                },
            unsetFontSize:
                () =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
                },
        };
    },
});
