/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 13:12:07
 */
import { isNodeSelection, Node } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

import { getTargetPositionInfo } from "../utils/helper";

import { Fragment } from "prosemirror-model";

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
                ({ editor, commands, state }) => {
                    const targetPosInfo = getTargetPositionInfo(editor);

                    if (!targetPosInfo) return false;

                    const { schema, doc } = state;

                    const rawTargetPos = pos === "before" ? targetPosInfo.start : targetPosInfo.end;
                    const $pos = doc.resolve(rawTargetPos);
                    const paragraph = schema.nodes.paragraph.create();

                    let insertPos = rawTargetPos;
                    let foundValid = false;

                    // 从当前 depth 向上查找可以插入 paragraph 的父节点
                    for (let depth = $pos.depth; depth >= 0; depth--) {
                        const parent = $pos.node(depth);
                        const canInsert = parent.type.validContent(Fragment.from(paragraph));

                        if (canInsert) {
                            // 找到合法插入点，计算插入位置
                            insertPos = pos === "before" ? $pos.before(depth + 1) : $pos.after(depth + 1);
                            foundValid = true;
                            break;
                        }
                    }
                    if (foundValid) {
                        commands.focus();
                        commands.insertContentAt(insertPos, { type: "paragraph" });
                    }

                    return true;
                },
        };
    },
});
