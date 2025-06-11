import type { Editor } from "@tiptap/core";
import type { EditorPanelHandler, EditorPanelAttrsMap } from "../src";

export const openAttrEditorPanel: EditorPanelHandler<keyof EditorPanelAttrsMap, void> = (type, attr, param) => {
    switch (type) {
        case "textDecoration":
            {
                const newValue = prompt("请输入划线提醒的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.updateAttrs(JSON.parse(newValue));
            }
            break;
        case "link":
            {
                const newValue = prompt("请输入链接的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.updateAttrs(JSON.parse(newValue));
            }
            break;
        case "svgIcon":
            {
                const newValue = prompt("请输入 svgIcon 的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.updateAttrs(JSON.parse(newValue));
            }
            break;
        case "image":
            {
                const newValue = prompt("请输入图片的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.updateAttrs(JSON.parse(newValue));
            }
            break;
        case "buttonRow":
            {
                const newValue = prompt("请输入按钮行的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.updateAttrs(JSON.parse(newValue));
            }
            break;
        case "buttonItem":
            {
                const newValue = prompt("请输入按钮项的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.updateAttrs(JSON.parse(newValue));
            }
            break;
        case "frame":
            {
                const newValue = prompt("请输入 frame 的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.updateAttrs(JSON.parse(newValue));
            }
            break;
        case "svgView":
            {
                const newValue = prompt("请输入 svgView 的属性", JSON.stringify(attr));
                if (!newValue) return;
                param.updateAttrs(JSON.parse(newValue));
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
