import type { TextDecorationAttrs } from "../packages/extension-text-decoration/src";
import type { AttrEditorPanelHandler } from "../packages/extension-editor-panel/src";

declare global {
    namespace UE_TIPTAP_EXTENSION {
        type TextDecorationAttr = TextDecorationAttrs;

        type AttrEditorPanelMap = {
            textDecoration: TextDecorationAttr;
        };

        type openAttrEditorPanel = AttrEditorPanelHandler<keyof AttrEditorPanelMap, void>;
    }
}
