import type { TextDecorationAttrs } from "../packages/extension-text-decoration/src";
import type { AttrEditorPanelHandler } from "../packages/extension-editor-panel/src";
import type { LinkAttrs } from "../packages/extension-link/src";
import type { FontSizeAttr } from "../packages/extension-font-size";
import type { FontFamilyAttr } from "../packages/extension-font-family/src";
import type { TextColorAttr } from "../packages/extension-text-color/src";
import type { TextAlignAttr } from "../packages/extension-text-align/src";
import type { LineHeightAttr } from "../packages/extension-line-height/src";
import type { LetterSpacingAttr } from "../packages/extension-letter-spacing/src";

declare global {
    namespace UE_TIPTAP_EXTENSION {
        type TextDecorationAttr = TextDecorationAttrs;
        type LinkAttr = LinkAttrs;

        type AttrEditorPanelMap = {
            textDecoration: TextDecorationAttr;
            link: LinkAttr;
            fontSize: FontSizeAttr;
            fontFamily: FontFamilyAttr;
            textColor: TextColorAttr;
            textAlign: TextAlignAttr;
            lineHeight: LineHeightAttr;
            letterSpacing: LetterSpacingAttr;
        };

        type openAttrEditorPanel<T extends keyof AttrEditorPanelMap> = AttrEditorPanelHandler<T, void>;
    }
}
