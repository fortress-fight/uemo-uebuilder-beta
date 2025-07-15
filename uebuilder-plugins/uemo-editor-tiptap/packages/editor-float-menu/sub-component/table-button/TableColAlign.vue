<template>
    <UeTiptapMenuButton ref="rootDom" type="tableColAlign" :icon="icon" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";
import { getTableCellAttrs } from "../../../../packages/extension-table/utils/helper";

const { editor } = useInjectTiptapEditor();

const currentValue = computed<"top" | "middle" | "bottom">(() => {
    return getTableCellAttrs(editor).valign || "top";
});

const icon = computed(() => {
    return {
        top: "icon-editor-valign-top",
        middle: "icon-editor-valign-middle",
        bottom: "icon-editor-valign-bottom",
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
                .setCellVAlign(value as any)
                .run();
        },
    });
}
</script>
<style lang="scss" module>
//
</style>
