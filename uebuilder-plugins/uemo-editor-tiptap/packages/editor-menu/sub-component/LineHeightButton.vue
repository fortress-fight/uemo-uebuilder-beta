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

const { editor } = useInjectTiptapEditor();

const rootDom = useTemplateRef("rootDom");

const hasLineHeight = computed(() => {
    return editor?.isActive("lineHeight");
});

const currentValue = computed(() => {
    if (!editor) return "";
    return getLineHeightAttr(editor).lineHeight || "";
});

function openLineHeightPanel() {
    const rect = rootDom.value?.$el as HTMLElement;

    if (!editor || !rect) return;

    editor?.commands.openAttrEditorPanel(
        "lineHeight",
        { lineHeight: currentValue.value || "" },
        {
            rect,
            setData: ({ lineHeight }) => {
                if (lineHeight) {
                    editor.chain().focus().setLineHeight(lineHeight).run();
                } else {
                    editor.chain().focus().unsetLineHeight().run();
                }
            },
            focus: () => {
                editor?.commands.focus();
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
