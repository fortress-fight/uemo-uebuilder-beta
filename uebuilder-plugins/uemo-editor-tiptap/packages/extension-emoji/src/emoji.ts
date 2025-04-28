import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import type { SuggestionOptions } from "../../extension-suggestion";

import { mergeAttributes, Node } from "@tiptap/core";
import $pageStyle from "../../../src/app.module.scss";

import { Suggestion } from "../../extension-suggestion";
import { getEmojiSuggestion } from "../utils/suggestion";

/**
 * Emoji 扩展的配置选项
 */
export type EmojiOptions = {
    /** HTML 属性配置 */
    HTMLAttributes: Record<string, any>;
    /** 渲染标签的回调函数 */
    renderLabel: (props: { options: EmojiOptions; node: ProseMirrorNode }) => string;
    /** 建议配置 */
    suggestion: Omit<SuggestionOptions<null, { id: string }>, "editor">;
};

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        emoji: {
            /** 插入表情命令 */
            insertEmoji: (options: { text: string }) => ReturnType;
        };
    }
}

export const Emoji = Node.create<EmojiOptions>({
    name: "emoji",

    group: "inline",

    inline: true,
    selectable: true,

    atom: true,

    addOptions() {
        return {
            HTMLAttributes: {},
            renderLabel({ node }) {
                return `${node.attrs.label ?? node.attrs.id}`;
            },
            suggestion: getEmojiSuggestion(),
        };
    },

    addAttributes() {
        const parseAttribute = (element: HTMLElement, attr: string) => element.getAttribute(`data-${attr}`);
        const renderAttribute = (value: string | null, attr: string) => (value ? { [`data-${attr}`]: value } : {});

        return {
            id: {
                default: null,
                parseHTML: (element) => parseAttribute(element, "id"),
                renderHTML: (attributes) => renderAttribute(attributes.id, "id"),
            },

            label: {
                default: null,
                parseHTML: (element) => parseAttribute(element, "label"),
                renderHTML: (attributes) => renderAttribute(attributes.label, "label"),
            },
        };
    },

    parseHTML() {
        return [{ tag: `span[data-type="${this.name}"]` }];
    },

    renderHTML({ node, HTMLAttributes }) {
        return [
            "span",
            mergeAttributes(
                { "data-type": this.name, class: $pageStyle.emoji },
                this.options.HTMLAttributes,
                HTMLAttributes
            ),
            this.options.renderLabel({
                options: this.options,
                node,
            }),
        ];
    },

    renderText({ node }) {
        return this.options.renderLabel({ options: this.options, node });
    },

    addKeyboardShortcuts() {
        return {
            Backspace: () =>
                this.editor.commands.command(({ tr, state }) => {
                    const { selection } = state;
                    const { empty, anchor } = selection;

                    if (!empty) return false;

                    let isEmoji = false;
                    state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
                        if (node.type.name === this.name) {
                            isEmoji = true;
                            const defaultChar = this.options.suggestion.char?.[0] || "";
                            tr.insertText(defaultChar, pos, pos + node.nodeSize);
                            return false;
                        }
                    });

                    return isEmoji;
                }),
        };
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ];
    },

    addCommands() {
        return {
            insertEmoji:
                () =>
                ({ commands }) =>
                    commands.insertContent(":"),
        };
    },
});
