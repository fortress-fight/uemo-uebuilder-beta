<template>
    <UeTiptapEditorFloatMenu
        plugin-key="buttonRowMenu"
        :title="t('UNIT_BUTTON_ROW')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isButtonRow } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapButtonRowMenu", inheritAttrs: false });

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

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view }) => {
    if (!editor) return false;

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "buttonRow";

    return !isEditing && isButtonRow(editor) && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
