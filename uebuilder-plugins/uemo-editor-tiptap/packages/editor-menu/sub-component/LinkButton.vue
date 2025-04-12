<template>
    <UeTiptapMenuButton
        ref="rootDom"
        type="link"
        :class="$style['link']"
        :active="hasLink"
        @trigger="triggerLinkCommand"
    />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const rootDom = useTemplateRef("rootDom");

const hasLink = computed(() => {
    return editor?.isActive("link");
});

function triggerLinkCommand() {
    const rect = rootDom.value?.getButtonRect();

    if (!editor || !rect) return;

    editor.chain().openLinkEditorPanel({ rect }).run();
}
</script>
<style lang="scss" module>
.text-decoration {
    // init
}
</style>
