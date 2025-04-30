import type { Editor } from "@tiptap/core";
import type { DeviceStorage } from "./index";

export const getDeviceStorage = (editor: Editor): DeviceStorage | undefined => {
    return editor.storage.deviceExtension;
};
