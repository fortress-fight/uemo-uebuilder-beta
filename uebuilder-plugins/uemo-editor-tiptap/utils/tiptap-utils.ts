import type { EditorState } from "@tiptap/pm/state";

import { isInTable } from "@tiptap/pm/tables";

export function isInGridGroup(state: EditorState): boolean {
    const $head = state.selection.$head;
    for (let d = $head.depth; d > 0; d--) {
        if ($head.node(d).type.name == "gridGroup") {
            return true;
        }
    }
    return false;
}

export { isInTable };
