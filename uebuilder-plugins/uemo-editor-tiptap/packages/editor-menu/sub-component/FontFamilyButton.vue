<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-16 19:20:13
-->
<template>
    <UeTiptapMenuButton
        ref="rootDom"
        type="fontSize"
        :text="currentFontFamily || '字体'"
        @trigger="openFontFamilyPanel"
    />
</template>
<script lang="ts" setup>
import { getFontFamilyAttrs } from "../../extension-font-family/src";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { isButtonRow, getButtonRowAttrs } from "../../extension-button/utils/helper";

const { editor } = useInjectTiptapEditor();
const rootDom = useTemplateRef("rootDom");

const currentFontFamily = computed(() => {
    if (isButtonRow(editor)) {
        return getButtonRowAttrs(editor)?.fontFamily || null;
    }

    return getFontFamilyAttrs(editor)?.fontFamily || null;
});

function updateFontFamily(fontFamily?: string | null) {
    if (isButtonRow(editor)) {
        return editor
            ?.chain()
            .updateButtonRowAttrs({ fontFamily: fontFamily || "" })
            .run();
    }

    if (!fontFamily) {
        editor?.chain().unsetFontFamily().run();
    } else {
        editor?.chain().setFontFamily(fontFamily).run();
    }
}

function openFontFamilyPanel() {
    const rect = rootDom.value?.getButtonRect();

    if (!editor || !rect) return;

    editor?.commands.openAttrEditorPanel(
        "fontFamily",
        { fontFamily: currentFontFamily.value || "" },
        {
            rect,
            updateAttrs: ({ fontFamily }) => {
                updateFontFamily(fontFamily);
            },
        }
    );
}
</script>
<style lang="scss" module>
//
</style>
