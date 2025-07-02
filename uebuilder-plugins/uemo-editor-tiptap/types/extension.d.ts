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
import type { FrameAttrs, VideoFrameAttrs, MapFrameAttrs, WebFrameAttrs } from "../packages/extension-frame/src";
import type { SvgViewerAttrs } from "../packages/extension-svg-view/src";
import type { SplineAttrs } from "../packages/extension-spline/src";
import type { LottieAttrs } from "../packages/extension-lottie/src";
import type { GridGroupAttrs } from "../packages/extension-grid/src";
import type { GridItemAttrs } from "../packages/extension-grid/src";
import type { DividerBlockAttrs } from "../packages/extension-divider-block/src";
import type { HrRuleAttrs } from "../packages/extension-hr-rule/src";
import type { ShareItemAttrs, ShareRowAttrs } from "../packages/extension-share/src";

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

        type VideoFrame = {
            attrs: VideoFrameAttrs;
        };
        type MapFrame = {
            attrs: MapFrameAttrs;
        };
        type WebFrame = {
            attrs: WebFrameAttrs;
        };
        type Frame = {
            attrs: FrameAttrs;
        };
        type SvgView = {
            attrs: SvgViewerAttrs;
        };
        type Spline = {
            attrs: SplineAttrs;
        };
        type Lottie = {
            attrs: LottieAttrs;
        };
        type GridGroup = {
            attrs: GridGroupAttrs;
        };
        type GridItem = {
            attrs: GridItemAttrs;
        };
        type DividerBlock = {
            attrs: DividerBlockAttrs;
        };
        type HrRule = {
            attrs: HrRuleAttrs;
        };
        type ShareRow = {
            attrs: ShareRowAttrs;
        };
        type ShareItem = {
            attrs: ShareItemAttrs;
        };
    }
}
