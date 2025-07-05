<template>
    <UeTiptapMenuButton
        ref="rootDom"
        type="lineHeight"
        :class="$style['line-height']"
        :active="hasLineHeight"
        @trigger="openLineHeightPanel"
    />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { getLineHeightAttr } from "../../extension-line-height/utils/helper";
import { isButtonRow, getButtonRowAttrs } from "../../extension-button/utils/helper";
import { isEffectTextNode, getEffectTextAttrs } from "../../extension-effect-text/utils/helper";

const { editor } = useInjectTiptapEditor();

const rootDom = useTemplateRef("rootDom");

const hasLineHeight = computed(() => {
    if (!editor) return false;

    if (isButtonRow(editor)) {
        return !!getButtonRowAttrs(editor)?.lineHeight;
    }

    if (isEffectTextNode(editor)) {
        return !!getEffectTextAttrs(editor)?.lineHeight;
    }

    return editor.isActive("lineHeight");
});

const currentValue = computed(() => {
    if (!editor) return "";

    if (isButtonRow(editor)) {
        return getButtonRowAttrs(editor)?.lineHeight || "";
    }

    if (isEffectTextNode(editor)) {
        return getEffectTextAttrs(editor)?.lineHeight || "";
    }

    return getLineHeightAttr(editor).lineHeight || "";
});

function triggerLineHeight(lineHeight?: string | null) {
    if (!editor) return;

    if (isButtonRow(editor)) {
        const chain = editor?.chain().focus();

        chain.updateButtonRowAttrs({ lineHeight: lineHeight || "" });

        return chain.run();
    }

    if (isEffectTextNode(editor)) {
        return editor
            ?.chain()
            .focus()
            .updateEffectTextAttrs({ lineHeight: lineHeight || "" })
            .run();
    }
    if (lineHeight) {
        editor.chain().focus().setLineHeight(lineHeight).run();
    } else {
        editor.chain().focus().unsetLineHeight().run();
    }
}

function openLineHeightPanel() {
    const rect = rootDom.value?.$el as HTMLElement;

    if (!editor || !rect) return;

    editor?.commands.openAttrEditorPanel(
        "lineHeight",
        { lineHeight: currentValue.value || "" },
        {
            rect,
            updateAttrs: ({ lineHeight }) => {
                triggerLineHeight(lineHeight);
            },
        }
    );
}

onBeforeUnmount(() => {
    editor?.commands.closeAttrEditorPanel("lineHeight");
});
</script>
<style lang="scss" module>
.line-height {
    // init
}
</style>
