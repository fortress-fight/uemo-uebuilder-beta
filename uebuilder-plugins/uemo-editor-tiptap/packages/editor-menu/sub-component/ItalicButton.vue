<!--
 * @Description: 斜体插件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-03 00:28:38
-->
<template>
    <UeTiptapMenuButton type="italic" :active="isItalic" :class="$style['plugin-italic']" @trigger="triggerItalic" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

defineOptions({ name: "ItalicButton" });

const { editor } = useInjectTiptapEditor();

const isItalic = computed(() => {
    // if (isButtonRow(editor)) {
    //     return editor?.getAttributes("buttonRow").fontStyle === "italic";
    // }
    // if (isLoopText(editor)) {
    //     return editor?.getAttributes("loopText").fontStyle === "italic";
    // }
    // if (isEffectText(editor)) {
    //     return editor?.getAttributes("effectText").fontStyle === "italic";
    // }
    // if (isCounterNumber(editor)) {
    //     return editor?.getAttributes("counterNumber").fontStyle === "italic";
    // }
    return editor?.isActive("italic");
});

function triggerItalic() {
    // if (isButtonRow(editor)) {
    //     return editor?.chain().focus().toggleButtonRowItalic().run();
    // }
    // if (isLoopText(editor)) {
    //     return editor?.chain().focus().toggleLoopTextItalic().run();
    // }
    // if (isEffectText(editor)) {
    //     return editor?.chain().focus().toggleEffectTextItalic().run();
    // }
    // if (isCounterNumber(editor)) {
    //     return editor?.chain().focus().toggleCounterNumberItalic().run();
    // }
    return editor?.chain().focus().toggleItalic().run();
}
</script>
<style lang="scss" module>
.plugin-italic {
    //
}
</style>
