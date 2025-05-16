<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-16 19:20:30
-->
<template>
    <UeTiptapMenuButton ref="rootDom" type="textColor" :color="currentColor" @trigger="openColorPicker" />
</template>
<script lang="ts" setup>
import { getTextColorAttrs } from "../../extension-text-color/src";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const rootDomRef = useTemplateRef("rootDom");

const currentColor = computed(() => {
    if (!editor) return "";

    return getTextColorAttrs(editor);
});

function openColorPicker() {
    const rect = rootDomRef.value?.getButtonRect();
    if (!rect) return;

    editor?.commands.openAttrEditorPanel(
        "textColor",
        { color: currentColor.value || "" },
        {
            rect,
            updateAttrs: ({ color }) => {
                if (color) {
                    editor.chain().setColor(color).run();
                } else {
                    editor.chain().unsetColor().run();
                }
            },
        }
    );
}
</script>
<style lang="scss" module>
//
</style>
