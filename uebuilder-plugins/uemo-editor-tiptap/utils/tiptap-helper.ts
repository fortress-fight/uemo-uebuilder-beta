import type { Editor } from "@tiptap/core";
import type { deviceStorage } from "../packages/extension-device";
import type { fontScaleStorage } from "../packages/extension-font-scale";
import type { AIStorage } from "../packages/extension-ai";

const getDeviceExtensionStorage = (editor: Editor): deviceStorage | undefined => {
    return editor.storage.deviceExtension;
};

const getFontScaleExtensionStorage = (editor: Editor): fontScaleStorage | undefined => {
    return editor.storage.fontScaleExtension;
};

const getAIExtensionStorage = (editor: Editor): AIStorage | undefined => {
    return editor.storage.AIExtension;
};

export { getDeviceExtensionStorage, getFontScaleExtensionStorage, getAIExtensionStorage };
