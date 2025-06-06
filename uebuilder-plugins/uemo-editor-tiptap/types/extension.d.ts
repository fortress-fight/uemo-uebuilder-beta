import type { TextDecorationAttrs } from "../packages/extension-text-decoration/src";
import type { LinkAttrs } from "../packages/extension-link/src";
import type { FontSizeAttrs } from "../packages/extension-font-size";
import type { FontFamilyAttrs } from "../packages/extension-font-family/src";
import type { TextColorAttrs } from "../packages/extension-text-color/src";
import type { TextAlignAttrs } from "../packages/extension-text-align/src";
import type { LineHeightAttrs } from "../packages/extension-line-height/src";
import type { LetterSpacingAttrs } from "../packages/extension-letter-spacing/src";
import type { EditorPanelAttrsMap, OpenEditorPanelHandler } from "../packages/extension-editor-panel/src";
import type { ButtonRowAttrs, ButtonItemAttrs } from "../packages/extension-button/src";
import type { ImageAttrs } from "../packages/extension-image/src";
import type { SvgIconAttrs } from "../packages/extension-svg-icon/src";
import type { FrameAttrs } from "../packages/extension-frame/src";

declare global {
    namespace UE_TIPTAP_EXTENSION {
        type TextDecoration = {
            attrs: TextDecorationAttrs;
        };
        type Link = {
            attrs: LinkAttrs;
        };
        type FontSize = {
            attrs: FontSizeAttrs;
        };
        type FontFamily = {
            attrs: FontFamilyAttrs;
        };
        type TextColor = {
            attrs: TextColorAttrs;
        };
        type TextAlign = {
            attrs: TextAlignAttrs;
        };
        type LineHeight = {
            attrs: LineHeightAttrs;
        };
        type LetterSpacing = {
            attrs: LetterSpacingAttrs;
        };
        type EditorAI = {
            attrs: { type: string };
        };
        type EditorPanel<T extends keyof EditorPanelAttrsMap = keyof EditorPanelAttrsMap> = {
            panelAttrsMap: EditorPanelAttrsMap;
            openEditorPanelHandler: OpenEditorPanelHandler<T>;
        };
        type ButtonRow = {
            attrs: ButtonRowAttrs;
        };
        type ButtonItem = {
            attrs: ButtonItemAttrs;
        };
        type Image = {
            attrs: ImageAttrs;
        };
        type SvgIcon = {
            attrs: SvgIconAttrs;
        };
        type Frame = {
            attrs: FrameAttrs;
        };
    }
}
