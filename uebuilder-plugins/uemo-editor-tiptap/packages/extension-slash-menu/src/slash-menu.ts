/*
 * @Description: 斜杠菜单
 * @Author: F-Stone
 * @LastEditTime: 2025-04-28 03:04:32
 */
import type { SuggestionOptions } from "../../extension-suggestion";

import { Extension } from "@tiptap/core";

import { Suggestion } from "../../extension-suggestion";
import { getSlashMenuSuggestion } from "../utils/suggestion";
import { operMap } from "../../../utils/tiptap-oper-manage";

export type SlashMenuSuggestionItem = { title: string; list: { title: string; name: keyof typeof operMap }[] };

export type SlashMenuOptions = {
    suggestion: Omit<SuggestionOptions<SlashMenuSuggestionItem, { name: string }>, "editor">;
};

export const SlashMenu = Extension.create<SlashMenuOptions>({
    name: "slashMenu",

    addOptions() {
        return {
            suggestion: getSlashMenuSuggestion(),
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
});
