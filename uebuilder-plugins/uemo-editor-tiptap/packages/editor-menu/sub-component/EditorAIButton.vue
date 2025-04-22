<!--
 * @Description: 斜体插件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-22 22:58:04
-->
<template>
    <UeTiptapMenuButton ref="rootDom" type="editorAI" :class="$style['plugin-italic']" @trigger="openEditorAIPanel" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();
const rootDom = useTemplateRef("rootDom");

function openEditorAIPanel() {
    const rect = rootDom.value?.$el;

    if (!editor || !rect) return;
}
</script>
<style lang="scss" module>
.plugin-italic {
    //
}
</style>
