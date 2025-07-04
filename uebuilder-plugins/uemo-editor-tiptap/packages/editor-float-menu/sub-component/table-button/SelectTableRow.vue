<template>
    <UeTiptapMenuButton type="selectRow" :disable="selectionIsTableRowNode" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { cellAround, CellSelection } from "@tiptap/pm/tables";

import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";
import { getClosestTable, getTableSelectionInfo } from "../../../extension-table/utils/helper";

const { editor } = useInjectTiptapEditor();

const selectionInfo = computed(() => {
    return getTableSelectionInfo(editor);
});

const selectionIsTableRowNode = computed(() => {
    if (!editor) return false;
    return selectionInfo.value.row && !selectionInfo.value.col;
});

function trigger() {
    if (!editor) return false;

    const { view } = editor;
    const { state } = view;
    const { selection, doc } = state;
    const tableNodeInfo = getClosestTable(editor);
    if (!tableNodeInfo) return true;

    const cellPos = cellAround(doc.resolve(selection.from));
    if (!cellPos) return;

    view.dispatch(state.tr.setSelection(CellSelection.rowSelection(cellPos)));
    editor.chain().focus().run();
}
</script>
<style lang="scss" module>
//
</style>
