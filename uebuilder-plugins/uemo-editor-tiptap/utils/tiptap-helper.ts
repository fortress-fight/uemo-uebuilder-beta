import type { Editor } from "@tiptap/core";
import type { fontScaleStorage } from "../packages/extension-font-scale";
import type { AIStorage } from "../packages/extension-ai";

const getFontScaleExtensionStorage = (editor: Editor): fontScaleStorage | undefined => {
    return editor.storage.fontScaleExtension;
};

const getAIExtensionStorage = (editor: Editor): AIStorage | undefined => {
    return editor.storage.AIExtension;
};

export { getFontScaleExtensionStorage, getAIExtensionStorage };

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
