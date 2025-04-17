<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-17 19:43:43
-->
<template>
    <UeTiptapMenuButton
        ref="rootDom"
        type="fontSize"
        :class="$style['plugin-bold']"
        :text="currentFontFamily || '字体'"
        @trigger="openFontFamilyPanel"
    />
</template>
<script lang="ts" setup>
import { getFontFamilyAttrs } from "../../extension-font-family/src";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();
const rootDom = useTemplateRef("rootDom");

const currentFontFamily = computed(() => {
    return getFontFamilyAttrs(editor)?.fontFamily || null;
});

function openFontFamilyPanel() {
    const rect = rootDom.value?.getButtonRect();

    if (!editor || !rect) return;

    editor?.commands.openAttrEditorPanel(
        "fontFamily",
        { fontFamily: currentFontFamily.value || "" },
        {
            rect,
            setData: (attr) => {
                if (!attr.fontFamily) {
                    editor?.chain().unsetFontFamily().run();
                } else {
                    editor?.chain().setFontFamily(attr.fontFamily).run();
                }
            },
            focus: () => {
                editor?.commands.focus();
            },
        }
    );
}
</script>
<style lang="scss" module>
.plugin-bold {
    //
}
</style>
