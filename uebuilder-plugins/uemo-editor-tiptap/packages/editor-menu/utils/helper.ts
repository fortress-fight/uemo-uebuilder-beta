import BoldButton from "../sub-component/BoldButton.vue";
import ItalicButton from "../sub-component/ItalicButton.vue";
import FormattingButton from "../sub-component/FormattingButton.vue";
import TextDecorationButton from "../sub-component/TextDecorationButton.vue";
import BlockquoteButton from "../sub-component/BlockquoteButton.vue";
import LinkButton from "../sub-component/LinkButton.vue";
import FontSizeButton from "../sub-component/FontSizeButton.vue";

export const MENU_BUTTON_MAP: Partial<Record<UE_TIPTAP_UNIT.OperItem, Component>> = {
    bold: BoldButton,
    italic: ItalicButton,
    formatting: FormattingButton,
    textDecoration: TextDecorationButton,
    blockquote: BlockquoteButton,
    link: LinkButton,
    fontSize: FontSizeButton,
};
