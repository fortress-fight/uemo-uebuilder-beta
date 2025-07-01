/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-06-12 01:01:29
 */
import { isNodeSelection, Node } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

import { getTargetPositionInfo } from "../utils/helper";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        newLine: {
            /**
             * 插入新行
             */
            insertNewLine: (pos: "before" | "after") => ReturnType;
        };
    }
}

export const NewLine = Node.create({
    name: "newLine",

    addOptions() {
        return {};
    },

    addProseMirrorPlugins() {
        const plugins: Plugin[] = [
            new Plugin({
                key: new PluginKey("enterKeydownInsertNewLine"),
                props: {
                    handleDOMEvents: {
                        keydown: (view, event) => {
                            const isEnter =
                                event instanceof KeyboardEvent &&
                                (event.keyCode === 13 || event.key === "Enter") &&
                                !event.shiftKey;

                            // Shift + Alt + Enter，兼容 macOS 的 Option/Alt 和 Command/Meta
                            const isShiftAltEnter =
                                event instanceof KeyboardEvent &&
                                (event.keyCode === 13 || event.key === "Enter") &&
                                event.shiftKey &&
                                (event.altKey || event.metaKey);

                            if (!isNodeSelection(view.state.selection)) return false;

                            if (isShiftAltEnter) {
                                // 向上插入新行
                                const insertSuccess = this.editor.chain().insertNewLine("before").run();
                                if (insertSuccess) {
                                    event.preventDefault();
                                }
                                return true;
                            }

                            if (isEnter) {
                                // 向下插入新行
                                const insertSuccess = this.editor.chain().insertNewLine("after").run();
                                if (insertSuccess) {
                                    event.preventDefault();
                                }
                                return true;
                            }

                            return false;
                        },
                    },
                },
            }),
        ];

        return plugins;
    },

    addCommands() {
        return {
            insertNewLine:
                (pos) =>
                ({ editor, commands }) => {
                    const targetPosInfo = getTargetPositionInfo(editor);

                    if (!targetPosInfo) return false;

                    const targetPos = pos === "before" ? targetPosInfo.start : targetPosInfo.end;

                    commands.focus();
                    commands.insertContentAt(targetPos, { type: "paragraph" });

                    return true;
                },
        };
    },
});
