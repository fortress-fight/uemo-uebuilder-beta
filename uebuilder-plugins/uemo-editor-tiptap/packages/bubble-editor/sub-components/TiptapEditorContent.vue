<template>
    <UeTiptapEditorMenu />
    <EditorContent :editor="editor" />
    <LinkPanel />
    <AILoadingPanel />
    <AddNodePanel />
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/vue-3";

import { EditorContent } from "@tiptap/vue-3";
import LinkPanel from "../../extension-link/panel/LinkPanel.vue";
import AILoadingPanel from "../../extension-ai/panel/AILoadingPanel.vue";
import AddNodePanel from "../../extension-node-placeholder/panel/AddNodePanel.vue";

const _props = defineProps<{ editor: Editor }>();
</script>
<style lang="scss" module>
//
</style>
