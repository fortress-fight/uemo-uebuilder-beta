/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-04-03 00:33:41
 */
import { Mark } from "@tiptap/vue-3";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        formatting: {
            setFormatting: () => ReturnType;
        };
    }
}

export const Formatting = Mark.create({
    name: "formatting",

    addCommands() {
        return {
            setFormatting:
                () =>
                ({ commands }) => {
                    return commands.clearNodes() && commands.unsetAllMarks();
                },
        };
    },
});
