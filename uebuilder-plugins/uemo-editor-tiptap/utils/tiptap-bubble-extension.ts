import type { Extensions } from "@tiptap/vue-3";

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

import TextStyle from "@tiptap/extension-text-style";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";

// #endregion

// #region 导入设备扩展

import { EditorPanelExtension } from "../packages/extension-editor-panel/src";
import { deviceExtension } from "../packages/extension-device";
import { fontScaleExtension } from "../packages/extension-font-scale";
import { AIExtension } from "../packages/extension-ai";
import { Formatting } from "../packages/extension-formatting";
import { TextDecoration } from "../packages/extension-text-decoration/src";
import { Blockquote } from "../packages/extension-blockquote/src";
import { Link } from "../packages/extension-link/src";
import { EditingMark } from "../packages/extension-editing-mark";
import { FontSize } from "../packages/extension-font-size";
import { FontFamily } from "../packages/extension-font-family/src";
import { TextColor } from "../packages/extension-text-color/src";

// #endregion

export type CreateBubbleEditorExtensionParam = {
    openAttrEditorPanel?: UE_TIPTAP_EXTENSION.openAttrEditorPanel<keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap>;
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
        TextStyle,
        History,
        Formatting,
    ];

    // 自定义插件
    const customExtensions = [
        EditorPanelExtension.configure({
            openAttrEditorPanel: param.openAttrEditorPanel,
        }),
        deviceExtension,
        fontScaleExtension,
        AIExtension,
        TextDecoration,
        Blockquote,
        Link.configure({
            autolink: false,
        }),
        EditingMark,
        FontSize,
        FontFamily,
        TextColor,
    ];

    return [...baseExtensions, ...customExtensions];
}
