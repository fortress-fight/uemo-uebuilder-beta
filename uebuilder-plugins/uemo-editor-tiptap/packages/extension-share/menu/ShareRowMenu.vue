<template>
    <UeTiptapEditorFloatMenu
        plugin-key="shareRowMenu"
        :title="t('UNIT_SHARE')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isShareRowNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapShareRowMenu", inheritAttrs: false });

const { t } = useI18n();

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "insertNewLineBefore",
    "insertNewLineAfter",
    "selectParent",
    "|",
    "add",
    "|",
    "deleteNode",
];

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isShareRow = isShareRowNode(selection);
    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "shareRow";

    return !isEditing && isShareRow && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
