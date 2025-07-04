<template>
    <UeTiptapEditorFloatMenu
        plugin-key="tableMenu"
        :title="menuName"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { CellSelection, inSameTable } from "@tiptap/pm/tables";

import { isInTable, getTableSelectionInfo } from "../utils/helper";
import { isEmptyTextBlock } from "../../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { isSuggestionActive } from "../../extension-suggestion/utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapTableMenu", inheritAttrs: false });

const { t } = useI18n();

const { editor } = useInjectTiptapEditor();

const selectionInfo = computed(() => {
    return getTableSelectionInfo(editor);
});

const selectionIsTableNode = computed(() => {
    if (!editor) return false;
    return isInTable(editor) && selectionInfo.value.row && selectionInfo.value.col;
});

const selectionIsTableCellNode = computed(() => {
    if (!editor) return false;
    return isInTable(editor) && !selectionInfo.value.row && !selectionInfo.value.col;
});

const selectionIsTableRowNode = computed(() => {
    if (!editor) return false;
    return isInTable(editor) && selectionInfo.value.row && !selectionInfo.value.col;
});

const selectionIsTableColNode = computed(() => {
    if (!editor) return false;
    return isInTable(editor) && !selectionInfo.value.row && selectionInfo.value.col;
});

const menuItems = computed<(UE_TIPTAP_UNIT.OperItem | "|")[]>(() => {
    const publicBtn = ["tableCellBackground", "|", "tableRowAlign", "tableColAlign", "|", "mergeTableCell"] as const;
    const selectBtn = ["selectRow", "selectCol", "|", "selectTable"] as const;
    if (selectionIsTableCellNode.value) {
        return [...publicBtn, "|", ...selectBtn];
    }
    if (selectionIsTableRowNode.value) {
        return [...publicBtn, "|", "addRowBefore", "addRowAfter", "|", ...selectBtn, "|", "deleteTable"];
    }
    if (selectionIsTableColNode.value) {
        return [...publicBtn, "|", "addColumnBefore", "addColumnAfter", "|", ...selectBtn, "|", "deleteTable"];
    }
    if (selectionIsTableNode.value) {
        return [
            "editor",
            "|",
            ...publicBtn,
            "tableScale",
            "|",
            "insertNewLineBefore",
            "insertNewLineAfter",
            "|",
            "deleteTable",
        ];
    }
    return [];
});

const menuName = computed(() => {
    if (selectionIsTableCellNode.value) {
        return t("UNIT_TABLE_CELL");
    }
    if (selectionIsTableRowNode.value) {
        return t("UNIT_TABLE_ROW");
    }
    if (selectionIsTableColNode.value) {
        return t("UNIT_TABLE_COL");
    }
    if (selectionIsTableNode.value) {
        return t("UNIT_TABLE");
    }

    return "未选中";
});

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const { $from, $to } = selection;
    if (!inSameTable($from, $to)) return false;

    const isTableSelection = selection instanceof CellSelection;
    const isInTableEmpty = isInTable(editor) && isEmptyTextBlock(editor, selection);

    return (
        (isTableSelection || isInTableEmpty) &&
        view.hasFocus() &&
        !isSuggestionActive(editor) &&
        !["table", "tableCell"].includes(getEditorPanelExtensionStorage(editor).lastEditorPanelType || "")
    );
};
</script>
<style lang="scss" module>
//
</style>
