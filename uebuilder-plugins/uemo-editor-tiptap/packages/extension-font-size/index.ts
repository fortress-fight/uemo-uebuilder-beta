import type { Editor } from "@tiptap/core";

export type FontSizeAttr = {
    fontSize?: string | null;
};

export function getFontSizeAttrs(editor: Editor | undefined) {
    return editor?.getAttributes("textStyle") as FontSizeAttr;
}

export * from "./font-size";
