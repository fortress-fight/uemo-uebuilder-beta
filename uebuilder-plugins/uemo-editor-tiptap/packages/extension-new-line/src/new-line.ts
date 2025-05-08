/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 00:21:48
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
                            const isEnter = event instanceof KeyboardEvent && event.keyCode === 13;

                            if (!isEnter || !isNodeSelection(view.state.selection)) return false;

                            const insertSuccess = this.editor.chain().insertNewLine("after").run();

                            if (insertSuccess) {
                                event.preventDefault();
                            }

                            return true;
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
