/**
 * 编辑器面板扩展模块
 * 用于处理编辑器属性编辑面板的显示和交互
 */

import type { EditorPanelAttrsMap, EditorPanelParam } from "../src";

import { Extension } from "@tiptap/core";
import { openAttrEditorPanel } from "../utils/helper";

// 扩展 Tiptap 命令接口
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        editorPanelExtension: {
            openAttrEditorPanel<T extends keyof EditorPanelAttrsMap>(
                type: T,
                attr: EditorPanelAttrsMap[T],
                param: EditorPanelParam<T>
            ): ReturnType;
            closeAttrEditorPanel: (type: keyof EditorPanelAttrsMap) => ReturnType;
        };
    }
}

/**
 * 编辑器面板配置选项
 */
export type EditorPanelOptions = {
    openAttrEditorPanel<T extends keyof EditorPanelAttrsMap>(
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        this: void,
        type: T,
        attr: EditorPanelAttrsMap[T],
        param: EditorPanelParam<T>
    ): void;
    closeAttrEditorPanel: () => void;
};

/**
 * 编辑器面板存储接口
 */
export interface editorPanelStorage {
    /** 当前设备类型 */
    lastEditorPanelType: keyof EditorPanelAttrsMap | undefined;
}

/**
 * 编辑器面板扩展
 * 提供打开属性编辑面板的命令
 */
export const EditorPanelExtension = Extension.create<EditorPanelOptions, editorPanelStorage>({
    name: "editorPanelExtension",

    addOptions() {
        return {
            openAttrEditorPanel,
            closeAttrEditorPanel: () => {
                //
            },
        };
    },

    addStorage() {
        return {
            lastEditorPanelType: undefined as keyof EditorPanelAttrsMap | undefined,
        };
    },

    addCommands() {
        return {
            openAttrEditorPanel: (type, attr, param) => () => {
                const handler = this.options.openAttrEditorPanel || openAttrEditorPanel;

                this.storage.lastEditorPanelType = type;

                // 调用属性处理器
                handler(type, attr, param);
                return true;
            },

            closeAttrEditorPanel: (type) => () => {
                if (this.storage.lastEditorPanelType !== type) {
                    return false;
                }

                const handler = this.options.closeAttrEditorPanel;

                // 调用关闭处理器
                handler();

                return true;
            },
        };
    },
});
