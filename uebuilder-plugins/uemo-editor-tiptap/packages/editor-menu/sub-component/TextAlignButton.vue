<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-21 19:15:35
-->
<template>
    <UeTiptapMenuButton ref="rootDom" :type="currentButtonType" @trigger="openTextAlignPanel" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { getDeviceStorage } from "../../extension-device/helper";

const { editor } = useInjectTiptapEditor();

const rootDomRef = useTemplateRef("rootDom");

const currentValue = computed(() => {
    if (!editor) return "";

    const isPc = getDeviceStorage(editor)?.device === "pc";

    if (isPc) {
        return editor?.getAttributes("paragraph").textAlign;
    } else {
        return editor?.getAttributes("paragraph").moTextAlign;
    }
});

const currentButtonType = computed(() => {
    switch (currentValue.value) {
        case "left":
            return "textAlignLeft";
        case "center":
            return "textAlignCenter";
        case "right":
            return "textAlignRight";

        default:
            return "textAlignLeft";
    }
});

function openTextAlignPanel() {
    const rect = rootDomRef.value?.$el;
    if (!rect) return;

    editor?.commands.openAttrEditorPanel(
        "textAlign",
        { textAlign: currentValue.value || "" },
        {
            rect,
            setData: ({ textAlign }) => {
                if (textAlign) {
                    editor.chain().focus().setTextAlign(textAlign).run();
                } else {
                    editor.chain().focus().unsetTextAlign().run();
                }
            },
            focus: () => {
                editor?.commands.focus();
            },
        }
    );
}

onBeforeUnmount(() => {
    editor?.commands.closeAttrEditorPanel("textAlign");
});
</script>
<style lang="scss" module>
//
</style>
