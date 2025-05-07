<template>
    <UeTiptapMenuButton type="insertNewLineAfter" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { insertNewLine } from "../../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function trigger() {
    if (!editor) return false;
    insertNewLine(editor, "after");
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
