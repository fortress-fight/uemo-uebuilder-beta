<template>
    <UeTiptapMenuButton type="selectParent" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function trigger() {
    if (!editor) return false;
    editor.chain().selectParentNode().focus().run();
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
