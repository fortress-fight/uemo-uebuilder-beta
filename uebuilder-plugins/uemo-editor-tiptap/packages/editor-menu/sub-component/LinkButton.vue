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

const hasLink = computed(() => {
    return editor?.isActive("link");
});

function triggerLinkCommand() {
    editor?.chain().focus().setPreLink("link").run();
}
</script>
<style lang="scss" module>
.text-decoration {
    // init
}
</style>
