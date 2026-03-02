import type { Extensions } from "@tiptap/vue-3";
import type { AIExtensionOptions } from "../packages/extension-ai";

import { i18n } from "../src/i18n";

import $pageStyle from "../src/app.module.scss";

// #region 导入基础扩展

import History from "@tiptap/extension-history";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import GapCursor from "@tiptap/extension-gapcursor";
import DropCursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import HardBreak from "@tiptap/extension-hard-break";
import Typography from "@tiptap/extension-typography";

import { TextStyleKit } from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";

// #endregion

// #region 导入设备扩展

import { EditorPanelExtension } from "../packages/extension-editor-panel/src";
import { DeviceExtension } from "../packages/extension-device";
import { FontScaleExtension } from "../packages/extension-font-scale";
import { AIExtension } from "../packages/extension-ai";
import { Formatting } from "../packages/extension-formatting";
import { TextDecoration } from "../packages/extension-text-decoration/src";
import { Blockquote } from "../packages/extension-blockquote/src";
import { Link } from "../packages/extension-link/src";
import { EditingMark } from "../packages/extension-editing-mark";
import { FontSize } from "../packages/extension-font-size";
import { FontFamily } from "../packages/extension-font-family/src";
import { TextColor } from "../packages/extension-text-color/src";
import { TextAlign } from "../packages/extension-text-align/src";
import { LineHeight } from "../packages/extension-line-height/src";
import { LetterSpacing } from "../packages/extension-letter-spacing/src";
import { SlashMenu } from "../packages/extension-slash-menu/src";
import { Emoji } from "../packages/extension-emoji/src";
import { Placeholder } from "../packages/extension-placeholder";
import { NodePlaceholder } from "../packages/extension-node-placeholder/src";
import { NewLine } from "../packages/extension-new-line/src";
import { ButtonItem, ButtonRow } from "../packages/extension-button/src";
import { Image } from "../packages/extension-image/src";
import { DropUpload } from "../packages/extension-drop-upload/src";
import { CopyAttrsExtension } from "../packages/extension-copy-attrs/src";
import { SvgIcon } from "../packages/extension-svg-icon/src";
import { Frame } from "../packages/extension-frame/src";
import { SvgView } from "../packages/extension-svg-view/src";
import { Spline } from "../packages/extension-spline/src";
import { Lottie } from "../packages/extension-lottie/src";
import { GridGroup, GridItem } from "../packages/extension-grid/src";
import { DividerBlock } from "../packages/extension-divider-block/src";
import { HrRule } from "../packages/extension-hr-rule/src";
import { ShareRow, ShareItem } from "../packages/extension-share/src";
import { Table, TableHeader, TableRow, TableCell } from "../packages/extension-table/src";
import { EffectText } from "../packages/extension-effect-text/src";
import { CounterNumber } from "../packages/extension-counter-number/src";
import { LoopText } from "../packages/extension-loop-text/src";

// #endregion

export type CreateBubbleEditorExtensionParam = {
    defaultDevice?: UE_TIPTAP_UNIT.Device;
    showToast?: (type: "success" | "error", message: string) => void;
    openAttrEditorPanel?: UE_TIPTAP_EXTENSION.EditorPanel["openEditorPanelHandler"];
    closeAttrEditorPanel?: () => void;
    AIExtension?: AIExtensionOptions;
    createUploadHandler?: () => ReturnType<UE_EL_UTIL.UploadHandler> | undefined;
};

export function createBubbleEditorExtension(param: CreateBubbleEditorExtensionParam = {}): Extensions {
    const baseExtensions = [
        Document,
        Paragraph,
        Text,
        GapCursor,
        DropCursor.configure({
            color: "rgb(35, 131, 226)",
            width: 4,
            class: $pageStyle["drop-cursor"],
        }),
        Focus.configure({
            className: $pageStyle["has-focus"],
        }),
        HardBreak,
        Typography,
        Bold,
        Italic,
        TextStyleKit.configure({
            color: false,
            fontSize: false,
            lineHeight: false,
            fontFamily: false,
        }),
        History,
        Formatting,
    ];

    // 自定义插件
    const customExtensions = [
        EditorPanelExtension.configure({
            showToast: param.showToast,
            openAttrEditorPanel: param.openAttrEditorPanel,
            closeAttrEditorPanel: param.closeAttrEditorPanel,
        }),
        DeviceExtension.configure({
            defaultDevice: param.defaultDevice,
        }),
        FontScaleExtension,
        AIExtension.configure(param.AIExtension),
        TextDecoration,
        Blockquote,
        Link.configure({
            autolink: false,
        }),
        EditingMark,
        FontSize,
        FontFamily,
        TextColor,
        TextAlign,
        LineHeight,
        LetterSpacing,
        SlashMenu,
        Emoji,
        Placeholder.configure({
            placeholder: i18n.global.t("PLACEHOLDER_TEXT"),
        }),
        NodePlaceholder,
        NewLine,
        ButtonItem,
        ButtonRow,
        Image,
        DropUpload.configure({
            createUploadHandler: param.createUploadHandler,
        }),
        CopyAttrsExtension,
        SvgIcon,
        Frame,
        SvgView,
        Spline,
        Lottie,
        GridGroup,
        GridItem,
        DividerBlock,
        HrRule,
        ShareRow,
        ShareItem,
        Table,
        TableHeader,
        TableRow,
        TableCell,
        EffectText,
        CounterNumber,
        LoopText,
    ];

    return [...baseExtensions, ...customExtensions];
}
