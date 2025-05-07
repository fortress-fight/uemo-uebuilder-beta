import type { Editor } from "@tiptap/core";

export type FontSizeAttrs = { fontSize?: string | null };

export function getFontSizeAttrs(editor: Editor | undefined) {
    return editor?.getAttributes("textStyle") as FontSizeAttrs;
}

export * from "./font-size";
