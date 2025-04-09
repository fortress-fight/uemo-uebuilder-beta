<template>
    <UeTiptapEditorMenu />
    <EditorContent :editor="editor" />
    <LinkPanel />
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/vue-3";

import { EditorContent } from "@tiptap/vue-3";
import { useProvideTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import LinkPanel from "../../extension-link/panel/LinkPanel.vue";

const props = defineProps<{ editor: Editor }>();

useProvideTiptapEditor(props.editor);
</script>
<style lang="scss" module>
//
</style>
