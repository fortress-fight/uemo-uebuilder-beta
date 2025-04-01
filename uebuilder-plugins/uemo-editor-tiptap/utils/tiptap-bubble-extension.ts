import type { Extensions } from "@tiptap/vue-3";

import $pageStyle from "../src/app.module.scss";

// #region 导入基础扩展

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

import { deviceExtension } from "../packages/extension-device";
import { fontScaleExtension } from "../packages/extension-font-scale";
import { AIExtension } from "../packages/extension-ai";

// #endregion

export function createBubbleEditorExtension(): Extensions {
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
    ];

    const customExtensions = [deviceExtension, fontScaleExtension, AIExtension];

    return [...baseExtensions, ...customExtensions];
}
