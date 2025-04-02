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

const isAppleOS = () =>
    navigator.platform.includes("Mac") ||
    (navigator.userAgent.includes("AppleWebKit") && /Mobile\/\w+/.test(navigator.userAgent));

export default function formatKeyboardShortcut(shortcut?: string) {
    if (!shortcut) return;
    if (isAppleOS()) {
        return shortcut.replace("Mod", "⌘");
    } else {
        return shortcut.replace("Mod", "Ctrl");
    }
}
