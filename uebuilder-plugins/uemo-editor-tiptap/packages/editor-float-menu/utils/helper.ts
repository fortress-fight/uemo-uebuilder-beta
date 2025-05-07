/*
 * @Description: 浮动编辑工具栏按钮映射
 * @Author: F-Stone
 * @LastEditTime: 2025-05-06 12:09:49
 */

import EditorButton from "../sub-component/EditorButton.vue";
import InsertNewLineBefore from "../sub-component/InsertNewLineBeforeButton.vue";
import InsertNewLineAfter from "../sub-component/InsertNewLineAfterButton.vue";
import SelectParent from "../sub-component/SelectParentButton.vue";
import DeleteNode from "../sub-component/DeleteNodeButton.vue";
import AddButton from "../sub-component/AddButton.vue";
import MoreOper from "../sub-component/MoreOperButton.vue";

export const FLOAT_MENU_BUTTON_MAP: Partial<Record<UE_TIPTAP_UNIT.OperItem, Component>> = {
    editor: EditorButton,
    insertNewLineBefore: InsertNewLineBefore,
    insertNewLineAfter: InsertNewLineAfter,
    selectParent: SelectParent,
    deleteNode: DeleteNode,
    add: AddButton,
    moreOper: MoreOper,
};
