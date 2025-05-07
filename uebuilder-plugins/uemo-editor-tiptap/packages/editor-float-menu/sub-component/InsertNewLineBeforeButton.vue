<template>
    <UeTiptapMenuButton type="insertNewLineBefore" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { insertNewLine } from "../../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function trigger() {
    if (!editor) return false;
    insertNewLine(editor, "before");
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
