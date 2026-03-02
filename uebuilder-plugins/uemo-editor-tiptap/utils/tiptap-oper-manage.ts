import { i18n } from "../src/i18n";

const { t } = i18n.global;

type OperInfo = {
    title: string;
    subtitle?: string;
    shortcut?: string;
    icon?: string;
    tip?: string;
    buttonType?: "iconButton" | "textButton" | "colorButton";
};

const operManage = {
    // #region 文字相关操作

    insertText: {
        tip: t("TIP_INSERT_TEXT"),
        title: t("NODE_TEXT"),
        subtitle: t("NODE_TEXT_DESC"),
        icon: "ue-tiptap-font",
    },
    bold: { title: t("OPER_BOLD"), shortcut: "Mod+B", icon: "ue-tiptap-bold", buttonType: "iconButton" },
    italic: { title: t("OPER_ITALIC"), shortcut: "Mod+I", icon: "ue-tiptap-italic", buttonType: "iconButton" },
    textDecoration: { title: t("OPER_TEXT_DECORATION"), icon: "ue-tiptap-svg-line", buttonType: "iconButton" },
    blockquote: {
        title: t("OPER_BLOCKQUOTE"),
        shortcut: "Mod-Shift-B",
        icon: "ue-tiptap-quotes",
        buttonType: "iconButton",
    },
    fontSize: { title: t("OPER_FONT_SIZE"), buttonType: "textButton" },
    fontFamily: { title: t("OPER_FONT_FAMILY"), buttonType: "textButton" },
    textColor: { title: t("OPER_TEXT_COLOR"), buttonType: "colorButton" },
    lineHeight: { title: t("OPER_LINE_HEIGHT"), icon: "ue-tiptap-line-height", buttonType: "iconButton" },
    letterSpacing: { title: t("OPER_LETTER_SPACING"), icon: "ue-tiptap-letter-spacing", buttonType: "iconButton" },
    fontScale: { title: t("OPER_FONT_SCALE"), icon: "ue-tiptap-font-scale", buttonType: "iconButton" },

    // #endregion

    // #region 文字对齐方式操作

    textAlign: { title: t("OPER_TEXT_ALIGN"), buttonType: "textButton" },
    textAlignLeft: {
        title: t("OPER_TEXT_ALIGN_LEFT"),
        shortcut: "Mod-Shift-L",
        icon: "ue-tiptap-text-left",
        buttonType: "iconButton",
    },
    textAlignCenter: {
        title: t("OPER_TEXT_ALIGN_CENTER"),
        shortcut: "Mod-Shift-E",
        icon: "ue-tiptap-text-center",
        buttonType: "iconButton",
    },
    textAlignRight: {
        title: t("OPER_TEXT_ALIGN_RIGHT"),
        shortcut: "Mod-Shift-R",
        icon: "ue-tiptap-text-right",
        buttonType: "iconButton",
    },

    // #endregion

    // #region 媒体类型

    insertSvgIcon: {
        title: t("NODE_ICON"),
        subtitle: t("NODE_ICON_DESC"),
        tip: t("TIP_INSERT_ICON"),
        icon: "ue-tiptap-icon",
    },
    insertEmoji: {
        tip: t("TIP_INSERT_EMOJI"),
        title: t("NODE_EMOJI"),
        subtitle: t("NODE_EMOJI_DESC"),
        icon: "ue-tiptap-emoji",
    },
    insertSpline: {
        title: t("NODE_SPLINE"),
        subtitle: t("NODE_SPLINE_DESC"),
        tip: t("TIP_INSERT_SPLINE"),
        icon: "ue-tiptap-spline",
    },
    insertLottie: {
        title: t("NODE_LOTTIE"),
        subtitle: t("NODE_LOTTIE_DESC"),
        tip: t("TIP_INSERT_LOTTIE"),
        icon: "ue-tiptap-lottie",
    },
    insertSvgViewer: {
        title: t("NODE_SVG"),
        subtitle: t("NODE_SVG_DESC"),
        tip: t("TIP_INSERT_SVG"),
        icon: "ue-tiptap-svg",
    },

    // #endregion

    // #region 链接

    link: { title: t("OPER_LINK"), shortcut: "Mod-K", icon: "ue-tiptap-link", buttonType: "iconButton" },
    insertButton: {
        title: t("NODE_BUTTON"),
        subtitle: t("NODE_BUTTON_DESC"),
        tip: t("TIP_INSERT_BUTTON"),
        icon: "ue-tiptap-button",
    },

    // #endregion

    // #region 社交

    insertShareItem: {
        title: t("NODE_SOCIAL"),
        subtitle: t("NODE_SOCIAL_DESC"),
        tip: t("TIP_INSERT_SHARE"),
        icon: "ue-tiptap-share",
    },

    // #endregion

    insertLoopText: {
        title: t("NODE_LOOP_TEXT"),
        subtitle: t("NODE_LOOP_TEXT_DESC"),
        tip: t("TIP_INSERT_LOOP_TEXT"),
        icon: "ue-tiptap-loop-text",
    },
    insertEffectText: {
        title: t("NODE_EFFECT_TEXT"),
        subtitle: t("NODE_EFFECT_TEXT_DESC"),
        tip: t("TIP_INSERT_EFFECT_TEXT"),
        icon: "ue-tiptap-effect-text",
    },
    insertCounterNumber: {
        title: t("NODE_COUNTER"),
        subtitle: t("NODE_COUNTER_DESC"),
        tip: t("TIP_INSERT_COUNTER"),
        icon: "ue-tiptap-counter-number",
    },

    // #region 媒体类型

    insertVideoFrame: {
        title: t("NODE_VIDEO"),
        subtitle: t("NODE_VIDEO_DESC"),
        tip: t("TIP_INSERT_VIDEO"),
        icon: "ue-tiptap-video",
    },
    insertMapFrame: {
        title: t("NODE_MAP"),
        subtitle: t("NODE_MAP_DESC"),
        tip: t("TIP_INSERT_MAP"),
        icon: "ue-tiptap-map",
    },
    insertWebFrame: {
        title: t("NODE_WEB"),
        subtitle: t("NODE_WEB_DESC"),
        tip: t("TIP_INSERT_WEB"),
        icon: "ue-tiptap-web",
    },

    // #endregion

    // #region 结构类型

    insertDividerBlock: {
        title: t("NODE_DIVIDER_BLOCK"),
        subtitle: t("NODE_DIVIDER_BLOCK_DESC"),
        tip: t("TIP_INSERT_DIVIDER_BLOCK"),
        icon: "ue-tiptap-divider-block",
    },

    // #endregion

    // #region 工具

    editorAI: { title: t("PLUGIN_AI_TOOL"), icon: "ue-tiptap-ai", buttonType: "iconButton" },

    // #endregion

    // #region 基础控件

    add: { title: t("OPER_ADD"), icon: "ue-tiptap-add", buttonType: "iconButton" },
    copyNode: { title: t("OPER_COPY"), icon: "ue-tiptap-copy", buttonType: "iconButton" },
    editor: { title: t("OPER_EDIT"), icon: "ue-tiptap-image-setting", buttonType: "iconButton" },
    replaceNode: { title: t("OPER_REPLACE"), icon: "ue-tiptap-paste", buttonType: "iconButton" },
    deleteNode: { title: t("OPER_DELETE"), icon: "ue-tiptap-trash", buttonType: "iconButton" },
    formatting: { title: t("OPER_FORMATTING"), icon: "ue-tiptap-remove-style", buttonType: "iconButton" },
    delete: { title: t("OPER_DELETE"), icon: "ue-tiptap-trash" },
    selectParent: { title: t("OPER_SELECT_PARENT"), icon: "ue-tiptap-to-parent", buttonType: "iconButton" },
    insertNewLineBefore: {
        title: t("OPER_INSERT_NEW_LINE_BEFORE"),
        icon: "ue-tiptap-hard-break-before",
        buttonType: "iconButton",
    },
    insertNewLineAfter: {
        title: t("OPER_INSERT_NEW_LINE_AFTER"),
        icon: "ue-tiptap-hard-break",
        buttonType: "iconButton",
    },
    moreOper: { title: t("OPER_MORE"), icon: "ue-tiptap-more", buttonType: "iconButton" },
    hardBreak: { title: t("OPER_HARD_BREAK"), icon: "ue-tiptap-hard-break" },
    removeSetting: { title: t("OPER_REMOVE_SETTING"), icon: "ue-tiptap-trash", buttonType: "iconButton" },

    // #endregion

    // #region 表格相关

    inertTable: {
        title: t("NODE_TABLE"),
        subtitle: t("NODE_TABLE_DESC"),
        tip: t("TIP_INSERT_TABLE"),
        icon: "ue-tiptap-table",
    },

    // 表格操作
    toggleTableBorder: { title: t("OPER_TOGGLE_TABLE_BORDER"), buttonType: "iconButton" },
    selectTable: { title: t("OPER_SELECT_TABLE"), icon: "ue-tiptap-select-table", buttonType: "iconButton" },
    removeTable: { title: t("OPER_REMOVE_TABLE"), icon: "ue-tiptap-trash", buttonType: "iconButton" },
    tableBorderColor: { title: t("OPER_TABLE_BORDER_COLOR"), buttonType: "colorButton" },
    deleteTable: { title: t("OPER_DELETE_TABLE"), icon: "ue-tiptap-trash", buttonType: "iconButton" },

    // 单元格操作
    tableScale: { title: t("OPER_TABLE_SCALE"), icon: "ue-tiptap-table-scale", buttonType: "iconButton" },
    tableWidth: { title: t("OPER_TABLE_WIDTH"), icon: "ue-tiptap-width", buttonType: "iconButton" },
    tableMinWidth: { title: t("OPER_TABLE_MIN_WIDTH"), icon: "ue-tiptap-min-width", buttonType: "iconButton" },
    tableCellBackground: { title: t("OPER_TABLE_CELL_BG"), buttonType: "colorButton" },
    tableCellAlign: { title: t("OPER_TABLE_CELL_ALIGN"), buttonType: "iconButton" },
    mergeTableCell: { title: t("OPER_MERGE_TABLE_CELL"), icon: "ue-tiptap-cell-merge", buttonType: "iconButton" },
    resetColWidth: { title: t("OPER_RESET_COL_WIDTH"), icon: "ue-tiptap-remove-style", buttonType: "iconButton" },

    // 行操作
    selectRow: { title: t("OPER_SELECT_ROW"), icon: "ue-tiptap-table-row", buttonType: "iconButton" },
    deleteRow: { title: t("OPER_DELETE_ROW"), icon: "ue-tiptap-trash", buttonType: "iconButton" },
    addRowBefore: {
        title: t("OPER_ADD_ROW_BEFORE"),
        icon: "ue-tiptap-table-insert-row-before",
        buttonType: "iconButton",
    },
    addRowAfter: {
        title: t("OPER_ADD_ROW_AFTER"),
        icon: "ue-tiptap-table-insert-row-after",
        buttonType: "iconButton",
    },

    // 列操作
    selectCol: { title: t("OPER_SELECT_COL"), icon: "ue-tiptap-table-col", buttonType: "iconButton" },
    deleteColumn: { title: t("OPER_DELETE_COLUMN"), icon: "ue-tiptap-trash", buttonType: "iconButton" },
    addColumnBefore: {
        title: t("OPER_ADD_COLUMN_BEFORE"),
        icon: "ue-tiptap-table-insert-col-before",
        buttonType: "iconButton",
    },
    addColumnAfter: {
        title: t("OPER_ADD_COLUMN_AFTER"),
        icon: "ue-tiptap-table-insert-col-after",
        buttonType: "iconButton",
    },

    // #endregion

    // #region 分隔线

    insertHrRule: {
        title: t("NODE_HR"),
        subtitle: t("NODE_HR_DESC"),
        tip: t("TIP_INSERT_HR"),
        icon: "ue-tiptap-divider-solid",
    },
    toggleHrStyle: { title: t("OPER_TOGGLE_HR_STYLE"), buttonType: "iconButton" },
    hrColor: { title: t("OPER_HR_COLOR"), buttonType: "colorButton" },

    // #endregion

    // #region 网格相关

    insertGridGroup: {
        title: t("NODE_GRID"),
        subtitle: t("NODE_GRID_DESC"),
        tip: t("TIP_INSERT_GRID"),
        icon: "ue-tiptap-grid-layer",
    },
    selectGridGroup: { title: t("OPER_SELECT_GRID_GROUP"), icon: "ue-tiptap-to-parent", buttonType: "iconButton" },

    // #endregion

    // #region 图片相关

    insertImage: {
        title: t("NODE_IMAGE"),
        subtitle: t("NODE_IMAGE_DESC"),
        tip: t("TIP_INSERT_IMAGE"),
        icon: "ue-tiptap-image-add",
    },
    replaceImage: { title: t("OPER_REPLACE_IMAGE"), icon: "ue-tiptap-repace-image", buttonType: "iconButton" },

    // #endregion

    // #region 按钮相关

    // #endregion

    // #region 表格相关

    tableRowAlign: { title: t("OPER_TABLE_CELL_ALIGN"), buttonType: "iconButton" },
    tableColAlign: { title: t("OPER_TABLE_CELL_ALIGN"), buttonType: "iconButton" },

    // #endregion
} as const;

export type UeTiptapOperItem = keyof typeof operManage;

const operMap: Record<UeTiptapOperItem, OperInfo> = operManage;

export { operMap };
