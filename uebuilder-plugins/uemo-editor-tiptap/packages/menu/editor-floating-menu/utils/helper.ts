/*
 * @Description: 浮动编辑工具栏按钮映射
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 11:30:18
 */

import EditorButton from "../sub-component/EditorButton.vue";
import InsertNewLineBefore from "../sub-component/InsertNewLineBeforeButton.vue";
import InsertNewLineAfter from "../sub-component/InsertNewLineAfterButton.vue";
import SelectParent from "../sub-component/SelectParentButton.vue";
import DeleteNode from "../sub-component/DeleteNodeButton.vue";
import AddButton from "../sub-component/AddButton.vue";
import MoreOper from "../sub-component/MoreOperButton.vue";
import ReplaceImage from "../sub-component/ReplaceImageButton.vue";
import CopyNode from "../sub-component/CopyNodeButton.vue";
import ReplaceNode from "../sub-component/ReplaceNodeButton.vue";
import SelectTable from "../sub-component/table-button/SelectTable.vue";
import SelectTableRow from "../sub-component/table-button/SelectTableRow.vue";
import SelectTableCol from "../sub-component/table-button/SelectTableCol.vue";
import TableRowAlign from "../sub-component/table-button/TableRowAlign.vue";
import TableColAlign from "../sub-component/table-button/TableColAlign.vue";
import TableCellBackground from "../sub-component/table-button/TableCellBackground.vue";
import MergeTableCell from "../sub-component/table-button/MergeTableCell.vue";
import DeleteTable from "../sub-component/table-button/DeleteTable.vue";
import AddRowAfter from "../sub-component/table-button/AddRowAfter.vue";
import AddRowBefore from "../sub-component/table-button/AddRowBefore.vue";
import AddColumnAfter from "../sub-component/table-button/AddColumnAfter.vue";
import AddColumnBefore from "../sub-component/table-button/AddColumnBefore.vue";
import TableScale from "../sub-component/table-button/TableScale.vue";

export const FLOAT_MENU_BUTTON_MAP: Partial<Record<UE_TIPTAP_UNIT.OperItem, Component>> = {
    editor: EditorButton,
    insertNewLineBefore: InsertNewLineBefore,
    insertNewLineAfter: InsertNewLineAfter,
    selectParent: SelectParent,
    deleteNode: DeleteNode,
    add: AddButton,
    moreOper: MoreOper,
    replaceImage: ReplaceImage,
    copyNode: CopyNode,
    replaceNode: ReplaceNode,
    selectTable: SelectTable,
    selectRow: SelectTableRow,
    selectCol: SelectTableCol,
    tableRowAlign: TableRowAlign,
    tableColAlign: TableColAlign,
    tableCellBackground: TableCellBackground,
    mergeTableCell: MergeTableCell,
    deleteTable: DeleteTable,
    addRowAfter: AddRowAfter,
    addRowBefore: AddRowBefore,
    addColumnAfter: AddColumnAfter,
    addColumnBefore: AddColumnBefore,
    tableScale: TableScale,
};
