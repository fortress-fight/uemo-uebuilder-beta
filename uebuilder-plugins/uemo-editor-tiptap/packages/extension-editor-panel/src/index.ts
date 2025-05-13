/*
 * @Description: 编辑器面板扩展模块
 * @Author: F-Stone
 * @LastEditTime: 2025-05-13 10:30:46
 */

export type EditorPanelParam<T extends keyof EditorPanelAttrsMap> = {
    rect: UE_TIPTAP_UNIT.PositionRect; // 面板位置信息
    setData: (data: EditorPanelAttrsMap[T]) => void; // 设置属性数据
    preview?: (param?: any) => void; // 预览回调
    focus: () => void; // 聚焦回调
    close?: () => void; // 关闭回调
};

/**
 * 属性编辑器面板处理器类型定义
 * @template T - 属性类型
 * @template R - 返回值类型
 */
export type EditorPanelHandler<T extends keyof EditorPanelAttrsMap, R = void> = (
    type: T,
    attr: EditorPanelAttrsMap[T],
    param: EditorPanelParam<T>
) => R;

export type EditorPanelAttrsMap = {
    textDecoration: UE_TIPTAP_EXTENSION.TextDecoration["attrs"];
    link: UE_TIPTAP_EXTENSION.Link["attrs"];
    fontSize: UE_TIPTAP_EXTENSION.FontSize["attrs"];
    fontFamily: UE_TIPTAP_EXTENSION.FontFamily["attrs"];
    textColor: UE_TIPTAP_EXTENSION.TextColor["attrs"];
    textAlign: UE_TIPTAP_EXTENSION.TextAlign["attrs"];
    lineHeight: UE_TIPTAP_EXTENSION.LineHeight["attrs"];
    letterSpacing: UE_TIPTAP_EXTENSION.LetterSpacing["attrs"];
    editorAI: UE_TIPTAP_EXTENSION.EditorAI["attrs"];
    buttonRow: UE_TIPTAP_EXTENSION.ButtonRow["attrs"];
    buttonItem: UE_TIPTAP_EXTENSION.ButtonItem["attrs"];
    image: UE_TIPTAP_EXTENSION.Image["attrs"];
};

export type OpenEditorPanelHandler<T extends keyof EditorPanelAttrsMap = keyof EditorPanelAttrsMap> =
    EditorPanelHandler<T, void>;

export * from "./editor-panel";
