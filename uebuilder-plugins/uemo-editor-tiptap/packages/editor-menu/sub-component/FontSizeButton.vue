<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 10:27:32
-->
<template>
    <UeTiptapMenuButton
        ref="rootDom"
        type="fontSize"
        :text="currentFontSize || t('UNIT_FONT_SIZE')"
        @trigger="openFontSizePanel"
    />
</template>
<script lang="ts" setup>
import { getFontSizeAttrs } from "../../extension-font-size";
import { isButtonRow, getButtonRowAttrs } from "../../extension-button/utils/helper";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();
const rootDom = useTemplateRef("rootDom");

const { t } = useI18n();

const currentFontSize = computed(() => {
    if (isButtonRow(editor)) {
        return getButtonRowAttrs(editor)?.fontSize || null;
    }

    return getFontSizeAttrs(editor)?.fontSize || null;
});

function updateFontSize(fontSize?: string | null) {
    if (isButtonRow(editor)) {
        return editor
            ?.chain()
            .updateButtonRowAttrs({ fontSize: fontSize || "" })
            .run();
    }

    if (!fontSize) {
        editor?.chain().unsetFontSize().run();
    } else {
        editor?.chain().setFontSize(fontSize).run();
    }
}

function openFontSizePanel() {
    const rect = rootDom.value?.getButtonRect();

    if (!editor || !rect) return;

    editor?.commands.openAttrEditorPanel(
        "fontSize",
        { fontSize: currentFontSize.value || "" },
        {
            rect,
            setData: ({ fontSize }) => {
                updateFontSize(fontSize);
            },
            focus: () => {
                editor?.commands.focus();
            },
        }
    );
}
</script>
<style lang="scss" module>
//
</style>
