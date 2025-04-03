<template>
    <UeTiptapEditorMenu />
    <EditorContent :editor="editor" />
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/vue-3";

import { EditorContent } from "@tiptap/vue-3";
import { useProvideTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const props = defineProps<{ editor: Editor }>();

useProvideTiptapEditor(props.editor);
</script>
<style lang="scss" module>
//
</style>
