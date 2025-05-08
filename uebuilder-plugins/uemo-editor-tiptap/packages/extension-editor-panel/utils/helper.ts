import type { Editor } from "@tiptap/core";
import type { EditorPanelHandler, EditorPanelAttrsMap } from "../src";

export const openAttrEditorPanel: EditorPanelHandler<keyof EditorPanelAttrsMap, void> = (type, attr, param) => {
    switch (type) {
        case "textDecoration":
            {
                const newValue = prompt("请输入划线提醒的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.setData(JSON.parse(newValue));
            }
            break;
        case "link":
            {
                const newValue = prompt("请输入链接的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.setData(JSON.parse(newValue));
            }
            break;
        default:
            break;
    }
};

export const getEditorPanelExtensionStorage = (
    editor: Editor
): {
    lastEditorPanelType: keyof EditorPanelAttrsMap | undefined;
} => {
    return editor.storage.editorPanelExtension;
};
