/*
 * @Description: 表情包建议配置
 * @Author: F-Stone
 * @LastEditTime: 2025-04-29 02:03:09
 */

import type { EmojiOptions } from "../src";

import { PluginKey } from "@tiptap/pm/state";
import { VueRenderer } from "@tiptap/vue-3";

import EmojiPanel from "../panel/EmojiPanel.vue";

export const EmojiPluginKey = new PluginKey("emoji");

/**
 * 获取表情包建议配置
 * @returns {EmojiOptions["suggestion"]} 表情包建议配置对象
 */
export function getEmojiSuggestion(): EmojiOptions["suggestion"] {
    return {
        char: [":", "："],
        pluginKey: EmojiPluginKey,
        items: () => {
            return [];
        },
        command: ({ editor, range, props }) => {
            // increase range.to by one when the next node is of type "text"
            // and starts with a space character
            const nodeAfter = editor.view.state.selection.$to.nodeAfter;
            const overrideSpace = nodeAfter?.text?.startsWith(" ");

            if (overrideSpace) {
                range.to += 1;
            }

            editor
                .chain()
                .focus()
                .insertContentAt(range, [{ type: "emoji", attrs: props }])
                .run();

            // 将光标移动到当前选区的最末尾
            // 这样可以确保在插入表情后，光标会停留在表情后面，而不是停留在表情内部
            window.getSelection()?.collapseToEnd();
        },
        allow: (param) => {
            const { state, range } = param;
            const $from = state.doc.resolve(range.from);
            const type = state.schema.nodes.emoji;
            const allow = !!$from.parent.type.contentMatch.matchType(type);

            return allow;
        },
        render: () => {
            let component: VueRenderer | null = null;

            const cleanup = () => {
                if (component) {
                    component.destroy();
                }
                component = null;
            };

            return {
                onStart: (props: any) => {
                    cleanup();

                    if (!props.clientRect) {
                        return;
                    }

                    component = new VueRenderer(EmojiPanel, {
                        props: props,
                        editor: props.editor,
                    });

                    component?.ref?.openPopPanel();
                },

                onUpdate(props) {
                    if (!props.clientRect) {
                        return;
                    }

                    component?.updateProps(props);
                },

                onKeyDown(props: any) {
                    if (props.event.key === "Escape") {
                        component?.ref?.closePopPanel();
                        return true;
                    }

                    return component?.ref?.onKeyDown(props) ?? false;
                },

                onExit: cleanup,
            };
        },
    };
}
