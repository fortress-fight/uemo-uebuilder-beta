<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 10:19:05
-->
<template>
    <UeTiptapMenuButton type="bold" :active="isBold" :class="$style['plugin-bold']" @trigger="triggerBold" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { isButtonRow, getButtonRowAttrs } from "../../extension-button/utils/helper";

defineOptions({ name: "BoldButton" });

const { editor } = useInjectTiptapEditor();

const isBold = computed(() => {
    if (isButtonRow(editor)) {
        return getButtonRowAttrs(editor)?.fontWeight;
    }
    // if (isLoopText(editor)) {
    //     return editor?.getAttributes("loopText").fontWeight;
    // }
    // if (isEffectText(editor)) {
    //     return editor?.getAttributes("effectText").fontWeight;
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
    // if (isLoopText(editor)) {
    //     return editor?.chain().focus().toggleLoopTextBold().run();
    // }
    // if (isEffectText(editor)) {
    //     return editor?.chain().focus().toggleEffectTextBold().run();
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
