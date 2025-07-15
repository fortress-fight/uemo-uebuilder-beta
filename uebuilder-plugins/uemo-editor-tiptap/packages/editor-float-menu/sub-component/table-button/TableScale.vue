<template>
    <UeTiptapMenuButton ref="rootDom" type="tableScale" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { inSameTable, addColumn, addRow, selectedRect, TableMap } from "@tiptap/pm/tables";

import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";
import { getClosestTable, getTableSelectionInfo } from "../../../extension-table/utils/helper";

const { editor } = useInjectTiptapEditor();
const rootDomRef = useTemplateRef("rootDom");

const selectionInfo = computed(() => {
    return getTableSelectionInfo(editor);
});

const selectionIsTableNode = computed(() => {
    if (!editor) return false;
    return selectionInfo.value.row && selectionInfo.value.col;
});

const tableSize = computed(() => {
    const tableInfo = getClosestTable(editor);

    if (!tableInfo) return { rows: 1, cols: 1 };

    const tableMap = TableMap.get(tableInfo.node);

    return { rows: tableMap.height, cols: tableMap.width };
});

// 修改表格大小
function changeTableSize(width: number, height: number) {
    if (!editor || width <= 0 || height <= 0 || !selectionIsTableNode.value) return false;

    const { view } = editor;
    const { state } = view;

    const { selection, tr } = state;

    const tableInfo = getClosestTable(selection);
    if (!tableInfo) return false;

    const { $from, $to } = selection;
    if (!inSameTable($from, $to)) return false;

    const { rows: tableH, cols: tableW } = tableSize.value;
    const rect = {
        ...selectedRect(state),
        top: tableH - 1,
        bottom: tableH,
        left: tableW - 1,
        right: tableW,
    };

    if (height - tableH > 0) {
        Array.from({ length: height - tableH }).forEach(() => {
            addRow(tr, rect, rect.bottom);
        });
    }

    if (width - tableW > 0) {
        Array.from({ length: width - tableW }).forEach(() => {
            addColumn(tr, rect, rect.right);
        });
    }

    view.dispatch(tr);
}

function trigger() {
    const rect = rootDomRef.value?.$el;
    if (!rect) return;

    editor?.commands.openAttrEditorPanel("tableScale", tableSize.value, {
        rect,
        updateAttrs: ({ rows, cols }) => {
            changeTableSize(cols, rows);
        },
    });
}
</script>
<style lang="scss" module>
//
</style>
