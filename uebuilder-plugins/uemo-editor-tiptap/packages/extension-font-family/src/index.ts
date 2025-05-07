import type { Editor } from "@tiptap/core";

export type FontFamilyAttrs = { fontFamily?: string | null };

export function getFontFamilyAttrs(editor: Editor | undefined) {
    return editor?.getAttributes("textStyle") as FontFamilyAttrs;
}

export * from "./font-family";
