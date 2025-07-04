<template>
    <UeTiptapMenuButton type="tableScale" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function trigger() {
    editor?.chain().focus().run();
}
</script>
<style lang="scss" module>
//
</style>
