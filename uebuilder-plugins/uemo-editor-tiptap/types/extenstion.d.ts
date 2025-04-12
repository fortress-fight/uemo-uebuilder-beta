import type { TextDecorationAttrs } from "../packages/extension-text-decoration/src";
import type { AttrEditorPanelHandler } from "../packages/extension-editor-panel/src";
import type { LinkAttrs } from "../packages/extension-link/src";

declare global {
    namespace UE_TIPTAP_EXTENSION {
        type TextDecorationAttr = TextDecorationAttrs;

        type AttrEditorPanelMap = {
            textDecoration: TextDecorationAttr;
            link: LinkAttrs;
        };

        type openAttrEditorPanel<T extends keyof AttrEditorPanelMap> = AttrEditorPanelHandler<T, void>;
    }
}
