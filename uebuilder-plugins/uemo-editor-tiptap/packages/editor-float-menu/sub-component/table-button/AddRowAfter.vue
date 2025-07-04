<template>
    <UeTiptapMenuButton type="addRowAfter" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function trigger() {
    editor?.chain().focus().addRowAfter().run();
}
</script>
<style lang="scss" module>
//
</style>
