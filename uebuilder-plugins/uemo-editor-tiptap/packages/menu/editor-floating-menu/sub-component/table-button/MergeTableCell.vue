<template>
    <UeTiptapMenuButton type="mergeTableCell" :disable="disable" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const disable = computed(() => {
    return !editor?.can().mergeOrSplit();
});

function trigger() {
    if (!editor) return false;

    editor?.chain().focus().mergeOrSplit().run();
}
</script>
<style lang="scss" module>
//
</style>
