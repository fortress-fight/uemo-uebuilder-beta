<template>
    <UeTiptapMenuButton type="addColumnBefore" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function trigger() {
    editor?.chain().focus().addColumnBefore().run();
}
</script>
<style lang="scss" module>
//
</style>
