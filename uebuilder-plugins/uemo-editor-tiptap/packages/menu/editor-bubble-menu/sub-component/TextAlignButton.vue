<!--
 * @Description: 字重插件
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 13:28:04
-->
<template>
    <UeTiptapMenuButton ref="rootDom" :type="currentButtonType" @trigger="openTextAlignPanel" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

import { getDeviceStorage } from "../../../extension-device/helper";
import { isButtonRow, getButtonRowAttrs } from "../../../extension-button/utils/helper";
import { isShareRowNode, getShareRowAttrs } from "../../../extension-share/utils/helper";
import { isLoopTextNode, getLoopTextAttrs } from "../../../extension-loop-text/utils/helper";
import { isEffectTextNode, getEffectTextAttrs } from "../../../extension-effect-text/utils/helper";
import { isCounterNumberNode, getCounterNumberAttrs } from "../../../extension-counter-number/utils/helper";

const { editor } = useInjectTiptapEditor();

const rootDomRef = useTemplateRef("rootDom");

const currentValue = computed(() => {
    if (!editor) return "";

    const isPc = getDeviceStorage(editor)?.device === "desktop";

    if (isEffectTextNode(editor)) {
        return isPc ? getEffectTextAttrs(editor)?.align : getEffectTextAttrs(editor)?.moAlign;
    }

    if (isShareRowNode(editor.state.selection)) {
        return isPc ? getShareRowAttrs(editor)?.align : getShareRowAttrs(editor)?.moAlign;
    }

    if (isButtonRow(editor)) {
        return isPc ? getButtonRowAttrs(editor)?.align : getButtonRowAttrs(editor)?.moAlign;
    }

    if (isCounterNumberNode(editor)) {
        return isPc ? getCounterNumberAttrs(editor)?.align : getCounterNumberAttrs(editor)?.moAlign;
    }

    if (isLoopTextNode(editor)) {
        return isPc ? getLoopTextAttrs(editor)?.align : getLoopTextAttrs(editor)?.moAlign;
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

    const isPc = getDeviceStorage(editor)?.device === "desktop";

    if (isEffectTextNode(editor)) {
        const chain = editor?.chain().focus();
        chain.updateEffectTextAttrs(isPc ? { align: textAlign || "" } : { moAlign: textAlign || "" });

        return chain.run();
    }

    if (isShareRowNode(editor.state.selection)) {
        const chain = editor?.chain().focus();
        chain.updateShareRowAttrs(isPc ? { align: textAlign || "" } : { moAlign: textAlign || "" });

        return chain.run();
    }

    if (isButtonRow(editor)) {
        const chain = editor?.chain().focus();
        const buttonAlign = (textAlign || undefined) as UE_TIPTAP_EXTENSION.ButtonRow["attrs"]["align"];
        chain.updateButtonRowAttrs(isPc ? { align: buttonAlign } : { moAlign: buttonAlign });

        return chain.run();
    }

    if (isCounterNumberNode(editor)) {
        const chain = editor?.chain().focus();
        // @ts-expect-error
        chain.updateCounterNumberAttrs(isPc ? { align: textAlign || "" } : { moAlign: textAlign || "" });

        return chain.run();
    }

    if (isLoopTextNode(editor)) {
        const chain = editor?.chain().focus();
        chain.updateLoopTextAttrs(isPc ? { align: textAlign || "" } : { moAlign: textAlign || "" });

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
            updateAttrs: ({ textAlign }) => {
                triggerTextAlign(textAlign);
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
