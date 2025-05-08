<template>
    <UeTiptapEditorFloatMenu
        plugin-key="buttonRowMenu"
        :title="t('UNIT_BUTTON_ROW')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isNodeSelection } from "@tiptap/core";
import { getEditorPanelExtensionStorage } from "../../../packages/extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapButtonItemMenu", inheritAttrs: false });

const { t } = useI18n();

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "editor",
    "|",
    "insertNewLineBefore",
    "insertNewLineAfter",
    "selectParent",
    "|",
    "deleteNode",
];

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isButtonRow = isNodeSelection(selection) && selection.node.type.name === "buttonRow";

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "buttonRow";

    return !isEditing && isButtonRow && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
