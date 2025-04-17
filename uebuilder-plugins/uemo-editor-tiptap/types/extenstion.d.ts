import type { TextDecorationAttrs } from "../packages/extension-text-decoration/src";
import type { AttrEditorPanelHandler } from "../packages/extension-editor-panel/src";
import type { LinkAttrs } from "../packages/extension-link/src";
import type { FontSizeAttr } from "../packages/extension-font-size";
declare global {
    namespace UE_TIPTAP_EXTENSION {
        type TextDecorationAttr = TextDecorationAttrs;
        type LinkAttr = LinkAttrs;

        type AttrEditorPanelMap = {
            textDecoration: TextDecorationAttr;
            link: LinkAttr;
            fontSize: FontSizeAttr;
        };

        type openAttrEditorPanel<T extends keyof AttrEditorPanelMap> = AttrEditorPanelHandler<T, void>;
    }
}
