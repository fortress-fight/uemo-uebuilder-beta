<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-07 01:01:50
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
import { isShareRowNode, getShareRowAttrs } from "../../extension-share/utils/helper";
import { isEffectTextNode, getEffectTextAttrs } from "../../extension-effect-text/utils/helper";
import { isCounterNumberNode, getCounterNumberAttrs } from "../../extension-counter-number/utils/helper";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();
const rootDom = useTemplateRef("rootDom");

const { t } = useI18n();

const currentFontSize = computed(() => {
    if (isShareRowNode(editor?.state.selection)) {
        return getShareRowAttrs(editor)?.fontSize || null;
    }

    if (isButtonRow(editor)) {
        return getButtonRowAttrs(editor)?.fontSize || null;
    }

    if (isEffectTextNode(editor)) {
        return getEffectTextAttrs(editor)?.fontSize || null;
    }

    if (isCounterNumberNode(editor)) {
        return getCounterNumberAttrs(editor)?.fontSize || null;
    }

    return getFontSizeAttrs(editor)?.fontSize || null;
});

function updateFontSize(fontSize?: string | null) {
    if (isShareRowNode(editor?.state.selection)) {
        return editor
            ?.chain()
            .updateShareRowAttrs({ fontSize: fontSize || "" })
            .run();
    }

    if (isButtonRow(editor)) {
        return editor
            ?.chain()
            .updateButtonRowAttrs({ fontSize: fontSize || "" })
            .run();
    }

    if (isEffectTextNode(editor)) {
        return editor
            ?.chain()
            .updateEffectTextAttrs({ fontSize: fontSize || "" })
            .run();
    }

    if (isCounterNumberNode(editor)) {
        return editor
            ?.chain()
            .updateCounterNumberAttrs({ fontSize: fontSize || "" })
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
            updateAttrs: ({ fontSize }) => {
                updateFontSize(fontSize);
            },
        }
    );
}
</script>
<style lang="scss" module>
//
</style>
