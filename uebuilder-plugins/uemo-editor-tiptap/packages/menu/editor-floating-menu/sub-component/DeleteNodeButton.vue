<template>
    <UeTiptapMenuButton type="deleteNode" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { isNodeSelection } from "@tiptap/core";

import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function trigger() {
    if (!isNodeSelection(editor?.state.selection)) {
        return false;
    }

    editor?.chain().focus().deleteSelection().run();
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
