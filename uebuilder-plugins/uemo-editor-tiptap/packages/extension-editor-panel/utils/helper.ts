import type { AttrEditorPanelHandler } from "../src";

export const openAttrEditorPanel: AttrEditorPanelHandler<keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap, void> = (
    type,
    attr,
    param
) => {
    switch (type) {
        case "textDecoration":
            const newValue = prompt("请输入划线提醒的属性", JSON.stringify(attr));
            if (!newValue) return;
            param.setData(JSON.parse(newValue));
            break;
        default:
            break;
    }
};
