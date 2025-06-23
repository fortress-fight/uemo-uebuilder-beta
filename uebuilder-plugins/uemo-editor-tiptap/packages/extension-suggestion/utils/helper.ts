import type { Editor } from "@tiptap/core";

import { SuggestionPluginKey } from "../index";

/**
 * 判断是否存在建议
 */
export function isSuggestionActive(editor: Editor) {
    return SuggestionPluginKey?.getState(editor.state)?.active;
}
