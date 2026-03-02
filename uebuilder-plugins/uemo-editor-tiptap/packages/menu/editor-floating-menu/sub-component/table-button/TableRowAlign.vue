<template>
    <UeTiptapMenuButton ref="rootDom" type="tableColAlign" :icon="icon" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../../utils/mixin-tiptap-editor";
import { getTableCellAttrs } from "../../../../extension-table/utils/helper";

const { editor } = useInjectTiptapEditor();

const currentValue = computed<"left" | "center" | "right">(() => {
    return getTableCellAttrs(editor).align || "left";
});

const icon = computed(() => {
    return {
        left: "ue-tiptap-align-left",
        center: "ue-tiptap-align-center",
        right: "ue-tiptap-align-right",
    }[currentValue.value];
});

const rootDomRef = useTemplateRef("rootDom");

function trigger() {
    const rect = rootDomRef.value?.$el;
    if (!rect) return;

    editor?.commands.openAttrEditorPanel("tableAlign", currentValue.value as any, {
        rect,
        updateAttrs: (value) => {
            editor
                ?.chain()
                .setCellAlign(value as any)
                .run();
        },
    });
}
</script>
<style lang="scss" module>
//
</style>
