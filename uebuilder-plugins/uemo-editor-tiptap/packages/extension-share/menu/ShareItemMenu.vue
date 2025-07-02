<template>
    <UeTiptapEditorFloatMenu
        plugin-key="shareItemMenu"
        :title="t('UNIT_SHARE_ITEM')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isShareItemNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapShareItemMenu", inheritAttrs: false });

const { t } = useI18n();

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "editor",
    "|",
    "insertNewLineBefore",
    "insertNewLineAfter",
    "selectParent",
    "|",
    "add",
    "|",
    "deleteNode",
    "|",
    "moreOper",
];

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isShareItem = isShareItemNode(selection);
    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "shareRow";

    return !isEditing && isShareItem && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
