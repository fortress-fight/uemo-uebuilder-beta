<!--
 * @Description: 格式化插件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 17:12:14
-->
<template>
    <UeTiptapMenuButton type="formatting" :class="$style['plugin-formatting']" @trigger="triggerFormattingCommand" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { isButtonRow } from "../../extension-button/utils/helper";
import { isEffectTextNode } from "../../extension-effect-text/utils/helper";
import { isLoopTextNode } from "../../extension-loop-text/utils/helper";

defineOptions({ name: "FormattingButton" });

const { editor } = useInjectTiptapEditor();

function triggerFormattingCommand() {
    if (isButtonRow(editor)) {
        return editor?.chain().focus().unsetButtonRowStyle().run();
    }
    if (isEffectTextNode(editor)) {
        return editor?.chain().focus().unsetEffectTextStyle().run();
    }
    if (isLoopTextNode(editor)) {
        return editor?.chain().focus().unsetLoopTextStyle().run();
    }
    editor?.chain().focus().setFormatting().run();
}
</script>
<style lang="scss" module>
.plugin-formatting {
    //
}
</style>
