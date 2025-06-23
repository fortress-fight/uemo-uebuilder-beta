<template>
    <UeTiptapEditorFloatMenu
        plugin-key="gridGroupMenu"
        :title="t('UNIT_GRID_GROUP')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isGridGroupNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapGridGroupMenu", inheritAttrs: false });

const { t } = useI18n();

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "editor",
    "|",
    "insertNewLineBefore",
    "insertNewLineAfter",
    "selectParent",
    "|",
    "deleteNode",
    "|",
    "moreOper",
];

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isGridGroup = isGridGroupNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "gridGroup";

    return !isEditing && isGridGroup && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
