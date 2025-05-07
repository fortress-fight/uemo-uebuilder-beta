import type { Editor } from "@tiptap/core";
import type { AIStorage } from "./index";

export const getAIStorage = (editor: Editor): AIStorage | undefined => {
    return editor.storage.AIExtension;
};
