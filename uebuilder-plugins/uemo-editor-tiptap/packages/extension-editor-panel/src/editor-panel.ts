/**
 * 编辑器面板扩展模块
 * 用于处理编辑器属性编辑面板的显示和交互
 */

import type { EditorPanelAttrsMap, EditorPanelParam } from "../src";

import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Extension, isNodeSelection, findParentNodeClosestToPos, posToDOMRect } from "@tiptap/core";

import { openAttrEditorPanel } from "../utils/helper";

// 扩展 Tiptap 命令接口
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        editorPanelExtension: {
            showToast: (type: "success" | "error", message: string) => ReturnType;
            openAttrEditorPanel<T extends keyof EditorPanelAttrsMap>(
                type: T,
                attr: EditorPanelAttrsMap[T],
                param: EditorPanelParam<T>
            ): ReturnType;
            closeAttrEditorPanel: (type: keyof EditorPanelAttrsMap) => ReturnType;
        };

        // NOTE 不知道为什么，如果把这个声明放在 editing-mark 扩展中，执行 yarn editor-panel-ui 会报错，只要换一个位置就可以
        editingMark: {
            /**
             * Set an editingmark mark
             * @example editor.commands.setEditingMark()
             */
            setEditingMark: (type: "link" | "text") => ReturnType;
            /**
             * Unset an editingmark mark
             * @example editor.commands.unsetEditingMark()
             */
            unsetEditingMark: () => ReturnType;

            /**
             * Set the selection to the mark
             * @example editor.commands.setMarkSelection()
             */
            setMarkSelection: (name: "textDecoration" | "link") => ReturnType;
        };
    }
}

/**
 * 编辑器面板配置选项
 */
export type EditorPanelOptions = {
    showToast: (type: "success" | "error", message: string) => void;
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

const HansEditorPanelNodes = [
    "buttonRow",
    "buttonItem",
    "image",
    "svgIcon",
    "frame",
    "svgView",
    "spline",
    "lottie",
    "gridGroup",
    "gridItem",
    "dividerBlock",
    "hrRule",
    "shareRow",
    "shareItem",
    "effectText",
    "counterNumber",
    "loopText",
];

/**
 * 编辑器面板扩展
 * 提供打开属性编辑面板的命令
 */
export const EditorPanelExtension = Extension.create<EditorPanelOptions, editorPanelStorage>({
    name: "editorPanelExtension",

    addOptions() {
        return {
            showToast: () => {
                //
            },
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

    addProseMirrorPlugins() {
        const plugins: Plugin[] = [
            new Plugin({
                key: new PluginKey("triggerEditorPanelOpen"),
                props: {
                    handleDOMEvents: {
                        click: (_view, event) => {
                            const target = event.target as HTMLElement;

                            const isLink = target.tagName.toLowerCase() === "a" || target.closest(`a`);

                            if (isLink) {
                                event.preventDefault();
                            }
                        },
                        dblclick: (view, event) => {
                            const selection = view.state.selection;

                            if (!(event.target instanceof HTMLElement) || !isNodeSelection(selection)) {
                                return;
                            }

                            let nodeName: undefined | string = selection.node.type.name;

                            if (!HansEditorPanelNodes.includes(nodeName)) {
                                nodeName = findParentNodeClosestToPos(selection.ranges[0].$from, (node) => {
                                    return HansEditorPanelNodes.includes(node.type.name);
                                })?.node.type.name;
                            }

                            const domRect = posToDOMRect(view, selection.from, selection.to);

                            switch (nodeName) {
                                case "buttonRow":
                                    this.editor.chain().openButtonRowEditorPanel(domRect).run();
                                    return false;

                                case "buttonItem":
                                    this.editor.chain().openButtonItemEditorPanel(domRect).run();
                                    return false;

                                case "image":
                                    this.editor.chain().openImageEditorPanel(domRect).run();
                                    return false;

                                case "svgIcon":
                                    this.editor.chain().openSvgIconEditorPanel(domRect).run();
                                    return false;

                                case "frame":
                                    this.editor.chain().openFrameEditorPanel(domRect).run();
                                    return false;

                                case "svgView":
                                    this.editor.chain().openSvgViewEditorPanel(domRect).run();
                                    return false;

                                case "spline":
                                    this.editor.chain().openSplineEditorPanel(domRect).run();
                                    return false;

                                case "lottie":
                                    this.editor.chain().openLottieEditorPanel(domRect).run();
                                    return false;

                                case "dividerBlock":
                                    this.editor.chain().openDividerBlockEditorPanel(domRect).run();
                                    return false;

                                case "hrRule":
                                    this.editor.chain().openHrRuleEditorPanel(domRect).run();
                                    return false;

                                case "shareItem":
                                    this.editor.chain().openShareItemEditorPanel(domRect).run();
                                    return false;

                                case "effectText":
                                    this.editor.chain().openEffectTextEditorPanel(domRect).run();
                                    return false;

                                case "counterNumber":
                                    this.editor.chain().openCounterNumberEditorPanel(domRect).run();
                                    return false;

                                case "loopText":
                                    this.editor.chain().openLoopTextEditorPanel(domRect).run();
                                    return false;

                                default:
                                    console.error(
                                        `${nodeName} 不支持打开属性编辑面板, 请检查是否在 HansEditorPanelNodes 中添加了该节点`
                                    );
                                    return;
                            }
                        },
                    },
                },
            }),
        ];

        return plugins;
    },

    addCommands() {
        return {
            showToast: (type, message) => () => {
                const handler = this.options.showToast;

                handler(type, message);

                return true;
            },

            openAttrEditorPanel:
                (type, attr, param) =>
                ({ editor }) => {
                    const handler = this.options.openAttrEditorPanel || openAttrEditorPanel;

                    // 调用属性处理器
                    handler(type, attr, {
                        ...param,
                        focus: () => {
                            editor.commands.focus();
                            param.focus?.();
                        },
                        close: () => {
                            editor.commands.closeAttrEditorPanel(type);
                            param.close?.();
                        },
                    });

                    this.storage.lastEditorPanelType = type;

                    return true;
                },

            closeAttrEditorPanel: (type) => () => {
                if (this.storage.lastEditorPanelType !== type) {
                    return false;
                }

                const handler = this.options.closeAttrEditorPanel;

                // 调用关闭处理器
                handler();

                this.storage.lastEditorPanelType = undefined;

                return true;
            },
        };
    },
});
