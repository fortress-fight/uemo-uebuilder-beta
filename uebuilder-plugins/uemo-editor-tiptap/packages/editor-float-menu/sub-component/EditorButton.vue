<template>
    <UeTiptapMenuButton type="editor" @trigger="openBtnRowEditorPanel" />
</template>
<script lang="ts" setup>
import { isNodeSelection } from "@tiptap/core";

import { getSelectionRect } from "../../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function openBtnRowEditorPanel() {
    if (!editor) return;

    const { view, state } = editor;

    const rect = getSelectionRect(view, state.selection);

    if (!rect || !isNodeSelection(state.selection)) return;

    const nodeName = state.selection.node.type.name;

    switch (nodeName) {
        case "buttonRow":
            editor.chain().openButtonRowEditorPanel(rect).run();
            break;
        case "buttonItem":
            editor.chain().openButtonItemEditorPanel(rect).run();
            break;
        default:
            return;
    }
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
