<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 10:38:59
-->
<template>
    <UeTiptapMenuButton ref="rootDom" :type="currentButtonType" @trigger="openTextAlignPanel" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { getDeviceStorage } from "../../extension-device/helper";
import { isButtonRow, getButtonRowAttrs } from "../../extension-button/utils/helper";

const { editor } = useInjectTiptapEditor();

const rootDomRef = useTemplateRef("rootDom");

const currentValue = computed(() => {
    if (!editor) return "";

    const isPc = getDeviceStorage(editor)?.device === "pc";

    if (isButtonRow(editor)) {
        return isPc ? getButtonRowAttrs(editor)?.align : getButtonRowAttrs(editor)?.moAlign;
    }

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

function triggerTextAlign(textAlign?: string | null) {
    if (!editor) return;

    const isPc = getDeviceStorage(editor)?.device === "pc";

    if (isButtonRow(editor)) {
        const chain = editor?.chain().focus();

        chain.updateButtonRowAttrs(isPc ? { align: textAlign || "" } : { moAlign: textAlign || "" });

        return chain.run();
    }

    if (textAlign) {
        const chain = editor?.chain().focus();
        if (isPc) {
            chain.setTextAlign(textAlign);
        } else {
            chain.setMoTextAlign(textAlign);
        }
        return chain.run();
    } else {
        editor?.chain().focus().unsetTextAlign().run();
    }
}

function openTextAlignPanel() {
    const rect = rootDomRef.value?.$el;
    if (!rect) return;

    editor?.commands.openAttrEditorPanel(
        "textAlign",
        { textAlign: currentValue.value || "" },
        {
            rect,
            setData: ({ textAlign }) => {
                triggerTextAlign(textAlign);
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
