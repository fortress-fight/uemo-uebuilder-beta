<template>
    <UeTiptapMenuButton
        ref="rootDom"
        type="textDecoration"
        :class="$style['text-decoration']"
        :active="hasTextDecoration"
        @trigger="triggerTextDecorationCommand"
    />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const rootDom = useTemplateRef("rootDom");

const hasTextDecoration = computed(() => {
    return editor?.isActive("textDecoration");
});

function triggerTextDecorationCommand() {
    const rect = rootDom.value?.getButtonRect();

    if (!editor || !rect) return;

    if (!editor.isActive("textDecoration")) {
        editor.chain().setTextDecoration({ svgName: "line-1" }).run();
    }

    editor.chain().openTextDecorationEditorPanel({ rect }).run();
}
</script>
<style lang="scss" module>
.text-decoration {
    // init
}
</style>
