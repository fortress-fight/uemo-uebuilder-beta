import type { Attribute } from "@tiptap/core";
import type { FontFamilyAttr } from "./index";

import { parseFontFamilyFromElement, renderFontFamilyAttributes } from "../utils/helper";

import "@tiptap/extension-text-style";

import { Extension } from "@tiptap/core";

/**
 * 字体家族扩展的配置选项
 */
export type FontFamilyOptions = {
    types: string[];
};

/**
 * 声明 Tiptap 命令扩展
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontFamily: {
            /**
             * 设置字体家族
             * @param fontFamily - 字体家族名称
             */
            setFontFamily: (fontFamily: string) => ReturnType;
            /**
             * 取消字体家族设置
             */
            unsetFontFamily: () => ReturnType;
        };
    }
}

/**
 * 字体家族扩展
 */
export const FontFamily = Extension.create<FontFamilyOptions>({
    name: "fontFamily",

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
                    fontFamily: {
                        default: undefined,
                        parseHTML: (el) => parseFontFamilyFromElement(el),
                        renderHTML: (attributes) => renderFontFamilyAttributes(attributes),
                    },
                } as Record<keyof FontFamilyAttr, Attribute>,
            },
        ];
    },

    addCommands() {
        return {
            setFontFamily:
                (fontFamily) =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { fontFamily }).run();
                },

            unsetFontFamily:
                () =>
                ({ chain }) => {
                    return chain().setMark("textStyle", { fontFamily: null }).removeEmptyTextStyle().run();
                },
        };
    },
});
