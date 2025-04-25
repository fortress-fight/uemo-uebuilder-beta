<template>
    <UeTiptapEditorMenu />
    <EditorContent :editor="editor" />
    <LinkPanel />
    <AILoadingPanel />
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/vue-3";

import { EditorContent } from "@tiptap/vue-3";
import LinkPanel from "../../extension-link/panel/LinkPanel.vue";
import AILoadingPanel from "../../extension-ai/panel/AILoadingPanel.vue";

const _props = defineProps<{ editor: Editor }>();
</script>
<style lang="scss" module>
//
</style>
