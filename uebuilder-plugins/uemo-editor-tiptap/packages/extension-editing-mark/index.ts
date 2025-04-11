import { Mark } from "@tiptap/core";
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
        };
    },
});
