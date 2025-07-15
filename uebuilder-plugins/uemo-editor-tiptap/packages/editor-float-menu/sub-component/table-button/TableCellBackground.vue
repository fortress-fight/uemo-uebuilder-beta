<template>
    <UeTiptapMenuButton ref="rootDom" type="tableCellBackground" :color="currentColor" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { getTableCellAttrs } from "../../../extension-table/utils/helper";
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const rootDomRef = useTemplateRef("rootDom");
const currentColor = computed(() => {
    return getTableCellAttrs(editor).backgroundColor || "";
});

function trigger() {
    const rect = rootDomRef.value?.getButtonRect();
    if (!rect) return;

    editor?.commands.openAttrEditorPanel(
        "textColor",
        { color: currentColor.value || "" },
        {
            rect,
            updateAttrs: ({ color }) => {
                editor
                    ?.chain()
                    .setCellAttribute("backgroundColor", color || null)
                    .run();
            },
        }
    );
}
</script>
<style lang="scss" module>
//
</style>
