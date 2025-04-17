import type { Editor } from "@tiptap/core";
import type { fontScaleStorage } from "../packages/extension-font-scale";

const getFontScaleExtensionStorage = (editor: Editor): fontScaleStorage | undefined => {
    return editor.storage.fontScaleExtension;
};

export { getFontScaleExtensionStorage };

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
