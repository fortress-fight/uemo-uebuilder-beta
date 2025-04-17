import type { Editor } from "@tiptap/core";

export type FontFamilyAttr = {
    fontFamily?: string | null;
};

export function getFontFamilyAttrs(editor: Editor | undefined) {
    return editor?.getAttributes("fontFamily") as FontFamilyAttr;
}

export * from "./font-family";
