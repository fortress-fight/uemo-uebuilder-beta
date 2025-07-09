<!--
 * @Description: 斜体插件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 17:13:17
-->
<template>
    <UeTiptapMenuButton type="italic" :active="isItalic" :class="$style['plugin-italic']" @trigger="triggerItalic" />
</template>
<script lang="ts" setup>
import { isButtonRow, getButtonRowAttrs } from "../../extension-button/utils/helper";
import { isEffectTextNode, getEffectTextAttrs } from "../../extension-effect-text/utils/helper";
import { isCounterNumberNode, getCounterNumberAttrs } from "../../extension-counter-number/utils/helper";
import { isLoopTextNode, getLoopTextAttrs } from "../../extension-loop-text/utils/helper";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

defineOptions({ name: "ItalicButton" });

const { editor } = useInjectTiptapEditor();

const isItalic = computed(() => {
    if (isButtonRow(editor)) {
        return getButtonRowAttrs(editor)?.fontStyle === "italic";
    }
    if (isEffectTextNode(editor)) {
        return getEffectTextAttrs(editor)?.fontStyle === "italic";
    }
    if (isCounterNumberNode(editor)) {
        return getCounterNumberAttrs(editor)?.fontStyle === "italic";
    }
    if (isLoopTextNode(editor)) {
        return getLoopTextAttrs(editor)?.fontStyle === "italic";
    }
    return editor?.isActive("italic");
});

function triggerItalic() {
    if (isButtonRow(editor)) {
        return editor
            ?.chain()
            .focus()
            .updateButtonRowAttrs({ fontStyle: isItalic.value ? "" : "italic" })
            .run();
    }
    if (isEffectTextNode(editor)) {
        return editor
            ?.chain()
            .focus()
            .updateEffectTextAttrs({ fontStyle: isItalic.value ? "" : "italic" })
            .run();
    }
    if (isCounterNumberNode(editor)) {
        return editor
            ?.chain()
            .focus()
            .updateCounterNumberAttrs({ fontStyle: isItalic.value ? "" : "italic" })
            .run();
    }
    if (isLoopTextNode(editor)) {
        return editor
            ?.chain()
            .focus()
            .updateLoopTextAttrs({ fontStyle: isItalic.value ? "" : "italic" })
            .run();
    }
    return editor?.chain().focus().toggleItalic().run();
}
</script>
<style lang="scss" module>
.plugin-italic {
    //
}
</style>
