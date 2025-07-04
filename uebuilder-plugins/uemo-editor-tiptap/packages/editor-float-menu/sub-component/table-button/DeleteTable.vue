<template>
    <UeTiptapMenuButton :type="type" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";
import { getTableSelectionInfo } from "../../../extension-table/utils/helper";

const { editor } = useInjectTiptapEditor();

const selectionInfo = computed(() => {
    return getTableSelectionInfo(editor);
});

const selectionIsTableRowNode = computed(() => {
    if (!editor) return false;
    return selectionInfo.value.row && !selectionInfo.value.col;
});

const selectionIsTableColNode = computed(() => {
    if (!editor) return false;
    return !selectionInfo.value.row && selectionInfo.value.col;
});

const selectionIsTableNode = computed(() => {
    if (!editor) return false;
    return selectionInfo.value.row && selectionInfo.value.col;
});

const type = computed(() => {
    if (selectionIsTableRowNode.value) {
        return "deleteRow";
    }
    if (selectionIsTableColNode.value) {
        return "deleteColumn";
    }
    return "deleteTable";
});

function trigger() {
    if (selectionIsTableRowNode.value) {
        editor?.chain().focus().deleteRow().run();
    } else if (selectionIsTableColNode.value) {
        editor?.chain().focus().deleteColumn().run();
    } else if (selectionIsTableNode.value) {
        editor?.chain().focus().deleteTable().run();
    }
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
