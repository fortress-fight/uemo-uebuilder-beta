<!--
 * @Description: 斜体插件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-16 19:20:20
-->
<template>
    <UeTiptapMenuButton
        ref="rootDom"
        type="letterSpacing"
        :class="$style['plugin-letter-spacing']"
        @trigger="openLetterSpacingPanel"
    />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { getLetterSpacingAttr } from "../../extension-letter-spacing/utils/helper";

defineOptions({ name: "LetterSpacingButton" });

const { editor } = useInjectTiptapEditor();

const rootDom = useTemplateRef("rootDom");

const currentValue = computed(() => {
    if (!editor) return "";
    return getLetterSpacingAttr(editor).letterSpacing || "";
});

function openLetterSpacingPanel() {
    const rect = rootDom.value?.$el as HTMLElement;

    if (!editor || !rect) return;

    editor?.commands.openAttrEditorPanel(
        "letterSpacing",
        { letterSpacing: currentValue.value || "" },
        {
            rect,
            updateAttrs: (attr) => {
                if (!attr.letterSpacing) {
                    editor?.chain().unsetLetterSpacing().run();
                } else {
                    editor?.chain().setLetterSpacing(attr.letterSpacing).run();
                }
            },
        }
    );
}
</script>
<style lang="scss" module>
.plugin-italic {
    //
}
</style>
