import BoldButton from "../sub-component/BoldButton.vue";
import ItalicButton from "../sub-component/ItalicButton.vue";
import FormattingButton from "../sub-component/FormattingButton.vue";
import TextDecorationButton from "../sub-component/TextDecorationButton.vue";
import BlockquoteButton from "../sub-component/BlockquoteButton.vue";
import LinkButton from "../sub-component/LinkButton.vue";
import FontSizeButton from "../sub-component/FontSizeButton.vue";
import FontFamilyButton from "../sub-component/FontFamilyButton.vue";
import TextColorButton from "../sub-component/TextColorButton.vue";
import TextAlignButton from "../sub-component/TextAlignButton.vue";
import LineHeightButton from "../sub-component/LineHeightButton.vue";
import LetterSpacingButton from "../sub-component/LetterSpacingButton.vue";
import EditorAIButton from "../sub-component/EditorAIButton.vue";

export const MENU_BUTTON_MAP: Partial<Record<UE_TIPTAP_UNIT.OperItem, Component>> = {
    bold: BoldButton,
    italic: ItalicButton,
    formatting: FormattingButton,
    textDecoration: TextDecorationButton,
    blockquote: BlockquoteButton,
    link: LinkButton,
    fontSize: FontSizeButton,
    fontFamily: FontFamilyButton,
    textColor: TextColorButton,
    textAlign: TextAlignButton,
    lineHeight: LineHeightButton,
    letterSpacing: LetterSpacingButton,
    editorAI: EditorAIButton,
};

export const nodeMenuMap: Record<string, (UE_TIPTAP_UNIT.OperItem | "|")[]> = {
    shareRow: ["fontSize", "textAlign"],
    buttonRow: ["formatting", "|", "bold", "italic", "fontSize", "fontFamily", "textAlign", "lineHeight"],
    loopText: ["formatting", "|", "bold", "italic", "fontSize", "fontFamily", "textColor", "textAlign", "lineHeight"],
    effectText: ["formatting", "|", "bold", "italic", "fontSize", "fontFamily", "textColor", "textAlign", "lineHeight"],
    counterNumber: ["formatting", "|", "bold", "italic", "fontSize", "fontFamily", "textColor", "textAlign"],
};
