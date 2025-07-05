<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 17:11:32
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
import { isEffectTextNode, getEffectTextAttrs } from "../../extension-effect-text/utils/helper";

const { editor } = useInjectTiptapEditor();
const rootDom = useTemplateRef("rootDom");

const currentFontFamily = computed(() => {
    if (isButtonRow(editor)) {
        return getButtonRowAttrs(editor)?.fontFamily || null;
    }

    if (isEffectTextNode(editor)) {
        return getEffectTextAttrs(editor)?.fontFamily || null;
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
    if (isEffectTextNode(editor)) {
        return editor
            ?.chain()
            .updateEffectTextAttrs({ fontFamily: fontFamily || "" })
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
