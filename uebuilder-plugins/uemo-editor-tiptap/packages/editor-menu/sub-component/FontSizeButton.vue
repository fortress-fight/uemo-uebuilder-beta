<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-22 00:44:40
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
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();
const rootDom = useTemplateRef("rootDom");

const { t } = useI18n();

const currentFontSize = computed(() => {
    return getFontSizeAttrs(editor)?.fontSize || null;
});

function openFontSizePanel() {
    const rect = rootDom.value?.getButtonRect();

    if (!editor || !rect) return;

    editor?.commands.openAttrEditorPanel(
        "fontSize",
        { fontSize: currentFontSize.value || "" },
        {
            rect,
            setData: (attr) => {
                if (!attr.fontSize) {
                    editor?.chain().unsetFontSize().run();
                } else {
                    editor?.chain().setFontSize(attr.fontSize).run();
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
//
</style>
