<!--
 * @Description: 格式化插件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 10:19:55
-->
<template>
    <UeTiptapMenuButton type="formatting" :class="$style['plugin-formatting']" @trigger="triggerFormattingCommand" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { isButtonRow } from "../../extension-button/utils/helper";

defineOptions({ name: "FormattingButton" });

const { editor } = useInjectTiptapEditor();

function triggerFormattingCommand() {
    if (isButtonRow(editor)) {
        return editor?.chain().focus().unsetButtonRowStyle().run();
    }

    editor?.chain().focus().setFormatting().run();
}
</script>
<style lang="scss" module>
.plugin-formatting {
    //
}
</style>
