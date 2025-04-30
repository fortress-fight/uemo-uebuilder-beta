import type { TextDecorationAttrs } from "../packages/extension-text-decoration/src";
import type { AttrEditorPanelHandler } from "../packages/extension-editor-panel/src";
import type { LinkAttrs } from "../packages/extension-link/src";
import type { FontSizeAttrs } from "../packages/extension-font-size";
import type { FontFamilyAttrs } from "../packages/extension-font-family/src";
import type { TextColorAttrs } from "../packages/extension-text-color/src";
import type { TextAlignAttrs } from "../packages/extension-text-align/src";
import type { LineHeightAttrs } from "../packages/extension-line-height/src";
import type { LetterSpacingAttrs } from "../packages/extension-letter-spacing/src";

declare global {
    namespace UE_TIPTAP_EXTENSION {
        type AttrEditorPanelMap = {
            textDecoration: TextDecorationAttrs;
            link: LinkAttrs;
            fontSize: FontSizeAttrs;
            fontFamily: FontFamilyAttrs;
            textColor: TextColorAttrs;
            textAlign: TextAlignAttrs;
            lineHeight: LineHeightAttrs;
            letterSpacing: LetterSpacingAttrs;
            editorAI: { type: string };
        };

        type OpenAttrEditorPanel<T extends keyof AttrEditorPanelMap> = AttrEditorPanelHandler<T, void>;
    }
}
