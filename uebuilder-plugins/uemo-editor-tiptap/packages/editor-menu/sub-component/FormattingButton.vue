<!--
 * @Description: 格式化插件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-03 00:36:19
-->
<template>
    <UeTiptapMenuButton type="formatting" :class="$style['plugin-formatting']" @trigger="triggerFormattingCommand" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

defineOptions({ name: "FormattingButton" });

const { editor } = useInjectTiptapEditor();

function triggerFormattingCommand() {
    // if (isButtonRow(editor)) {
    //     return editor?.chain().focus().unsetButtonRowStyle().run();
    // }

    editor?.chain().focus().setFormatting().run();
}
</script>
<style lang="scss" module>
.plugin-formatting {
    //
}
</style>
