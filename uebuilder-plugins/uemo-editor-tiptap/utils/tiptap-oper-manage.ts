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

    text: { tip: "插入文本", title: "文本", subtitle: "Text", icon: "icon-editor-font" },
    bold: { title: "加粗", shortcut: "Mod+B", icon: "icon-editor-bold", buttonType: "iconButton" },
    italic: { title: "斜体", shortcut: "Mod+I", icon: "icon-editor-italic", buttonType: "iconButton" },
    textDecoration: { title: "文字装饰", icon: "icon-editor-svg-line", buttonType: "iconButton" },
    blockquote: { title: "引用", shortcut: "Mod-Shift-B", icon: "icon-editor-quotes", buttonType: "iconButton" },
    fontSize: { title: "字号", buttonType: "textButton" },
    fontFamily: { title: "字体", buttonType: "textButton" },
    textColor: { title: "文字颜色", buttonType: "colorButton" },
    lineHeight: { title: "文字行高", icon: "icon-editor-line-height", buttonType: "iconButton" },
    letterSpacing: { title: "字符间距", icon: "icon-editor-letter-spacing", buttonType: "iconButton" },
    fontScale: { title: "字体缩放", icon: "icon-editor-font-scale", buttonType: "iconButton" },

    // #endregion

    // #region 文字对齐方式操作

    textAlign: { title: "文字对齐方式", buttonType: "textButton" },
    textAlignLeft: {
        title: "文字居左",
        shortcut: "Mod-Shift-L",
        icon: "icon-editor-text-left",
        buttonType: "iconButton",
    },
    textAlignCenter: {
        title: "文字居中",
        shortcut: "Mod-Shift-E",
        icon: "icon-editor-text-center",
        buttonType: "iconButton",
    },
    textAlignRight: {
        title: "文字居右",
        shortcut: "Mod-Shift-R",
        icon: "icon-editor-text-right",
        buttonType: "iconButton",
    },

    // #endregion

    // #region 媒体类型

    insertSvgIcon: { title: "图标", subtitle: "Icon", tip: "插入图标", icon: "icon-editor-icon" },
    insertEmoji: {
        tip: "插入 Emoji",
        title: "表情符号",
        subtitle: "Emoji",
        icon: "icon-editor-emoji",
    },
    insertSpline: { title: "Spline", subtitle: "3D 效果展示", tip: "插入 Spline", icon: "icon-editor-spline" },
    insertLottie: { title: "Lottie", subtitle: "Lottie 动画展示", tip: "插入 Lottie", icon: "icon-editor-lottie" },
    insertSvgViewer: { title: "SVG", subtitle: "SVG 展示", tip: "插入 SVG", icon: "icon-editor-svg" },

    // #endregion

    // #region 链接

    link: { title: "链接", shortcut: "Mod-K", icon: "icon-editor-link", buttonType: "iconButton" },
    insertButton: { title: "按钮", subtitle: "Button", tip: "插入按钮", icon: "icon-editor-button" },

    // #endregion

    // #region 社交

    insertShare: { title: "社交", subtitle: "Social Contact", tip: "插入社交按钮", icon: "icon-editor-share" },

    // #endregion

    insertLoopText: {
        title: "文字循环",
        subtitle: "Loop Text",
        tip: "插入文字循环",
        icon: "icon-editor-loop-text",
    },
    insertEffectText: {
        title: "特效文字",
        subtitle: "Effect Text",
        tip: "插入特效文字",
        icon: "icon-editor-effect-text",
    },
    insertCounterNumber: {
        title: "计数器",
        subtitle: "Count Up",
        tip: "插入计数器",
        icon: "icon-editor-counter-number",
    },

    // #region frame

    insertVideoFrame: { title: "视频", subtitle: "Video", tip: "嵌入视频", icon: "icon-editor-video" },
    insertMapFrame: { title: "地图", subtitle: "Map", tip: "嵌入地图", icon: "icon-editor-map" },
    insertWebFrame: { title: "网页", subtitle: "Web", tip: "嵌入网页", icon: "icon-editor-web" },

    // #endregion

    // #region 结构类型

    insertDividerBlock: {
        title: "分隔块",
        subtitle: "Divider Block",
        tip: "分隔块",
        icon: "icon-editor-divider-block",
    },

    // #endregion

    // #region 工具

    editorAI: { title: "智能AI编辑工具", icon: "icon-editor-ai", buttonType: "iconButton" },

    // #endregion

    // #region 基础控件

    add: { title: "增加按钮", icon: "icon-editor-add", buttonType: "iconButton" },
    copy: { title: "复制", icon: "icon-editor-copy", buttonType: "iconButton" },
    editor: { title: "编辑", icon: "icon-editor-image-setting", buttonType: "iconButton" },
    replace: { title: "替换", buttonType: "textButton" },
    deleteNode: { title: "移除", icon: "icon-editor-trash", buttonType: "iconButton" },
    formatting: { title: "清除格式", icon: "icon-editor-remove-style", buttonType: "iconButton" },
    delete: { title: "删除", icon: "icon-editor-trash" },
    selectParent: { title: "选中上级", icon: "icon-editor-to-parent", buttonType: "iconButton" },
    insertNewLineBefore: { title: "在前插入新行", icon: "icon-editor-hard-break-before", buttonType: "iconButton" },
    insertNewLineAfter: { title: "在后插入新行", icon: "icon-editor-hard-break", buttonType: "iconButton" },
    moreOper: { title: "更多", icon: "icon-editor-more", buttonType: "iconButton" },
    hardBreak: { title: "添加换行", icon: "icon-editor-hard-break" },
    removeSetting: { title: "清除当前设置", icon: "icon-editor-trash", buttonType: "iconButton" },

    // #endregion

    // #region 表格相关

    inertTable: { title: "表格", subtitle: "Table", tip: "插入表格", icon: "icon-editor-table" },

    // 表格操作
    toggleTableBorder: { title: "切换边框显示", buttonType: "iconButton" },
    selectTable: { title: "选中表格", icon: "icon-editor-select-table", buttonType: "iconButton" },
    removeTable: { title: "移除表格", icon: "icon-editor-trash", buttonType: "iconButton" },
    tableBorderColor: { title: "边框颜色", buttonType: "colorButton" },

    // 单元格操作
    tableScale: { title: "表格扩充", icon: "icon-editor-table-scale", buttonType: "iconButton" },
    tableWidth: { title: "单元格宽度", icon: "icon-editor-width", buttonType: "iconButton" },
    tableMinWidth: { title: "单元格最小宽度", icon: "icon-editor-min-width", buttonType: "iconButton" },
    tableCellBg: { title: "单元格背景色", buttonType: "colorButton" },
    tableCellAlign: { title: "单元格内容对齐方式", buttonType: "iconButton" },
    mergeTableCell: { title: "合并/分割 单元格", icon: "icon-editor-cell-merge", buttonType: "iconButton" },
    resetColWidth: { title: "清空单元格宽度设置", icon: "icon-editor-remove-style", buttonType: "iconButton" },

    // 行操作
    selectRow: { title: "选中当前行", icon: "icon-editor-table-row", buttonType: "iconButton" },
    deleteRow: { title: "移除当前行", icon: "icon-editor-trash", buttonType: "iconButton" },
    addRowBefore: { title: "向上插入行", icon: "icon-editor-table-insert-row-before", buttonType: "iconButton" },
    addRowAfter: { title: "向下插入行", icon: "icon-editor-table-insert-row-after", buttonType: "iconButton" },

    // 列操作
    selectCol: { title: "选中当前列", icon: "icon-editor-table-col", buttonType: "iconButton" },
    deleteColumn: { title: "移除当前列", icon: "icon-editor-trash", buttonType: "iconButton" },
    addColumnBefore: { title: "向左插入列", icon: "icon-editor-table-insert-col-before", buttonType: "iconButton" },
    addColumnAfter: { title: "向右插入列", icon: "icon-editor-table-insert-col-after", buttonType: "iconButton" },

    // #endregion

    // #region 分隔线

    hrRule: { title: "分隔线", subtitle: "Divider Line", tip: "分隔线", icon: "icon-editor-divider-solid" },
    toggleHrStyle: { title: "切换分隔线样式", buttonType: "iconButton" },
    hrColor: { title: "分隔线颜色", buttonType: "colorButton" },

    // #endregion

    // #region 网格相关

    inertGridGroup: { title: "网格", subtitle: "Grid Group", tip: "插入网格", icon: "icon-editor-grid-layer" },
    selectGridGroup: { title: "选中网格排布", icon: "icon-editor-to-parent", buttonType: "iconButton" },

    // #endregion

    // #region 图片相关

    addImage: { title: "图片", subtitle: "Image", tip: "插入图片", icon: "icon-editor-image-add" },
    replaceImage: { title: "更换图片", icon: "icon-editor-repace-image", buttonType: "iconButton" },

    // #endregion

    // #region 按钮相关

    // #endregion
} as const;

export type UeTiptapOperItem = keyof typeof operManage;

const operMap: Record<UeTiptapOperItem, OperInfo> = operManage;

export { operMap };
