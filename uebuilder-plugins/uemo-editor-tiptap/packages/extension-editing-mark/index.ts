import { Mark, getMarkRange } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

import $pageStyle from "../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
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
 * This extension allows you to create editingmark text.
 * @see https://www.tiptap.dev/api/marks/editingmark
 */
export const EditingMark = Mark.create({
    name: "editingMark",

    addOptions() {
        return {};
    },

    parseHTML() {
        return [];
    },

    addAttributes() {
        return {
            type: {
                default: "text",
            },
        };
    },

    renderHTML() {
        return ["span", { class: $pageStyle["ue-editing-mark"] }, 0];
    },

    addCommands() {
        return {
            setEditingMark:
                (type: "link" | "text") =>
                ({ chain }) => {
                    return chain().setMeta("addToHistory", false).setMark(this.name, { type }).run();
                },
            unsetEditingMark:
                () =>
                ({ chain }) => {
                    return chain().unsetMark(this.name).setMeta("addToHistory", false).run();
                },

            setMarkSelection: (name) => (editor) => {
                const selection = editor.state.selection;

                const { $from, $to } = selection;
                const markType = editor.state.schema.marks[name];
                if (!markType) return false;

                const startMarkRange = getMarkRange($from, markType);
                const endMarkRange = getMarkRange($to, markType);

                if (startMarkRange?.from && endMarkRange?.to) {
                    // 处理链接选区
                    const newSelection = TextSelection.create(editor.state.doc, startMarkRange.from, endMarkRange.to);

                    editor.chain().setMeta("addToHistory", false).setTextSelection(newSelection).run();
                }

                return true;
            },
        };
    },
});
