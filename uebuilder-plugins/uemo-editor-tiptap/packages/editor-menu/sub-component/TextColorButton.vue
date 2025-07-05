<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 17:25:37
-->
<template>
    <UeTiptapMenuButton ref="rootDom" type="textColor" :color="currentColor" @trigger="openColorPicker" />
</template>
<script lang="ts" setup>
import { getTextColorAttrs } from "../../extension-text-color/src";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { isEffectTextNode, getEffectTextAttrs } from "../../extension-effect-text/utils/helper";

const { editor } = useInjectTiptapEditor();

const rootDomRef = useTemplateRef("rootDom");

const currentColor = computed(() => {
    if (!editor) return "";

    if (isEffectTextNode(editor)) {
        return getEffectTextAttrs(editor)?.textColor || "";
    }

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
            props: isEffectTextNode(editor) ? { type: "color" } : undefined,
            updateAttrs: ({ color }) => {
                if (isEffectTextNode(editor)) {
                    editor
                        .chain()
                        .updateEffectTextAttrs({ textColor: color || "" })
                        .run();
                }

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
