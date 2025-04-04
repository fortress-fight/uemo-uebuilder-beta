/**
 * 编辑器面板扩展模块
 * 用于处理编辑器属性编辑面板的显示和交互
 */

import { Extension } from "@tiptap/core";
import { openAttrEditorPanel } from "../utils/helper";

/**
 * 属性编辑器面板处理器类型定义
 * @template T - 属性类型
 * @template R - 返回值类型
 */
export type AttrEditorPanelHandler<T extends keyof UE_TIPTAP_EXTENSION.AttrEditorPanelMap, R = void> = (
    type: T,
    attr: UE_TIPTAP_EXTENSION.AttrEditorPanelMap[T],
    param: {
        rect: UE_TIPTAP_UNIT.PositionRect; // 面板位置信息
        setData: (data: UE_TIPTAP_EXTENSION.AttrEditorPanelMap[T]) => void; // 设置属性数据
        preview?: () => void; // 预览回调
        focus: () => void; // 聚焦回调
    }
) => R;

// 扩展 Tiptap 命令接口
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        editorPanelExtension: {
            openAttrEditorPanel: AttrEditorPanelHandler<"textDecoration", ReturnType>;
        };
    }
}

/**
 * 编辑器面板配置选项
 */
export type EditorPanelOptions = {
    openAttrEditorPanel: AttrEditorPanelHandler<"textDecoration", void>;
};

/**
 * 编辑器面板扩展
 * 提供打开属性编辑面板的命令
 */
export const EditorPanelExtension = Extension.create<EditorPanelOptions>({
    name: "editorPanelExtension",

    addOptions() {
        return {
            openAttrEditorPanel,
        };
    },

    addCommands() {
        return {
            openAttrEditorPanel: (type, attr, param) => () => {
                const handler = this.options.openAttrEditorPanel || openAttrEditorPanel;

                // 调用属性处理器
                handler(type, attr, param);
                return true;
            },
        };
    },
});
