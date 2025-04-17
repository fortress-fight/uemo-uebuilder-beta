import type { Editor } from "@tiptap/core";
import type { deviceStorage } from "./index";

export const getDeviceStorage = (editor: Editor): deviceStorage | undefined => {
    return editor.storage.deviceExtension;
};
