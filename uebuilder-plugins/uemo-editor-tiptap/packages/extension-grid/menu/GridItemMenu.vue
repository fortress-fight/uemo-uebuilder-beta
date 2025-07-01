<template>
    <UeTiptapEditorFloatMenu
        plugin-key="gridItemMenu"
        :title="t('UNIT_GRID_ITEM')"
        node-name="gridItem"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isInGridItem, isGridItemNode } from "../utils/helper";
import { isEmptyTextBlock } from "../../../utils/tiptap-utils";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";
import { isSuggestionActive } from "../../extension-suggestion/utils/helper";

defineOptions({ name: "UeTiptapGridItemMenu", inheritAttrs: false });

const { t } = useI18n();

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "editor",
    "|",
    "copyNode",
    "replaceNode",
    "|",
    "selectParent",
    "|",
    "deleteNode",
    "|",
    "moreOper",
];

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isGridItem = isGridItemNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "gridItem";

    const hasFocus = view.hasFocus();

    const isSelectNode = !isEditing && isGridItem && hasFocus;
    const shouldShow =
        hasFocus && isInGridItem(state) && isEmptyTextBlock(editor, selection) && !isSuggestionActive(editor);

    return isSelectNode || shouldShow;
};
</script>
<style lang="scss" module>
//
</style>
