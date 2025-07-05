<!--
 * @Description: 斜体插件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 17:09:15
-->
<template>
    <UeTiptapMenuButton type="italic" :active="isItalic" :class="$style['plugin-italic']" @trigger="triggerItalic" />
</template>
<script lang="ts" setup>
import { isButtonRow, getButtonRowAttrs } from "../../extension-button/utils/helper";
import { isEffectTextNode, getEffectTextAttrs } from "../../extension-effect-text/utils/helper";
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
    // if (isLoopText(editor)) {
    //     return editor?.getAttributes("loopText").fontStyle === "italic";
    // }
    // if (isCounterNumber(editor)) {
    //     return editor?.getAttributes("counterNumber").fontStyle === "italic";
    // }
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
    // if (isLoopText(editor)) {
    //     return editor?.chain().focus().toggleLoopTextItalic().run();
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
