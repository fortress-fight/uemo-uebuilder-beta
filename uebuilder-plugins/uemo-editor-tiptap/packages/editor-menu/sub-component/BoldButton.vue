<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 17:09:42
-->
<template>
    <UeTiptapMenuButton type="bold" :active="isBold" :class="$style['plugin-bold']" @trigger="triggerBold" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { isButtonRow, getButtonRowAttrs } from "../../extension-button/utils/helper";
import { isEffectTextNode, getEffectTextAttrs } from "../../extension-effect-text/utils/helper";

defineOptions({ name: "BoldButton" });

const { editor } = useInjectTiptapEditor();

const isBold = computed(() => {
    if (isButtonRow(editor)) {
        return getButtonRowAttrs(editor)?.fontWeight;
    }
    if (isEffectTextNode(editor)) {
        return getEffectTextAttrs(editor)?.fontWeight;
    }
    // if (isLoopText(editor)) {
    //     return editor?.getAttributes("loopText").fontWeight;
    // }
    // if (isCounterNumber(editor)) {
    //     return editor?.getAttributes("counterNumber").fontWeight;
    // }
    return editor?.isActive("bold");
});

function triggerBold() {
    if (isButtonRow(editor)) {
        return editor
            ?.chain()
            .focus()
            .updateButtonRowAttrs({ fontWeight: isBold.value ? false : true })
            .run();
    }
    if (isEffectTextNode(editor)) {
        return editor
            ?.chain()
            .focus()
            .updateEffectTextAttrs({ fontWeight: isBold.value ? false : true })
            .run();
    }
    // if (isLoopText(editor)) {
    //     return editor?.chain().focus().toggleLoopTextBold().run();
    // }
    // if (isCounterNumber(editor)) {
    //     return editor?.chain().focus().toggleCounterNumberBold().run();
    // }
    return editor?.chain().focus().toggleBold().run();
}
</script>
<style lang="scss" module>
.plugin-bold {
    //
}
</style>
