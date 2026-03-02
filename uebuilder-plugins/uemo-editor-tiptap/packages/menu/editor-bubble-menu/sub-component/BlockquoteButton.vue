<!--
 * @Description: 引用插件
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 13:24:31
-->
<template>
    <UeTiptapMenuButton
        type="blockquote"
        :active="hasBlockquote"
        :class="$style['plugin-blockquote']"
        @trigger="triggerBlockquote"
    />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

defineOptions({ name: "BlockquoteButton" });

const { editor } = useInjectTiptapEditor();

const hasBlockquote = computed(() => {
    return editor?.isActive("blockquote");
});

function triggerBlockquote() {
    editor?.chain().focus().toggleBlockquote().run();
}
</script>
<style lang="scss" module>
.plugin-bold {
    //
}
</style>
