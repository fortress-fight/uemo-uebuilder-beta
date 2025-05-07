import type { Editor } from "@tiptap/core";
import type { fontScaleStorage } from "./index";

export const getFontScaleStorage = (editor: Editor): fontScaleStorage | undefined => {
    return editor.storage.fontScaleExtension;
};
